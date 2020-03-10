export default function sliceMultiLangTitle(title, lang) {
  const searchTerm = `[:${lang}]`;
  const startIndex = title.indexOf(searchTerm) + searchTerm.length;
  const endIndex = title.indexOf('[:', startIndex);

  return title.slice(startIndex, endIndex + 1);
}
