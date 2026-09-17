const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
// Compile the real TSX components in this isolated test process.
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...args) {
  return originalResolve.call(
    this,
    name.startsWith("@/") ? path.resolve("src", name.slice(2)) : name,
    ...args,
  );
};
for (const extension of [".ts", ".tsx"])
  require.extensions[extension] = (module, filename) => {
    const result = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
      fileName: filename,
    });
    module._compile(result.outputText, filename);
  };
require.extensions[".css"] = (module) => {
  module.exports = {};
};
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { LanguageContext } = require("../src/contexts/LanguageContext.ts");
const { translate } = require("../src/lib/i18n.ts");
function render(Component, props = {}, locale = "en") {
  return renderToStaticMarkup(
    React.createElement(
      LanguageContext.Provider,
      { value: { locale, setLocale() {} } },
      React.createElement(Component, props),
    ),
  );
}
test("English forms preserve Spanish category values required by the API", () => {
  const { ContactForm } = require("../src/components/ContactForm.tsx");
  const html = render(ContactForm);
  assert.match(html, /<option value="Tecnología">Technology<\/option>/);
  assert.match(html, /<option value="Educación">Education<\/option>/);
  assert.match(html, /Send message/);
  assert.match(html, /name="category"/);
  assert.match(render(ContactForm, {}, "es"), /Enviar mensaje/);
});
test("English filters preserve the selected canonical category and page sizes", () => {
  const { NewsFilters } = require("../src/components/NewsFilters.tsx");
  const html = render(NewsFilters, {
    category: "Turismo",
    pageSize: 3,
    onCategoryChange() {},
    onPageSizeChange() {},
  });
  assert.match(html, /aria-pressed="true">Travel<\/button>/);
  assert.match(html, /value="10"/);
});
test("Pagination and status interpolation translate complete messages", () => {
  const { NewsPagination } = require("../src/components/NewsPagination.tsx");
  assert.match(
    render(NewsPagination, { currentPage: 2, pages: 4, onPageChange() {} }),
    /Page 2 of 4/,
  );
  assert.equal(
    translate("3 noticias eliminadas.", "en"),
    "3 articles deleted.",
  );
  assert.equal(
    translate("Seleccionar: {title}", "en", { title: "<test>" }),
    "Select: <test>",
  );
});
test("News catalog translates article titles and keeps unknown content intact", () => {
  assert.equal(
    translate("La inteligencia artificial revoluciona la educación", "en"),
    "Artificial intelligence is revolutionizing education",
  );
  assert.equal(translate("Mi noticia original", "en"), "Mi noticia original");
  assert.equal(translate("Tecnología", "es"), "Tecnología");
});

const {
  localizedPath,
  localeFromPath,
} = require("../src/lib/localizedRoutes.ts");
test("Localized routes preserve article IDs, queries and category anchors", () => {
  assert.equal(
    localizedPath("/noticias/abc?x=1#categorias", "en"),
    "/news/abc?x=1#categories",
  );
  assert.equal(
    localizedPath("/news/abc?x=1#categories", "es"),
    "/noticias/abc?x=1#categorias",
  );
  assert.equal(localizedPath("/favoritos", "en"), "/favorites");
  assert.equal(localizedPath("/contact", "es"), "/contacto");
  assert.equal(localizedPath("/", "en"), "/en");
  assert.equal(localizedPath("/en", "es"), "/");
  assert.equal(localeFromPath("/news/abc"), "en");
  assert.equal(localeFromPath("/noticias/abc"), "es");
  assert.equal(localizedPath("/api/noticias", "en"), "/api/noticias");
});
test("English administration translates fields and removal controls", () => {
  const { NewsManager } = require("../src/components/News-manager.tsx");
  const html = render(NewsManager);
  for (const text of [
    "Manage articles",
    "Administration key",
    "Create news item",
    "Title",
    "Summary",
    "Content",
    "Delete articles",
    "Article image (optional)",
  ])
    assert.ok(html.includes(text), text);
  assert.match(html, /value="Tecnología">Technology/);
  assert.equal(translate("Nexo Noticias", "en"), "Nexo News");
  assert.equal(translate("Inicio", "es"), "Inicio");
});
