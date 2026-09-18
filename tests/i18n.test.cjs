const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...args) {
  return originalResolve.call(
    this,
    name.startsWith('@/') ? path.resolve('src', name.slice(2)) : name,
    ...args,
  );
};
for (const extension of ['.ts', '.tsx'])
  require.extensions[extension] = (module, filename) => {
    const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
      fileName: filename,
    });
    module._compile(result.outputText, filename);
  };
require.extensions['.css'] = (module) => {
  module.exports = {};
};
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { LanguageContext } = require('../src/contexts/LanguageContext.ts');
const { translate } = require('../src/lib/i18n.ts');
function render(Component, props = {}, locale = 'en') {
  return renderToStaticMarkup(
    React.createElement(
      LanguageContext.Provider,
      { value: { locale, setLocale() {} } },
      React.createElement(Component, props),
    ),
  );
}
test('English forms preserve Spanish category values required by the API', () => {
  const { ContactForm } = require('../src/components/ContactForm.tsx');
  const html = render(ContactForm);
  assert.match(html, /<option value="Tecnología">Technology<\/option>/);
  assert.match(html, /<option value="Educación">Education<\/option>/);
  assert.match(html, /Send message/);
  assert.match(html, /name="category"/);
  assert.match(render(ContactForm, {}, 'es'), /Enviar mensaje/);
});
test('English filters preserve the selected canonical category and page sizes', () => {
  const { NewsFilters } = require('../src/components/NewsFilters.tsx');
  const html = render(NewsFilters, {
    category: 'Turismo',
    pageSize: 3,
    onCategoryChange() {},
    onPageSizeChange() {},
  });
  assert.match(html, /aria-pressed="true">Travel<\/button>/);
  assert.match(html, /value="10"/);
});
test('Pagination and status interpolation translate complete messages', () => {
  const { NewsPagination } = require('../src/components/NewsPagination.tsx');
  assert.match(
    render(NewsPagination, { currentPage: 2, pages: 4, onPageChange() {} }),
    /Page 2 of 4/,
  );
  assert.equal(
    translate('3 noticias eliminadas.', 'en'),
    '3 articles deleted.',
  );
  assert.equal(
    translate('Seleccionar: {title}', 'en', { title: '<test>' }),
    'Select: <test>',
  );
});
test('News catalog translates article titles and keeps unknown content intact', () => {
  assert.equal(
    translate('La inteligencia artificial revoluciona la educación', 'en'),
    'Artificial intelligence is revolutionizing education',
  );
  assert.equal(translate('Mi noticia original', 'en'), 'Mi noticia original');
  assert.equal(translate('Tecnología', 'es'), 'Tecnología');
});

const {
  localizedPath,
  localeFromPath,
} = require('../src/lib/localizedRoutes.ts');
test('Localized routes preserve article IDs, queries and category anchors', () => {
  assert.equal(
    localizedPath('/noticias-y-eventos/abc?x=1#categorias', 'en'),
    '/news-and-events/abc?x=1#categories',
  );
  assert.equal(
    localizedPath('/news-and-events/abc?x=1#categories', 'es'),
    '/noticias-y-eventos/abc?x=1#categorias',
  );
  assert.equal(localizedPath('/favoritos', 'en'), '/favorites');
  assert.equal(localizedPath('/contact', 'es'), '/contacto');
  assert.equal(localizedPath('/', 'en'), '/en');
  assert.equal(localizedPath('/en', 'es'), '/');
  assert.equal(localeFromPath('/news-and-events/abc'), 'en');
  assert.equal(localeFromPath('/noticias-y-eventos/abc'), 'es');
  assert.equal(localizedPath('/api/noticias', 'en'), '/api/noticias');
});
test('Unknown routes switch the 404 language without losing their path', () => {
  assert.equal(
    localizedPath('/pagina-inexistente?source=menu#detalle', 'en'),
    '/en/pagina-inexistente?source=menu#detalle',
  );
  assert.equal(
    localizedPath('/en/pagina-inexistente?source=menu#detalle', 'es'),
    '/pagina-inexistente?source=menu#detalle',
  );
  assert.equal(localizedPath('/en/pagina-inexistente', 'en'), '/en/pagina-inexistente');
  assert.equal(localeFromPath('/en/pagina-inexistente'), 'en');
  assert.equal(localizedPath('/favorites/inexistente', 'es'), '/favoritos/inexistente');
  assert.equal(localizedPath('https://example.com/game', 'en'), 'https://example.com/game');
});
test('The 404 message and home link follow the selected language', () => {
  const { NotFoundPage } = require('../src/components/NotFoundPage.tsx');
  const english = render(NotFoundPage);
  assert.match(english, /404 · Page not found/);
  assert.match(english, /Sorry, the page you are looking for does not exist or has moved\./);
  assert.match(english, /href="\/en"[^>]*>Back to home<\/a>/);
  const spanish = render(NotFoundPage, {}, 'es');
  assert.match(spanish, /404 · Página no encontrada/);
  assert.match(spanish, /href="\/"[^>]*>Volver al inicio<\/a>/);
});
test('English administration translates fields and removal controls', () => {
  const { NewsManager } = require('../src/components/News-manager.tsx');
  const html = render(NewsManager);
  for (const text of [
    'Manage articles',
    'Administration key',
    'Create news item',
    'Title',
    'Summary',
    'Content',
    'Delete articles',
    'Article image (optional)',
  ])
    assert.ok(html.includes(text), text);
  assert.match(html, /value="Tecnología">Technology/);
  assert.equal(translate('Nexo Noticias', 'en'), 'Nexo News');
  assert.equal(translate('Inicio', 'es'), 'Inicio');
});

test('Event rendering is stable without runtime locale formatting', () => {
  const { formatEventDate, formatEventTime } = require('../src/lib/eventFormatting.ts');
  assert.equal(formatEventTime('00:05', 'es'), '12:05 a. m.');
  assert.equal(formatEventTime('12:00', 'es'), '12:00 p. m.');
  assert.equal(formatEventTime('16:30', 'en'), '4:30 PM');
  assert.deepEqual(formatEventDate('2026-09-23', 'es'), {
    day: '23', month: 'sept', fullDate: '23 de septiembre de 2026',
  });
  const { EventsSection } = require('../src/components/EventsSection.tsx');
  const original = Intl.DateTimeFormat;
  try {
    Intl.DateTimeFormat = function () { throw new Error('Environment-dependent formatting'); };
    const spanish = render(EventsSection, {}, 'es');
    const english = render(EventsSection, {}, 'en');
    assert.equal((spanish.match(/<li[ >]/g) || []).length, 6);
    assert.match(spanish, /10:00 a\. m\. – 11:30 a\. m\./);
    assert.match(english, /10:00 AM – 11:30 AM/);
    assert.match(english, /September 23, 2026/);
  } finally {
    Intl.DateTimeFormat = original;
  }
});

test('Category pages localize routes and link to canonical news filters', () => {
  assert.equal(localizedPath('/categorias', 'en'), '/categories');
  assert.equal(localizedPath('/categories', 'es'), '/categorias');
  assert.equal(localeFromPath('/categories'), 'en');
  const { CategoriesPage } = require('../src/components/CategoriesPage.tsx');
  const english = render(CategoriesPage);
  const spanish = render(CategoriesPage, {}, 'es');
  assert.match(english, /href="\/news-and-events\?category=Travel"/);
  assert.match(spanish, /href="\/noticias-y-eventos\?category=Tecnolog%C3%ADa"/);
  assert.match(english, /Current affairs/);
  assert.match(spanish, /Actualidad/);
  assert.equal((english.match(/<li>/g) || []).length, 4);
});

test('Category query values translate both ways without changing the news filter', () => {
  const { categoryFromQuery } = require('../src/lib/categoryRoutes.ts');
  for (const [es, en] of [
    ['Tecnología', 'Technology'], ['Educación', 'Education'],
    ['Turismo', 'Travel'], ['Actualidad', 'Current affairs'],
  ]) {
    const english = localizedPath('/noticias-y-eventos?category=' + encodeURIComponent(es) + '&page=2#categorias', 'en');
    const parsed = new URL(english, 'http://localhost');
    assert.equal(parsed.pathname, '/news-and-events');
    assert.equal(parsed.searchParams.get('category'), en);
    assert.equal(parsed.searchParams.get('page'), '2');
    assert.equal(parsed.hash, '#categories');
    assert.equal(categoryFromQuery(parsed.searchParams.get('category')), es);
    const spanish = new URL(localizedPath(english, 'es'), 'http://localhost');
    assert.equal(spanish.searchParams.get('category'), es);
    assert.equal(spanish.hash, '#categorias');
    assert.equal(categoryFromQuery(es), es);
  }
  assert.equal(categoryFromQuery('Unknown'), undefined);
  assert.equal(categoryFromQuery(null), undefined);
  assert.equal(localizedPath('/api/noticias?category=Turismo', 'en'), '/api/noticias?category=Turismo');
});
