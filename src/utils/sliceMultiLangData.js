export default function sliceMultiLangData(title, lang) {
  const searchTerm = `[:${lang}]`;
  const langIndex = title.indexOf(searchTerm);
  if (langIndex !== -1) {
    const startIndex = langIndex + searchTerm.length;
    const endIndex = title.indexOf('[:', startIndex);

    return title.slice(startIndex, endIndex);
  }
  return title;
}
