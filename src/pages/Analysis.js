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
  analyses,
  indicatorId,
  analysisLink
}) {
  const classes = useStyles();
  const [current, setCurrent] = useState(initial);
  const [topicIndex, setTopicIndex] = useState(0);

  const changeContent = next => {
    setCurrent(next);
    setTopicIndex(0);
    window.scrollTo(0, 0);
  };

  const changeTopic = next => {
    setTopicIndex(next);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const topicId = window.location.hash
      ? window.location.hash.split('#')[1]
      : '';
    if (topicId) {
      const foundTopicIndex = analyses[initial].topics.findIndex(
        ({ profile_section_topic: topic }) => topic.topic_name === topicId
      );

      setTopicIndex(foundTopicIndex !== -1 ? foundTopicIndex : 0);
    }
  }, [analyses, initial]);

  return (
    <Page
      takwimu={takwimu}
      indicatorId={indicatorId}
      title={`${takwimu.country.short_name}'s ${analyses[current].post_title} Analysis`}
    >
      <ContentPage
        aside={
          <AnalysisTableOfContent
            country={takwimu.country}
            content={analyses}
            current={current}
            onChangeContent={changeContent}
          />
        }
        classes={{ root: classes.root, aside: classes.asideRoot }}
      >
        <AnalysisContent
          content={analyses[current]}
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
  initial: PropTypes.number.isRequired,
  indicatorId: PropTypes.string,
  analyses: PropTypes.arrayOf(
    PropTypes.shape({
      post_title: PropTypes.string,
      topics: PropTypes.arrayOf(
        PropTypes.shape({
          ID: PropTypes.number,
          findIndex: PropTypes.func
        })
      )
    })
  ).isRequired,
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

  const [profile] = await get(
    `${WP_BACKEND_URL}/wp-json/wp/v2/profile?slug=${geoIdOrCountrySlug}`
  );

  let analyses = [];
  let initial = 0;

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

      // topics as section topics is an acf field on profile section
      // so for each profile section page, get the acfs fields
      analyses = await Promise.all(
        sections.map(async ({ section }) => {
          const {
            acf: { geography: sectionGeography, section_topics: sectionTopics }
          } = await get(
            `${WP_BACKEND_URL}/wp-json/wp/v2/profile_section_page/${section.ID}`
          );

          await Promise.all(
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
                topic.type = 'topic'; // eslint-disable-line no-param-reassign
              }
              return topic;
            })
          );
          section.topics = sectionTopics; // eslint-disable-line no-param-reassign
          section.geography = sectionGeography; // eslint-disable-line no-param-reassign
          return section;
        })
      );

      Object.assign(config.page, analyses[0]);
    }
  }
  return {
    takwimu: config,
    initial,
    analyses,
    indicatorId,
    analysisLink: `${req.protocol}://${req.headers.host}${req.url}`
  };
};

export default AnalysisPage;
