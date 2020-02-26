import React from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Head from 'next/head';
import config from '../config';
import AnalysisContent from './AnalysisContent';
import ContentPage from './ContentPage';
import Page from './Page';
import AsideTableOfContent from './AsideTableOfContent';
import CountrySelector from './CountrySelector';

import { getPostById, getPostBySlug } from '../cms';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '5.5rem'
  },
  asideRoot: {},
  countrySelectorLabel: {
    fontSize: theme.typography.caption.fontSize
  }
}));

function AnalysisPage({
  takwimu,
  initial,
  activeAnalysis,
  analyses,
  analysisLink,
  readNextTitle,
  topicsNavigation,
  contentSelector
}) {
  const classes = useStyles();

  if (analyses.length === 0) {
    return null;
  }
  return (
    <Page
      takwimu={takwimu}
      title={`${takwimu.country.short_name}'s ${activeAnalysis.post_title} Analysis`}
    >
      <Head>
        <link
          rel="stylesheet"
          href={`${config.WP_BACKEND_URL}/wp-admin/load-styles.php?c=0&dir=ltr&load%5B%5D=dashicons,buttons,media-views,wp-components,wp-nux,wp-block-library,wp-block-&load%5B%5D=library-theme,wp-format-library,common,forms,dashboard,list-tables,edit,revisions,media,t&load%5B%5D=hemes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-color-picker`}
        />
        <link
          rel="stylesheet"
          href={`${config.WP_BACKEND_URL}/wp-includes/js/mediaelement/wp-mediaelement.min.css`}
        />
      </Head>
      <ContentPage
        aside={
          <AsideTableOfContent
            hideTitle
            top={120}
            current={initial}
            contentHeadings={analyses.map(section => ({
              title: section.post_title,
              postName: section.post_name
            }))}
            generateHref={({ postName }, index) => {
              const {
                country: { slug: countrySlug }
              } = takwimu;
              const href =
                index === 0
                  ? `/profiles/[geoIdOrCountrySlug]` // if politics
                  : `/profiles/[geoIdOrCountrySlug]/[analysisSlug]`;
              const as =
                index === 0
                  ? `/profiles/${countrySlug}` // if politics
                  : `/profiles/${countrySlug}/${postName}`;
              return { href, as };
            }}
          >
            <CountrySelector
              context="analysis"
              country={takwimu.country}
              classes={{ label: classes.countrySelectorLabel }}
            />
          </AsideTableOfContent>
        }
        classes={{ root: classes.root, aside: classes.asideRoot }}
      >
        <AnalysisContent
          content={activeAnalysis}
          takwimu={takwimu}
          analysisLink={analysisLink}
          readNextTitle={readNextTitle}
          topicsNavigation={topicsNavigation}
          contentSelector={contentSelector}
        />
      </ContentPage>
    </Page>
  );
}

AnalysisPage.propTypes = {
  initial: PropTypes.number.isRequired,
  activeAnalysis: PropTypes.shape({
    post_title: PropTypes.string,
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        ID: PropTypes.number
      })
    )
  }).isRequired,
  analyses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  takwimu: PropTypes.shape({
    country: PropTypes.shape({
      short_name: PropTypes.string,
      slug: PropTypes.string
    })
  }).isRequired,
  analysisLink: PropTypes.string.isRequired,
  readNextTitle: PropTypes.string.isRequired,
  topicsNavigation: PropTypes.string.isRequired,
  contentSelector: PropTypes.shape({}).isRequired
};

AnalysisPage.getInitialProps = async ({
  query: { geoIdOrCountrySlug: slug, analysisSlug, lang: queryLang },
  asPath
}) => {
  const { countries } = config;

  Object.assign(
    config.country,
    countries.find(c => c.slug === slug)
  );
  const lang = queryLang || config.country.lang || config.DEFAULT_LANG;

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
};

export default AnalysisPage;
