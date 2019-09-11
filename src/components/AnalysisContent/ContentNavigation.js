import React from 'react';
import { PropTypes } from 'prop-types';

import { makeStyles } from '@material-ui/styles';

import ContentNavigation from '../ContentNavigation';

const useStyles = makeStyles({
  root: {},
  label: {}
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
    const item = content.body[index];
    return `#${item.id}`;
  };
  const generateTitle = index => {
    const item = content.body[index];
    return item.value.title;
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
      content={content.body}
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
    body: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.shape({
          type: PropTypes.string,
          title: PropTypes.string
        })
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
