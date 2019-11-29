import fetch from 'isomorphic-unfetch';
import config from './config';

export default async function getTakwimuPage(type) {
  const res = await fetch(
    `${config.url}/api/v2/pages/?type=${type}&fields=*&format=json`
  );
  const data = await res.json();

  Object.assign(config.page, data.items[0]);

  return config;
}

export async function get(type, slug) {
  const res = await fetch(
    `${config.WP_BACKEND_URL}/wp-json/wp/v2/${type}?slug=${slug}`
  );
  const data = await res.json();

  return {
    takwimu: config,
    wp: data[0]
  };
}

export async function getSitePage(slug) {
  const res = await fetch(
    `${config.WP_BACKEND_URL}/wp-json/wp/v2/pages?slug=${slug}`
  );
  const data = await res.json();

  Object.assign(
    config.page,
    { rendered: data[0].content.rendered },
    data[0].acf
  );

  return config;
}

export async function getChartDefinitions() {
  const res = await fetch(
    `${config.WP_BACKEND_URL}/wp-json/hurumap-data/charts?published=1`
  );
  return res.json();
}
