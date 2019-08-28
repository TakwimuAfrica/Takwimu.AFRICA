import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/core';

import config from '../config';
import AnalysisContent from '../components/AnalysisContent';
import AnalysisTableOfContent from '../components/AnalysisContent/TableOfContent';
import ContentPage from '../components/ContentPage';
import Page from '../components/Page';

const styles = () => ({
  root: {
    marginBottom: '5.5rem'
  },
  asideRoot: {}
});

function AnalysisPage({
  classes,
  match: {
    params: { countrySlug }
  }
}) {
  const [analysis, setAnalysis] = useState(undefined);
  const [current, setCurrent] = useState(0);
  const [takwimu, setTakwimu] = useState(undefined);
  const [topicIndex, setTopicIndex] = useState(0);
  useEffect(() => {
    const { url } = config;
    const fetchSectionPages = countryAnalysis => {
      fetch(
        `${url}/api/v2/pages/?type=takwimu.ProfileSectionPage&fields=*&descendant_of=${countryAnalysis[0].id}&format=json`
      ).then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            const paths = window.location.pathname.split(
              `/profiles/${countrySlug}/`
            );

            let foundIndex = -1;
            if (paths.length === 2) {
              const sectionSlug = paths[1].replace('/', '');
              foundIndex = data.items.findIndex(
                item => item.meta.slug === sectionSlug
              );
            }
            let nextCurrent = foundIndex !== -1 ? foundIndex : current;
            let nextAnalysis = countryAnalysis;
            if (nextAnalysis) {
              if (foundIndex !== -1) {
                // Adjust for `Country Overview`
                nextCurrent += nextAnalysis.length;
              }
              nextAnalysis = nextAnalysis.concat(data.items);
            }

            let nextTopicIndex = topicIndex;
            const { hash } = window.location;
            if (hash.length) {
              const topicId = hash.replace('#', '');
              const foundTopicIndex = nextAnalysis[current].body.findIndex(
                body => body.id === topicId
              );
              if (foundTopicIndex !== -1) {
                nextTopicIndex = foundTopicIndex;
              }
            }

            setCurrent(nextCurrent);
            setTopicIndex(nextTopicIndex);
            setAnalysis(nextAnalysis);
          });
        }
      });
    };

    fetch(
      `${url}/api/v2/pages/?type=takwimu.ProfilePage&slug=${countrySlug}&fields=*&format=json`
    ).then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          const { items: countryAnalysis } = data;
          if (countryAnalysis.length) {
            // For ProfilePage, label is used to provide descriptive title since
            // title is just the country name
            countryAnalysis[0].title = countryAnalysis[0].label;
            Object.assign(config.page, countryAnalysis[0]);
            Object.assign(config.country, config.page.country);
            setTakwimu(config);
          }
          fetchSectionPages(countryAnalysis);
        });
      }
    });
  }, [countrySlug, current, topicIndex]);

  const changeContent = nextCurrent => {
    setCurrent(nextCurrent);
    setTopicIndex(0);
    window.scrollTo(0, 0);
  };

  const changeTopic = nextTopicIndex => {
    setTopicIndex(nextTopicIndex);
    window.scrollTo(0, 0);
  };
  if (!analysis) {
    return null;
  }

  return (
    <Page
      takwimu={takwimu}
      title={`${takwimu.country.short_name}'s ${analysis[current].title} Analysis`}
    >
      <ContentPage
        aside={
          <AnalysisTableOfContent
            country={takwimu.country}
            content={analysis}
            current={current}
            onChangeContent={changeContent}
          />
        }
        classes={{ root: classes.root, aside: classes.asideRoot }}
      >
        <AnalysisContent
          content={analysis[current]}
          onChange={changeTopic}
          takwimu={takwimu}
          topicIndex={topicIndex}
        />
      </ContentPage>
    </Page>
  );
}

AnalysisPage.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      countrySlug: PropTypes.string
    }).isRequired
  }).isRequired
};

export default withStyles(styles)(AnalysisPage);
