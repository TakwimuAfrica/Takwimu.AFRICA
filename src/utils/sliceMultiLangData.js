export default function sliceMultiLangData(value, lang) {
  const langTerm = `[:${lang}]`;
  const defaultLangTerm = '[:en]';

  const availLangTerm = value.includes(langTerm) ? langTerm : defaultLangTerm;

  const langIndex = value.indexOf(availLangTerm);

  if (langIndex !== -1) {
    const startIndex = langIndex + availLangTerm.length;
    const endIndex = value.indexOf('[:', startIndex);

    return value.slice(startIndex, endIndex);
  }
  return value;
}
