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
