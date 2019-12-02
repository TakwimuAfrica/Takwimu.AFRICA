import React, { useState } from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Head from 'next/head';
import config from '../config';
import AnalysisContent from './AnalysisContent';
import AnalysisTableOfContent from './AnalysisContent/TableOfContent';
import ContentPage from './ContentPage';
import Page from './Page';
import { getChartDefinitions } from '../getTakwimuPage';

const useStyles = makeStyles({
  root: {
    marginBottom: '5.5rem'
  },
  asideRoot: {}
});

function AnalysisPage({
  chartDefinitions,
  takwimu,
  initial,
  activeAnalysis,
  analyses,
  indicatorId,
  analysisLink
}) {
  const classes = useStyles();

  const { hurumap, flourish } = chartDefinitions;

  /**
   * Apply queryAlias
   */
  const [charts] = useState({
    hurumap: hurumap.map((chart, i) => ({
      ...chart,
      visual: {
        ...JSON.parse(chart.visual),
        queryAlias: `v${i}`
      },
      stat: {
        ...JSON.parse(chart.stat),
        queryAlias: `v${i}`
      }
    })),
    flourish
  });

  if (analyses.length === 0) {
    return null;
  }
  return (
    <Page
      takwimu={takwimu}
      indicatorId={indicatorId}
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
        <script
          crossOrigin
          src={`${config.WP_BACKEND_URL}/wp-content/themes/hurumap/micro-frontend/build/hurumap-ui.js`}
        />
      </Head>
      <ContentPage
        aside={
          <AnalysisTableOfContent
            country={takwimu.country}
            content={analyses}
            current={initial}
          />
        }
        classes={{ root: classes.root, aside: classes.asideRoot }}
      >
        <AnalysisContent
          content={activeAnalysis}
          takwimu={takwimu}
          analysisLink={analysisLink}
          charts={charts}
        />
      </ContentPage>
    </Page>
  );
}

AnalysisPage.propTypes = {
  indicatorId: PropTypes.string,
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
  chartDefinitions: PropTypes.shape({
    hurumap: PropTypes.arrayOf(PropTypes.shape({})),
    flourish: PropTypes.arrayOf(PropTypes.shape({})),
    sections: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired
};

AnalysisPage.defaultProps = {
  indicatorId: undefined
};

const get = async url => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

AnalysisPage.getInitialProps = async ({ query, asPath }) => {
  const { WP_BACKEND_URL, countries } = config;
  const { geoIdOrCountrySlug, analysisSlug, indicator: indicatorId } = query;
  let analyses = [];
  let activeAnalysis = {};
  let initial = 0;
  let topicsNavigation = '';
  let readNextTitle = '';

  try {
    const [profile] = await get(
      `${WP_BACKEND_URL}/wp-json/wp/v2/profile?slug=${geoIdOrCountrySlug}`
    );

    if (profile && profile.acf) {
      const {
        acf: {
          sections,
          geography,
          topics_navigation: topicsNav,
          read_other_topics_label: readTopics
        }
      } = profile;
      topicsNavigation = topicsNav;
      readNextTitle = readTopics;
      const country = countries.find(c => c.slug === geography);
      Object.assign(config.country, country);

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
          acf: { geography: sectionGeography, section_topics: sectionTopics }
        } = await get(
          `${WP_BACKEND_URL}/wp-json/wp/v2/profile_section_page/${activeAnalysis.ID}`
        );

        const topics = await Promise.all(
          sectionTopics.map(async ({ profile_section_topic: topic }) => {
            if (topic.post_content === '') {
              topic.type = 'carousel_topic'; // eslint-disable-line no-param-reassign
              // add another backend call to fetch the carousel_topic
              const {
                acf: { topic_carousel_body: carousel }
              } = await get(
                `${WP_BACKEND_URL}/wp-json/wp/v2/carousel_topic/${topic.ID}`
              );
              topic.carousel = carousel; // eslint-disable-line no-param-reassign
            } else {
              const {
                content: { rendered }
              } = await get(
                `${WP_BACKEND_URL}/wp-json/wp/v2/topic_page/${topic.ID}`
              );
              topic.type = 'topic'; // eslint-disable-line no-param-reassign
              topic.content = rendered; // eslint-disable-line no-param-reassign
            }
            return topic;
          })
        );
        activeAnalysis.topics = topics; // eslint-disable-line no-param-reassign
        activeAnalysis.geography = sectionGeography; // eslint-disable-line no-param-reassign
      }
      Object.assign(config.page, sections[0].section);
      analyses = sections.map(({ section }) => section);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(err);
  }

  const chartDefinitions = await getChartDefinitions();
  const analysisLink = `${config.url}${asPath}`;

  return {
    chartDefinitions,
    takwimu: config,
    activeAnalysis,
    initial,
    analyses,
    topicsNavigation,
    readNextTitle,
    indicatorId,
    analysisLink
  };
};

export default AnalysisPage;
