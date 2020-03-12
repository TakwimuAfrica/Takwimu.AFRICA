import { getSectionedCharts } from '../../cms';
import config from '../../config';

export default async function({ query: { lang: queryLang, indicatorId } }) {
  const lang = queryLang || config.DEFAULT_LANG;
  return {
    sectionedCharts: await getSectionedCharts(lang),
    language: lang,
    indicatorId
  };
}
