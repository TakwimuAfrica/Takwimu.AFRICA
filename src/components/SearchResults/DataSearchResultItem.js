import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Link from '../Link';
import config from '../../config';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '1.5rem'
  },
  searchResult: {},
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'underline'
  },
  searchResultItem: {
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  },
  resultType: {
    fontWeight: 'bold'
  }
}));

function InTopicDataResult({ topicId, item, title, visualType, chartId }) {
  const classes = useStyles();
  const [country, setCountry] = useState('');
  const [sectionSlug, setSectionSlug] = useState('');
  const [topicSlug, setTopicSlug] = useState('');

  useEffect(() => {
    fetch(
      `${config.WP_BACKEND_URL}/wp-json/wp/v2/topic_page/${topicId}?_embed`
    ).then(response => {
      if (response.status === 200) {
        response
          .json()
          .then(
            ({ slug, acf: { section_topics: profileSection }, _embedded }) => {
              setTopicSlug(slug);
              if (profileSection && profileSection.length > 0) {
                setSectionSlug(profileSection[0].post_name);
              }
              const category = _embedded['wp:term'][0][0];
              setCountry(category);
            }
          );
      }
    });
  }, [topicId]);

  const link = `/profiles/${country.slug}/${sectionSlug}#${topicSlug}?indicator=indicator-${visualType}-${chartId}`;

  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.resultType}>
        {item}
      </Typography>
      <Link href={link} as={link} className={classes.link}>
        <Typography variant="body1" className={classes.searchResultItem}>
          {country.name} - {title}
        </Typography>
      </Link>
    </div>
  );
}

InTopicDataResult.propTypes = {
  topicId: PropTypes.number.isRequired,
  visualType: PropTypes.string.isRequired,
  chartId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired
};

export const InTopicResult = InTopicDataResult;

function InGeographyDataResult({ geoId, item, title, chartId }) {
  const classes = useStyles();
  const link = `/embed/${geoId}/${chartId}`; // TODO: link should be replaced with data-by-topics once we know section in belongs
  const countryCode = geoId.split('-')[1].slice(2);
  const country = config.countries.find(c => c.code === countryCode);

  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.resultType}>
        {item}
      </Typography>
      <Link href={link} as={link} className={classes.link}>
        <Typography variant="body1" className={classes.searchResultItem}>
          {country.name} - {title}
        </Typography>
      </Link>
    </div>
  );
}

InGeographyDataResult.propTypes = {
  chartId: PropTypes.number.isRequired,
  geoId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired
};

export const InGeographyResult = InGeographyDataResult;

function DataSearchResultItem({ item, title, id, visualType, visualData }) {
  const { inTopics, inGeography } = visualData
    ? JSON.parse(visualData.replace('\\', ''))
    : { inTopics: {}, inGeography: {} };

  if (inTopics && inTopics.length > 0) {
    return (
      <>
        {inTopics.map(topicId => (
          <InTopicResult
            key={`result-${topicId}-${id}`}
            topicId={topicId}
            title={title}
            chartId={id}
            visualType={visualType}
            item={item}
          />
        ))}
      </>
    );
  }
  if (inGeography && inGeography.length > 0) {
    return (
      <>
        {inGeography.map(geoId => (
          <InGeographyResult
            key={`result-${geoId}-${id}`}
            geoId={geoId}
            chartId={id}
            title={title}
            item={item}
          />
        ))}
      </>
    );
  }
  return null;
}

DataSearchResultItem.propTypes = {
  visualType: PropTypes.string.isRequired,
  visualData: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired
};

export default DataSearchResultItem;
