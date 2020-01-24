import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Link from '../Link';
import Selection from '../CountryContent/Selection';

import config from '../../config';

const useStyles = makeStyles(({ breakpoints, palette }) => ({
  root: {
    marginTop: '1.5rem'
  },
  searchResult: {},
  link: {
    color: palette.primary.main,
    textDecoration: 'underline'
  },
  searchResultItem: {
    color: palette.primary.main,
    fontWeight: 'bold'
  },
  resultType: {
    fontWeight: 'bold'
  },
  dropDownRoot: {
    [breakpoints.up('md')]: {
      marginLeft: '0.85rem'
    },
    [breakpoints.up('lg')]: {
      marginLeft: '0.995rem'
    }
  },
  selectMenu: {
    paddingTop: '0.625rem',
    paddingBottom: '0.625rem'
  }
}));

function InTopicDataResult({ inTopics, item, title, visualType, chartId }) {
  const classes = useStyles();
  const [topic, setTopic] = useState(inTopics[0]);
  const [link, setLink] = useState('');

  useEffect(() => {
    fetch(`${config.WP_BACKEND_URL}/wp-json/wp/v2/topic_page/${topic.id}`).then(
      response => {
        if (response.status === 200) {
          response
            .json()
            .then(
              ({
                slug: topicSlug,
                acf: { section_topics: profileSection }
              }) => {
                let sectionSlug = '';
                if (profileSection && profileSection.length > 0) {
                  sectionSlug = profileSection[0].post_name;
                }
                setLink(
                  `/profiles/${topic.countrySlug}/${sectionSlug}#${topicSlug}?indicatorId=indicator-${visualType}-${chartId}`
                );
              }
            );
        }
      }
    );
  }, [topic.id, topic.countrySlug, visualType, chartId]);

  const handleTopicIdChanges = e => {
    const topicId = e.target.value;
    const selectedTopic = inTopics.find(t => t.id === topicId);
    setTopic(selectedTopic);
  };

  const topicOptions = inTopics.map(x => {
    const xCountry = config.countries.find(c => c.slug === x.countrySlug);
    const label = xCountry ? `${xCountry.name}- ${x.title}` : x.title;
    return {
      value: x.id,
      label
    };
  });

  const href = '/profiles/[geoIdOrCountrySlug]/[analysisSlug]';
  const country = config.countries.find(c => c.slug === topic.countrySlug);

  return (
    <div className={classes.root}>
      <Grid container direction="row">
        <Typography variant="body1" className={classes.resultType}>
          {item}
        </Typography>
        {inTopics.length > 1 && (
          <Selection
            items={topicOptions}
            value={topic.id}
            onChange={handleTopicIdChanges}
            classes={{
              root: classes.dropDownRoot,
              selectMenu: classes.selectMenu
            }}
          />
        )}
      </Grid>
      <Link href={href} as={link} className={classes.link}>
        <Typography variant="body1" className={classes.searchResultItem}>
          {country && `${country.name} -`} {title}
        </Typography>
      </Link>
    </div>
  );
}

InTopicDataResult.propTypes = {
  inTopics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  visualType: PropTypes.string.isRequired,
  chartId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired
};

export const InTopicResult = InTopicDataResult;

function InGeographyDataResult({ item, title, chartId, inGeographies }) {
  const classes = useStyles();
  const [geo, setGeo] = useState(inGeographies[0]);
  const countryCode = geo.geoCode.slice(0, 2);
  const country = config.countries.find(c => c.iso_code === countryCode);
  const href = '/profiles/[geoIdOrCountrySlug]';

  const handleGeoIdChanges = e => {
    const geoId = e.target.value;
    const selectedGeo = inGeographies.find(
      g =>
        geo.geoLevel === geoId.split('-')[0] &&
        g.geoCode === geoId.split('-')[1]
    );
    setGeo(selectedGeo);
  };

  const geoOptions = inGeographies.map(x => {
    return {
      value: `${x.geoLevel}-${x.geoCode}`,
      label: x.geoLevel === 'country' ? x.name : `${x.name} ${country.name}`
    };
  });

  return (
    <div className={classes.root}>
      <Grid container direction="row">
        <Typography variant="body1" className={classes.resultType}>
          {item}
        </Typography>
        {inGeographies.length > 1 && (
          <Selection
            items={geoOptions}
            value={`${geo.geoLevel}-${geo.geoCode}`}
            onChange={handleGeoIdChanges}
            classes={{
              root: classes.dropDownRoot,
              selectMenu: classes.selectMenu
            }}
          />
        )}
      </Grid>
      <Link
        href={href}
        as={`/profiles/${geo.geoLevel}-${geo.geoCode}#${chartId}`}
        className={classes.link}
      >
        <Typography variant="body1" className={classes.searchResultItem}>
          {geo.geoLevel === 'country'
            ? country.name
            : `${geo.name} ${country.name}`}{' '}
          - {title}
        </Typography>
      </Link>
    </div>
  );
}

InGeographyDataResult.propTypes = {
  chartId: PropTypes.number.isRequired,
  inGeographies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired
};

export const InGeographyResult = InGeographyDataResult;

function DataSearchResultItem({ item, title, id, visualType, visualData }) {
  const classes = useStyles();
  const { inTopics, inGeographies } = visualData
    ? JSON.parse(visualData.replace('\\', ''))
    : { inTopics: [], inGeography: [] };

  if (inTopics && inTopics.length > 0) {
    return (
      <InTopicResult
        inTopics={inTopics}
        title={title}
        chartId={id}
        visualType={visualType}
        item={item}
      />
    );
  }
  if (inGeographies && inGeographies.length > 0) {
    return (
      <InGeographyResult
        inGeographies={inGeographies}
        chartId={id}
        title={title}
        item={item}
      />
    );
  }
  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.resultType}>
        {item}
      </Typography>
      <Typography variant="body1" className={classes.searchResultItem}>
        {title}
      </Typography>
    </div>
  );
}

DataSearchResultItem.propTypes = {
  visualType: PropTypes.string.isRequired,
  visualData: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired
};

export default DataSearchResultItem;
