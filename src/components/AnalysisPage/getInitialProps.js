import { getPostById, getPostBySlug } from '../../cms';
import config from '../../config';

export default async function({
  query: { geoIdOrCountrySlug: slug, analysisSlug, lang: queryLang },
  asPath
}) {
  const { countries } = config;

  Object.assign(
    config.country,
    countries.find(c => c.slug === slug)
  );
  const lang = queryLang || config.country.lang || config.DEFAULT_LANG;
  config.language = lang; // eslint-disable-line no-param-reassign

  let analyses = [];
  let activeAnalysis = {};
  let initial = 0;
  let topicsNavigation = '';
  let readNextTitle = '';
  let contentSelector = {};

  try {
    const [profile] = await getPostBySlug('profile', slug, lang);

    if (profile && profile.acf) {
      const {
        acf: {
          sections,
          topics_navigation: topicsNav,
          read_other_topics_label: readTopics,
          profile_select_label: contentSelectLabel,
          country_select_label: countrySelectLabel,
          selector_title: contentSelectTitle,
          button_label: actionLabel
        }
      } = profile;
      topicsNavigation = topicsNav;
      readNextTitle = readTopics;
      contentSelector = {
        contentSelectLabel,
        countrySelectLabel,
        contentSelectTitle,
        actionLabel
      };

      if (sections.length) {
        let foundIndex = -1;
        if (analysisSlug) {
          foundIndex = sections.findIndex(
            ({ section }) => section.post_name === analysisSlug
          );
        }
        initial = foundIndex !== -1 ? foundIndex : 0;
        activeAnalysis = sections[initial].section;

        // topics is an acf field on profile section
        // get the acfs fields from profile_section_page route for currentAnalysis
        const {
          acf: { section_topics: sectionTopics }
        } = await getPostById('profile_section_page', activeAnalysis.ID, lang);

        const topics = await Promise.all(
          sectionTopics.map(async t => {
            const topic = t.profile_section_topic || t;
            if (topic.post_content === '') {
              topic.type = 'carousel_topic'; // eslint-disable-line no-param-reassign
              // add another backend call to fetch the carousel_topic
              const {
                acf: { topic_carousel_body: carousel }
              } = await getPostById('carousel_topic', topic.ID, lang);

              topic.carousel = carousel; // eslint-disable-line no-param-reassign
            } else {
              const {
                content: { rendered } = { rendered: '' }
              } = await getPostById('topic_page', topic.ID, lang);
              topic.type = 'topic'; // eslint-disable-line no-param-reassign
              topic.content = rendered; // eslint-disable-line no-param-reassign
            }
            return topic;
          })
        );
        activeAnalysis.topics = topics; // eslint-disable-line no-param-reassign
      }
      Object.assign(config.page, sections[0].section);
      analyses = sections.map(({ section }) => section);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(err);
  }

  const analysisLink = `${config.url}${asPath}`;

  return {
    takwimu: config,
    activeAnalysis,
    initial,
    analyses,
    topicsNavigation,
    readNextTitle,
    analysisLink,
    contentSelector
  };
}
