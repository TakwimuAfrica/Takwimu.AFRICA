import React from 'react';
import PropTypes from 'prop-types';

import { Link, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../Layout';

const useStyles = makeStyles(theme => ({
  layoutRoot: {
    margin: '0 auto'
  },
  root: {
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    display: 'flex',
    height: '5.8125rem', // 93px / 16
    scrollBehavior: 'smooth',
    width: '100%'
  },
  indicator: {
    display: 'none'
  },
  tab: {
    fontSize: '1.0625rem', // 17px
    fontWeight: 'normal',
    padding: '0.6875rem 1rem 0.6875rem 1.125rem',
    textTransform: 'none',
    '&$tabSelected': {
      backgroundColor: '#fff',
      borderRadius: 21.5
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 0
    }
  },
  tabSelected: {
    fontWeight: 700
  }
}));

function LinkTab(props) {
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  return <Tab component={Link} {...props} />;
}

function ProfileTabs({ handleChange, tabs, value }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Layout classes={{ root: classes.layoutRoot }}>
        <Tabs
          classes={{ indicator: classes.indicator }}
          onChange={handleChange}
          value={value}
          variant="scrollable"
        >
          {tabs.map(tab => (
            <LinkTab
              key={tab.slug}
              value={tab.slug}
              href={`#${tab.slug}`} // Always show the tabs on click
              label={tab.name}
              className={classes.tab}
              classes={{
                selected: classes.tabSelected
              }}
              underline="none"
            />
          ))}
        </Tabs>
      </Layout>
    </div>
  );
}

ProfileTabs.propTypes = {
  handleChange: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.string.isRequired
};

ProfileTabs.defaultProps = {
  handleChange: null
};

export default ProfileTabs;
