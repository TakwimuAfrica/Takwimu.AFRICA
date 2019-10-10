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
      const foundTopicIndex = analyses[initial].section.topics.findIndex(
        ({ profile_section_topic: topic }) => topic.topic_name === topicId
      );

      setTopicIndex(foundTopicIndex !== -1 ? foundTopicIndex : 0);
    }
  }, [analyses, initial]);

  return (
    <Page
      takwimu={takwimu}
      indicatorId={indicatorId}
      title={`${takwimu.country.short_name}'s ${analyses[current].section.post_title} Analysis`}
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
          content={analyses[current].section}
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
      section: PropTypes.shape({
        post_title: PropTypes.string,
        topics: PropTypes.arrayOf(
          PropTypes.shape({
            ID: PropTypes.string,
            findIndex: PropTypes.func
          })
        )
      })
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

AnalysisPage.getInitialProps = async ({ query, req }) => {
  const { WP_BACKEND_URL, countries } = config;
  const { geoIdOrCountrySlug, analysisSlug, indicator: indicatorId } = query;

  const configs = await fetch(
    `${WP_BACKEND_URL}/wp-json/wp/v2/profile?slug=${geoIdOrCountrySlug}`
  ).then(response => {
    if (response.status === 200) {
      return response.json().then(async data => {
        const {
          acf: { sections, geography }
        } = data[0];
        const country = countries.find(c => c.slug === geography);
        if (sections.length) {
          Object.assign(config.page, sections[0].section);
          Object.assign(config.country, country);

          let foundIndex = -1;
          if (analysisSlug) {
            foundIndex = sections.findIndex(
              ({ section }) => section.post_name === analysisSlug
            );
          }
          const initial = foundIndex !== -1 ? foundIndex : 0;

          // topics as section topics is an acf field on profile section
          // so for each profile section page, get the acfs fields
          await Promise.all(
            sections.map(async ({ section }) => {
              const res = await fetch(
                `${WP_BACKEND_URL}/wp-json/wp/v2/profile_section_page/${section.ID}`
              );
              const {
                acf: {
                  geography: sectionGeography,
                  section_topics: sectionTopics
                }
              } = await res.json();

              await Promise.all(
                sectionTopics.map(async ({ profile_section_topic: topic }) => {
                  if (topic.post_content === '') {
                    topic.type = 'carousel_topic'; // eslint-disable-line no-param-reassign
                    // add another backend call to fetch the carousel_topic
                    const resCarousel = await fetch(
                      `${WP_BACKEND_URL}/wp-json/wp/v2/carousel_topic/${topic.ID}`
                    );
                    const {
                      acf: { topic_carousel_body: carousel }
                    } = await resCarousel.json();
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

          return { takwimu: config, initial, analyses: sections };
        }
        return Promise.reject();
      });
    }
    return Promise.reject();
  });

  return {
    ...configs,
    indicatorId,
    analysisLink: `${req.protocol}://${req.headers.host}${req.url}`
  };
};

export default AnalysisPage;
