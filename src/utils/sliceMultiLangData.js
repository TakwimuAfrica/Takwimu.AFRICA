export default function sliceMultiLangData(value, lang) {
  const langTerm = `[:${lang}]`;
  const defaultLangTerm = '[:en]';
  const langIndex = value.includes(langTerm)
    ? value.indexOf(langTerm)
    : value.indexOf(defaultLangTerm);

  if (langIndex !== -1) {
    const startIndex = langIndex + langTerm.length;
    const endIndex = value.indexOf('[:', startIndex);

    return value.slice(startIndex, endIndex);
  }
  return value;
}
