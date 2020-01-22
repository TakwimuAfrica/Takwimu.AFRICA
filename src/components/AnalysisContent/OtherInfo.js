import React from 'react';
import { PropTypes } from 'prop-types';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core';

import ContentNavigation from '../ContentNavigation';

import Layout from '../Layout';
import useScrollListener from '../../useScrollListener';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100px',
    overflow: 'auto',
    justifyContent: 'center',
    zIndex: 2, // Ensure its ontop (data continer actions has index 1)
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    boxShadow: '0 2px 6px 2px rgba(0, 0, 0, 0.27)'
  },
  containerNavigation: {
    top: '-100px',
    transition: 'top .27s ease 0s'
  },
  containerTransition: {
    top: 0
  },
  label: ({ navigation }) =>
    navigation
      ? {
          color: 'white',
          fontSize: '0.813rem',
          marginTop: '1rem',
          marginBottom: '0.5rem'
        }
      : {},
  other: ({ navigation }) =>
    navigation
      ? {
          color: 'white'
        }
      : {},
  navigation: ({ navigation }) =>
    navigation
      ? {
          backgroundColor: 'unset',
          padding: 0,
          [theme.breakpoints.up('md')]: {
            width: '100%'
          },
          [theme.breakpoints.up('lg')]: {
            width: '100%'
          }
        }
      : {}
}));

function OtherInfo({
  navigation,
  labelText,
  labelTextStrong,
  content,
  current,
  showContent
}) {
  const scrollThreshold = useScrollListener(navigation && 100, {
    initial: true
  });
  const classes = useStyles({ navigation, scrollThreshold });

  const generateHref = index => {
    const item = content.topics[index];
    return `#${item.post_name}`;
  };
  const generateTitle = index => {
    const item = content.topics[index];
    return item.post_title;
  };
  const onClick = (e, index) => {
    return showContent(index)();
  };
  const renderContent = () => (
    <ContentNavigation
      classes={{
        root: classes.navigation,
        label: classes.label,
        other: classes.other
      }}
      current={current}
      onClick={onClick}
      title={labelText}
      content={content.topics}
      contentTitle={labelTextStrong}
      generateHref={generateHref}
      generateTitle={generateTitle}
      linksPrimaryColor={navigation ? 'textPrimary' : 'primary'}
      linksSecondaryColor={navigation ? 'textSecondary' : 'textPrimary'}
    />
  );
  return navigation ? (
    <div
      className={classNames(classes.container, {
        [classes.containerTransition]: scrollThreshold,
        [classes.containerNavigation]: navigation
      })}
    >
      <Layout>{renderContent()}</Layout>
    </div>
  ) : (
    renderContent()
  );
}

OtherInfo.propTypes = {
  navigation: PropTypes.bool,
  labelText: PropTypes.string.isRequired,
  labelTextStrong: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  content: PropTypes.shape({
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        post_title: PropTypes.string,
        post_name: PropTypes.string
      })
    )
  }).isRequired,
  showContent: PropTypes.func.isRequired
};

OtherInfo.defaultProps = {
  navigation: false
};

export default OtherInfo;
