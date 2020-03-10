export default function sliceMultiLangTitle(title, lang) {
  const searchTerm = `[:${lang}]`;
  const startIndex = title.indexOf(searchTerm);
  const endIndex = title.indexOf('[:', startIndex + searchTerm.length);

  return title.slice(startIndex, endIndex);
}
