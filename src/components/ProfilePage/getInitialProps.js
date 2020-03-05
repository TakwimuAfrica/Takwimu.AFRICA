import { getSectionedCharts } from '../../cms';
import config from '../../config';

export default async function({ query: { lang: queryLang } }) {
  const lang = queryLang || config.DEFAULT_LANG;
  return {
    sectionedCharts: await getSectionedCharts(lang),
    language: lang
  };
}
