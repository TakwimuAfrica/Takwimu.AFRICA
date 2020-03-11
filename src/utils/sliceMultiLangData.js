export default function sliceMultiLangData(title, lang) {
  const langTerm = `[:${lang}]`;
  const defaultLangTerm = '[:en]';
  const langIndex = title.includes(langTerm)
    ? title.indexOf(langTerm)
    : title.indexOf(defaultLangTerm);

  if (langIndex !== -1) {
    const startIndex = langIndex + langTerm.length;
    const endIndex = title.indexOf('[:', startIndex);

    return title.slice(startIndex, endIndex);
  }
  return title;
}
