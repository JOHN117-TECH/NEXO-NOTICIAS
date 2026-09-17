const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
function load(file, dependencies = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      experimentalDecorators: true, esModuleInterop: true,
    },
  }).outputText;
  vm.runInNewContext(code, {
    exports,
    require: (id) => dependencies[id] || require(id),
    process,
  });
  return exports;
}
test("video duration handles unknown, short and long videos", () => {
  const { videoDuration } = load(path.resolve("src/lib/video.ts"));
  assert.equal(videoDuration(null), "—");
  assert.equal(videoDuration(0), "0:00");
  assert.equal(videoDuration(7), "0:07");
  assert.equal(videoDuration(128), "2:08");
});
test("manual video seed skips missing IDs and upserts without changing creation date", async () => {
  const queries = [];
  const client = {
    query: async (sql, values) => {
      queries.push({ sql, values });
      return { rowCount: 1 };
    },
    release() {},
  };
  class Pool {
    async connect() {
      return client;
    }
    async query(sql) {
      queries.push({ sql });
      return { rows: [] };
    }
  }
  const { Database } = load(path.resolve("../Backend/src/database.ts"), {
    "@nestjs/common": {
      Injectable: () => (target) => target,
      NotFoundException: Error,
    },
    "./video-duration": load(path.resolve("../Backend/src/video-duration.ts")),
    pg: { Pool },
    "./dto": {},
    "./seed": { seed: [] },
    "./video-seed": {
      videoSeed: [
        {
          titulo: "Configured",
          categoria: "Turismo",
          mux_playback_id: " public-id ",
          duracion: "0:18",
        },
        { titulo: "Pending", mux_playback_id: "" },
      ],
    },
  });
  const database = new Database();
  await database.initialize();
  assert.equal(
    queries.filter((q) => q.sql.includes("INSERT INTO videos")).length,
    0,
  );
  await database.initialize(true);
  const inserts = queries.filter((q) => q.sql.includes("INSERT INTO videos"));
  assert.equal(inserts.length, 1);
  assert.equal(inserts[0].values[4], "public-id");
  assert.equal(inserts[0].values[5], 18);
  assert.ok(inserts[0].sql.includes("ON CONFLICT (mux_playback_id) DO UPDATE"));
  assert.ok(!inserts[0].sql.includes("fecha_creacion="));
  await database.listVideos();
  assert.ok(queries.at(-1).sql.includes("WHERE activo = TRUE"));
});

test("seed durations accept minutes:seconds and reject invalid input", () => {
  const { parseVideoDuration } = load(
    path.resolve("../Backend/src/video-duration.ts"),
  );
  assert.equal(parseVideoDuration("0:10"), 10);
  assert.equal(parseVideoDuration("2:08"), 128);
  assert.equal(parseVideoDuration(" 12:59 "), 779);
  assert.equal(parseVideoDuration(18), 18);
  assert.equal(parseVideoDuration(null), null);
  for (const value of ["0:60", "-1:10", "abc", -1, 1.5, 2147483648]) {
    assert.throws(() => parseVideoDuration(value));
  }
});

test("all final video titles, descriptions and categories have English translations", () => {
  const { videoSeed } = load(path.resolve("../Backend/src/video-seed.ts"));
  const { translate } = load(path.resolve("src/lib/i18n.ts"), {
    "@/locales/en.json": require("../src/locales/en.json"),
    "@/locales/articles.en.json": require("../src/locales/articles.en.json"),
    "@/locales/videos.en.json": require("../src/locales/videos.en.json"),
  });
  assert.equal(videoSeed.length, 10);
  for (const video of videoSeed) {
    for (const text of [video.titulo, video.descripcion, video.categoria]) {
      assert.notEqual(translate(text, "en"), text, text);
      assert.equal(translate(text, "es"), text);
    }
  }
  assert.equal(translate("Videos", "en"), "Videos");
  assert.equal(translate("Cargando videos…", "en"), "Loading videos…");
  assert.equal(translate("Cerrar video", "en"), "Close video");
});
