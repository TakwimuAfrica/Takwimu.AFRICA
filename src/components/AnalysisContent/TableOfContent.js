import React from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@material-ui/core/styles/makeStyles';

import { CountrySelector } from '../ProfileDetail';
import TableOfContent from '../TableOfContent';

const useStyles = makeStyles(theme => ({
  root: {},
  countrySelectorLabel: {
    fontSize: theme.typography.caption.fontSize
  }
}));

function AnalysisTableOfContent({ content, current, country }) {
  const classes = useStyles();
  const { slug: countrySlug } = country;
  const generateHref = index => {
    const href =
      index === 0
        ? `/profiles/[geoIdOrCountrySlug]` // if politics
        : `/profiles/[geoIdOrCountrySlug]/[analysisSlug]`;
    const as =
      index === 0
        ? `/profiles/${countrySlug}` // if politics
        : `/profiles/${countrySlug}/${content[index].post_name}`;
    return { href, as };
  };

  const allSectionTitle = content.map(section => {
    return { title: section.post_title };
  });

  return (
    <TableOfContent
      classes={{ root: classes.root }}
      content={allSectionTitle}
      current={current}
      generateHref={generateHref}
    >
      <CountrySelector
        country={country}
        context="analysis"
        classes={{ label: classes.countrySelectorLabel }}
      />
    </TableOfContent>
  );
}

AnalysisTableOfContent.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      post_name: PropTypes.string
    }).isRequired
  ).isRequired,
  current: PropTypes.number.isRequired,
  country: PropTypes.shape({
    slug: PropTypes.string
  }).isRequired
};

export default AnalysisTableOfContent;
