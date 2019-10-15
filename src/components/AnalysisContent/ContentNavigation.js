import React from 'react';
import { PropTypes } from 'prop-types';

import { makeStyles } from '@material-ui/styles';

import ContentNavigation from '../ContentNavigation';

const useStyles = makeStyles({
  root: {},
  label: {},
  other: {}
});

function AnalysisContentNavigation({
  labelText,
  labelTextStrong,
  current,
  content,
  showContent,
  linksPrimaryColor,
  linksSecondaryColor,
  ...props
}) {
  const classes = useStyles(props);
  const generateHref = index => {
    const item = content.topics[index];
    return `#${item.post_name}`;
  };
  const generateTitle = index => {
    const item = content.topics[index];
    return item.post_title;
  };

  return (
    <ContentNavigation
      classes={{
        root: classes.root,
        label: classes.label,
        other: classes.other
      }}
      title={labelText}
      contentTitle={labelTextStrong}
      content={content.topics}
      current={current}
      generateHref={generateHref}
      generateTitle={generateTitle}
      onClick={(e, index) => showContent(index)()}
      linksPrimaryColor={linksPrimaryColor}
      linksSecondaryColor={linksSecondaryColor}
    />
  );
}

AnalysisContentNavigation.propTypes = {
  labelText: PropTypes.string.isRequired,
  labelTextStrong: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  content: PropTypes.shape({
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        post_title: PropTypes.string,
        post_name: PropTypes.string
      })
    )
  }).isRequired,
  showContent: PropTypes.func.isRequired,
  linksPrimaryColor: PropTypes.string,
  linksSecondaryColor: PropTypes.string
};

AnalysisContentNavigation.defaultProps = {
  linksPrimaryColor: 'primary',
  linksSecondaryColor: 'textPrimary'
};

export default AnalysisContentNavigation;
