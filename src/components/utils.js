/* eslint-disable import/prefer-default-export */
import config from '../config';

const DEFAULT_CONJ = ' ';

export const countrify = (
  title,
  country,
  countries = config.countries,
  conj,
  language = config.language
) => {
  const foundCountry = countries.find(c => c.slug === country.slug);
  if (
    foundCountry &&
    !title.toLowerCase().startsWith(foundCountry.short_name.toLowerCase())
  ) {
    let langConj = conj;
    if (!langConj) {
      switch (language) {
        case 'en':
          langConj = '&rsquo;s ';
          break;
        default:
          langConj = DEFAULT_CONJ;
          break;
      }
    }
    return `${foundCountry.short_name}${langConj}${title}`;
  }
  return title;
};
