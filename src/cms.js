import fetch from 'isomorphic-unfetch';
import config from './config';

export async function getPage(type) {
  const res = await fetch(
    `${config.WP_BACKEND_URL}/api/v2/pages/?type=${type}&fields=*&format=json`
  );
  const data = res.ok ? await res.json() : {};

  Object.assign(config.page, data.items[0]);

  return config;
}

export async function getPostBySlug(type, slug, lang) {
  const res = await fetch(
    `${config.WP_BACKEND_URL}/wp-json/wp/v2/${type}?slug=${slug}&lang=${lang}`
  );
  const data = res.ok ? await res.json() : {};

  return data;
}

export async function getSitePage(slug, lang) {
  const res = await fetch(
    `${config.WP_BACKEND_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${lang}`
  );

  const data = res.ok ? await res.json() : {};

  Object.assign(
    config.page,
    { rendered: data[0].content.rendered },
    data[0].acf
  );

  config.language = lang;

  return config;
}

export async function getSectionedCharts(lang) {
  const res = await fetch(
    `${config.WP_BACKEND_URL}/wp-json/hurumap-data/charts?sectioned=1&type=hurumap&lang=${lang}`
  );
  return res.ok ? res.json() : null;
}

export async function getChartDefinition(chartId, lang) {
  const res = await fetch(
    `${config.WP_BACKEND_URL}/wp-json/hurumap-data/charts/${chartId}?lang=${lang}`
  );
  return res.ok ? res.json() : null;
}

export async function getPostById(type, id, lang) {
  const res = await fetch(
    `${config.WP_BACKEND_URL}/wp-json/wp/v2/${type}/${id}?lang=${lang}`
  );
  return res.ok ? res.json() : null;
}
