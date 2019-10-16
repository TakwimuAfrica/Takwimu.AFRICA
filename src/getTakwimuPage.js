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

export async function getSitePage(slug) {
  const res = await fetch(
    `${config.WP_BACKEND_URL}/wp-json/wp/v2/pages?slug=${slug}`
  );
  const data = await res.json();

  Object.assign(config.page, data[0].acf);

  return config;
}
