import fetch from 'isomorphic-unfetch';
import config from './config';

export default async function getTakwimuPage(type) {
  console.time('download');
  const res = await fetch(
    `${config.url}/api/v2/pages/?type=${type}&fields=*&format=json`
  );
  const data = await res.json();

  console.timeEnd('download');

  Object.assign(config.page, data.items[0]);

  return config;
}
