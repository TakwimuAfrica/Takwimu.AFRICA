export default function getHydrateContent(parent, ...types) {
  const node = parent || document;
  const hydrate = {
    indicators: () =>
      Array.from(node.querySelectorAll('[id^="indicator-block"]')).map(
        element => ({
          element,
          layout: element.attributes['data-layout'].value,
          title: element.attributes['data-title'].value,
          src: element.attributes['data-src'].value
        })
      ),
    hurumap: () =>
      Array.from(node.querySelectorAll('div[id^="indicator-hurumap"]')).map(
        element => ({
          element,
          geoId: element.attributes['data-geo-type'].value,
          chartId: element.attributes['data-chart-id'].value
        })
      ),
    flourish: () =>
      Array.from(node.querySelectorAll('div[id^="indicator-flourish"]')).map(
        element => ({
          element,
          title: element.attributes['data-chart-title'].value,
          chartId: element.attributes['data-chart-id'].value
        })
      )
  };
  if (!Array.isArray(types)) {
    return {};
  }
  return Object.assign(
    {},
    ...types.map(t => ({ [t]: hydrate[t.toLowerCase()]() || [] }))
  );
}
