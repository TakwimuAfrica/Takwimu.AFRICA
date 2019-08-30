import React from 'react';
import { PropTypes } from 'prop-types';

import { makeStyles } from '@material-ui/styles';

import ContentNavigation from '../ContentNavigation';

const useStyles = makeStyles(theme => ({
  root: {},
  label: {
    color: theme.palette.text.secondary
  },
  topicSelected: {
    fontWeight: 'bold'
  }
}));

function LegalContentNavigation({
  title,
  current,
  contentHeadings,
  changeActiveContent,
  linksPrimaryColor,
  linksSecondaryColor
}) {
  const generateHref = index => `/${contentHeadings[index].link}`;
  const generateTitle = index => contentHeadings[index].title;
  const classes = useStyles();

  return (
    <ContentNavigation
      classes={{
        root: classes.root,
        label: classes.label,
        topicSelected: classes.topicSelected
      }}
      title={title}
      content={contentHeadings}
      current={current}
      generateHref={generateHref}
      generateTitle={generateTitle}
      onClick={(e, index) => {
        e.preventDefault();

        window.history.pushState(null, '', generateHref(index));
        changeActiveContent(index)();
      }}
      linksPrimaryColor={linksPrimaryColor}
      linksSecondaryColor={linksSecondaryColor}
    />
  );
}

LegalContentNavigation.propTypes = {
  title: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  contentHeadings: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      title: PropTypes.string
    }).isRequired
  ).isRequired,
  changeActiveContent: PropTypes.func.isRequired,
  linksPrimaryColor: PropTypes.string,
  linksSecondaryColor: PropTypes.string
};

LegalContentNavigation.defaultProps = {
  linksPrimaryColor: 'primary',
  linksSecondaryColor: 'textPrimary'
};

export default LegalContentNavigation;
