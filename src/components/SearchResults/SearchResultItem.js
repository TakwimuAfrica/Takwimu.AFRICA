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

function SearchResultItem({ title, resultType, slug, id, country, item }) {
  const classes = useStyles();
  const [profileSlug, setProfileSlug] = useState('');

  useEffect(() => {
    if (resultType === 'topic_page') {
      fetch(`${config.WP_BACKEND_URL}/wp-json/acf/v3/${resultType}/${id}`).then(
        response => {
          if (response.status === 200) {
            response
              .json()
              .then(({ acf: { section_topics: profileSection } }) => {
                if (profileSection && profileSection.length > 0) {
                  setProfileSlug(profileSection[0].post_name);
                }
              });
          }
        }
      );
    }
  }, [resultType, id]);

  let link = '';
  let href = '';
  if (resultType === 'topic_page') {
    link = `/profiles/${country.slug}/${profileSlug}#${slug}`;
    href = '/profiles/[geoIdOrCountrySlug]/[analysisSlug]';
  } else if (resultType === 'profile_page') {
    link = `/profiles/${country.slug}/${slug}`;
    href = '/profiles/[geoIdOrCountrySlug]/[analysisSlug]';
  } else if (resultType === 'carousel_topic') {
    link = `/profiles/${country.slug}#${slug}`;
    href = '/profiles/[geoIdOrCountrySlug]';
  } else {
    link = `/profiles/${country.slug}`;
    href = '/profiles/[geoIdOrCountrySlug]';
  }

  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.resultType}>
        {item}
      </Typography>
      <Link href={href} as={link} className={classes.link}>
        <Typography variant="body1" className={classes.searchResultItem}>
          {country.name} - {title}
        </Typography>
      </Link>
    </div>
  );
}

SearchResultItem.propTypes = {
  resultType: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  country: PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  title: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired
};

export default SearchResultItem;
