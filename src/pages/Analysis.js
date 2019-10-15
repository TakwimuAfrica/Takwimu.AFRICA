import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@material-ui/styles/makeStyles';

import config from '../config';
import AnalysisContent from '../components/AnalysisContent';
import AnalysisTableOfContent from '../components/AnalysisContent/TableOfContent';
import ContentPage from '../components/ContentPage';
import Page from '../components/Page';

const useStyles = makeStyles({
  root: {
    marginBottom: '5.5rem'
  },
  asideRoot: {}
});

function AnalysisPage({
  takwimu,
  initial,
  activeAnalysis,
  analyses,
  indicatorId,
  analysisLink
}) {
  const classes = useStyles();
  const [topicIndex, setTopicIndex] = useState(0);
  const changeTopic = next => {
    setTopicIndex(next);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const topicId = window.location.hash
      ? window.location.hash.split('#')[1]
      : '';
    if (topicId) {
      const foundTopicIndex = activeAnalysis.topics.findIndex(
        topic => topic.topic_name === topicId
      );

      setTopicIndex(foundTopicIndex !== -1 ? foundTopicIndex : 0);
    }
  }, [activeAnalysis]);

  if (analyses.length === 0) {
    return null;
  }

  return (
    <Page
      takwimu={takwimu}
      indicatorId={indicatorId}
      title={`${takwimu.country.short_name}'s ${activeAnalysis.post_title} Analysis`}
    >
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
          onChange={changeTopic}
          takwimu={takwimu}
          topicIndex={topicIndex}
          analysisLink={analysisLink}
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
  analysisLink: PropTypes.string.isRequired
};

AnalysisPage.defaultProps = {
  indicatorId: undefined
};

const get = async url => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

AnalysisPage.getInitialProps = async ({ query, req }) => {
  const { WP_BACKEND_URL, countries } = config;
  const { geoIdOrCountrySlug, analysisSlug, indicator: indicatorId } = query;
  let analyses = [];
  let activeAnalysis = {};
  let initial = 0;

  try {
    const [profile] = await get(
      `${WP_BACKEND_URL}/wp-json/wp/v2/profile?slug=${geoIdOrCountrySlug}`
    );

    if (profile && profile.acf) {
      const {
        acf: { sections, geography }
      } = profile;
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
    console.warn(err);
  }

  return {
    takwimu: config,
    activeAnalysis,
    initial,
    analyses,
    indicatorId,
    analysisLink: `${req.protocol}://${req.headers.host}${req.url}`
  };
};

export default AnalysisPage;
