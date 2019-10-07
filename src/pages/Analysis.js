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
      const foundTopicIndex = analyses[initial].body.findIndex(
        body => body.id === topicId
      );

      setTopicIndex(foundTopicIndex !== -1 ? foundTopicIndex : 0);
    }
  }, [analyses, initial]);

  return (
    <Page
      takwimu={takwimu}
      indicatorId={indicatorId}
      title={`${takwimu.country.short_name}'s ${analyses[current].title} Analysis`}
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
      title: PropTypes.string,
      body: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string
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

AnalysisPage.getInitialProps = async ({ query, req }) => {
  console.time('download');
  const { url } = config;
  const { countrySlug, analysisSlug, indicator: indicatorId } = query;

  const configs = await fetch(
    `${url}/api/v2/pages/?type=takwimu.ProfilePage&slug=${countrySlug}&fields=*&format=json`
  ).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        const { items: countryAnalysis } = data;
        if (countryAnalysis.length) {
          // For ProfilePage, label is used to provide descriptive title since
          // title is just the country name
          countryAnalysis[0].title = countryAnalysis[0].label;
          Object.assign(config.page, countryAnalysis[0]);
          Object.assign(config.country, config.page.country);

          return { takwimu: config, countryAnalysis };
        }

        return Promise.reject();
      });
    }
    return Promise.reject();
  });

  const { takwimu, countryAnalysis } = configs;

  const content = await fetch(
    `${url}/api/v2/pages/?type=takwimu.ProfileSectionPage&fields=*&descendant_of=${countryAnalysis[0].id}&format=json`
  ).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        const analyses = countryAnalysis.concat(data.items);

        let foundIndex = -1;
        if (analysisSlug) {
          foundIndex = analyses.findIndex(
            item => item.meta.slug === analysisSlug
          );
        }
        return {
          analyses,
          initial: foundIndex !== -1 ? foundIndex : 0
        };
      });
    }

    return Promise.reject();
  });

  console.timeEnd('download');
  return {
    takwimu,
    ...content,
    indicatorId,
    analysisLink: `${req.protocol}://${req.headers.host}${req.url}`
  };
};

export default AnalysisPage;
