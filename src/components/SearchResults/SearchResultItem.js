import React from 'react';
import { PropTypes } from 'prop-types';

import NextLink from 'next/link';

import { Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { RichTypography } from '../core';

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

function SearchResultItem({ country, title, link, summary, resultType }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.resultType}>
        {resultType}
      </Typography>
      <NextLink href={link}>
        <Link href={link} className={classes.link}>
          <Typography variant="body1" className={classes.searchResultItem}>
            {country} - {title}
          </Typography>
        </Link>
      </NextLink>
      <RichTypography variant="body2">{summary}</RichTypography>
    </div>
  );
}

SearchResultItem.propTypes = {
  country: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  resultType: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default SearchResultItem;
