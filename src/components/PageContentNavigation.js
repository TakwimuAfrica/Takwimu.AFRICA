import React from 'react';
import { PropTypes } from 'prop-types';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

import Layout from './Layout';
import ContentNavigation from './ContentNavigation';

import useScrollListener from '../useScrollListener';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100px',
    height: 'auto',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 2, // Ensure its ontop (data continer actions has index 1)
    backgroundColor: theme.palette.primary.main,
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

function PageContentNavigation({
  navigation,
  title,
  contentTitle,
  content,
  current,
  generateHref,
  generateTitle,
  onClick
}) {
  const scrollThreshold = useScrollListener(navigation && 100, {
    initial: true
  });
  const classes = useStyles({ navigation, scrollThreshold });

  const renderContent = () => (
    <ContentNavigation
      classes={{
        root: classes.navigation,
        label: classes.label,
        other: classes.other
      }}
      current={current}
      onClick={onClick}
      title={title}
      content={content}
      contentTitle={contentTitle}
      generateHref={generateHref}
      generateTitle={generateTitle}
      linksPrimaryColor={navigation ? 'textSecondary' : 'primary'}
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

PageContentNavigation.propTypes = {
  navigation: PropTypes.bool,
  title: PropTypes.string.isRequired,
  contentTitle: PropTypes.string,
  current: PropTypes.number.isRequired,
  content: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  generateHref: PropTypes.func.isRequired,
  generateTitle: PropTypes.func.isRequired,
  onClick: PropTypes.func
};

PageContentNavigation.defaultProps = {
  contentTitle: undefined,
  navigation: false,
  onClick: undefined
};

export default PageContentNavigation;
