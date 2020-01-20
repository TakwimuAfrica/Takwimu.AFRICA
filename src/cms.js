import fetch from 'isomorphic-unfetch';
import config from './config';

export async function getPage(type) {
  const res = await fetch(
    `${config.url}/api/v2/pages/?type=${type}&fields=*&format=json`
  );
  const data = res.ok ? await res.json() : {};

  Object.assign(config.page, data.items[0]);

  return config;
}

export async function getPostBySlug(type, slug) {
  const res = await fetch(
    `${config.WP_BACKEND_URL}/wp-json/wp/v2/${type}?slug=${slug}`
  );
  const data = res.ok ? await res.json() : {};

  return {
    takwimu: config,
    wp: data[0]
  };
}

export async function getSitePage(slug) {
  const res = await fetch(
    `${config.WP_BACKEND_URL}/wp-json/wp/v2/pages?slug=${slug}`
  );

  const data = res.ok ? await res.json() : {};

  Object.assign(
    config.page,
    { rendered: data[0].content.rendered },
    data[0].acf
  );

  return config;
}

export async function getSectionedCharts() {
  const res = await fetch(
    `${config.WP_BACKEND_URL}/wp-json/hurumap-data/charts?sectioned=1`
  );
  return res.ok ? res.json() : null;
}

export async function getChartDefinition(chartId) {
  const res = await fetch(
    `${config.WP_BACKEND_URL}/wp-json/hurumap-data/charts/${chartId}`
  );
  return res.ok ? res.json() : null;
}

export async function getPostById(type, id) {
  const res = await fetch(
    `${config.WP_BACKEND_URL}/wp-json/wp/v2/${type}/${id}`
  );
  return res.ok ? res.json() : null;
}
