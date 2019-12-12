import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import NextLink from 'next/link';

import { Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

function SearchResultItem({ title, resultType, slug, id, countrySlug }) {
  const classes = useStyles();
  const [profileSlug, setProfileSlug] = useState('');

  const type = ['topic_page', 'profile_page', 'profile'].includes(resultType)
    ? 'Analysis'
    : 'Data';

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

  const countryFound = config.countries.find(c => c.slug === countrySlug);
  let link = '';
  let country = '';
  if (countryFound) {
    country = countryFound.name;
  }

  if (resultType === 'topic_page') {
    link = `/profiles/${countrySlug}/${profileSlug}#${slug}`;
  } else if (resultType === 'profile_page') {
    link = `/profiles/${countrySlug}/${slug}`;
  } else if (resultType === 'profile') {
    link = `/profiles/${countrySlug}`;
  }

  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.resultType}>
        {type}
      </Typography>
      <NextLink href={link}>
        <Link href={link} className={classes.link}>
          <Typography variant="body1" className={classes.searchResultItem}>
            {country} - {title}
          </Typography>
        </Link>
      </NextLink>
    </div>
  );
}

SearchResultItem.propTypes = {
  resultType: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  countrySlug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default SearchResultItem;
