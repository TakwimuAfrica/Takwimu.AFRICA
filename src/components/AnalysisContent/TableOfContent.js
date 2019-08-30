import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';

import { CountrySelector } from '../ProfileDetail';
import TableOfContent from '../TableOfContent';

const useStyles = makeStyles(({ theme }) => ({
  root: {},
  countrySelectorLabel: {
    fontSize: theme.typography.caption.fontSize
  }
}));

function AnalysisTableOfContent({
  content,
  current,
  country,
  onChangeContent
}) {
  const classes = useStyles();
  const { slug: countrySlug } = country;
  const generateHref = index => {
    const analysisUrl = `/profiles/${countrySlug}`;
    if (content[index].meta.slug === countrySlug) {
      return analysisUrl;
    }
    return `${analysisUrl}/${content[index].meta.slug}`;
  };

  return (
    <TableOfContent
      classes={{ root: classes.root }}
      content={content}
      current={current}
      generateHref={generateHref}
      onChange={onChangeContent}
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
      meta: PropTypes.shape({
        slug: PropTypes.string
      })
    }).isRequired
  ).isRequired,
  current: PropTypes.number.isRequired,
  country: PropTypes.shape({
    slug: PropTypes.string
  }).isRequired,
  onChangeContent: PropTypes.func.isRequired
};

export default AnalysisTableOfContent;
