import React from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@material-ui/styles/makeStyles';

import { CountrySelector } from '../ProfileDetail';
import TableOfContent from '../TableOfContent';

const useStyles = makeStyles(theme => ({
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
    if (index === 0) {
      // if politics
      return analysisUrl;
    }
    return `${analysisUrl}/${content[index].section.post_name}`;
  };

  const allSectionTitle = content.map(({ section }) => {
    return { title: section.post_title };
  });

  return (
    <TableOfContent
      classes={{ root: classes.root }}
      content={allSectionTitle}
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
      section: PropTypes.shape({
        post_name: PropTypes.string
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
