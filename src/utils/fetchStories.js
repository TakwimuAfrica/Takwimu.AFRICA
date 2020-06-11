import config from '../config';

export default async function fetchStories() {
  const urlJson = `https://corsio.devops.codeforafrica.org/?${config.stories.url}?format=json`;
  const response = await fetch(urlJson);
  const jsonClean = await (await response.text()).replace(
    '])}while(1);</x>',
    ''
  );
  const json = await JSON.parse(jsonClean);
  const reportStreamItems = await json.payload.streamItems;
  const reports = await reportStreamItems.map(
    reportStreamItem =>
      reportStreamItem.postPreview &&
      json.payload.references.Post[reportStreamItem.postPreview.postId]
  );

  // Remove null stories
  return reports.filter(story => story);
}
