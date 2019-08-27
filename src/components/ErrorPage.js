import React from 'react';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';

import { withStyles } from '@material-ui/core';

import ContentSection from './ContentSection';
import Footer from './Footer';
import Navigation from './Navigation';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: '4.1875rem',
    marginBottom: '4.375rem',
    display: 'flex',
    justifyContent: 'center'
  },
  section: {
    margin: 0,
    padding: '2.3125rem 0 1rem',
    borderTop: `4px solid ${theme.palette.primary.main}`
  }
});

function ErrorPage({ children, classes, takwimu, title, ...props }) {
  return (
    <>
      <Helmet>
        <title>{`${title} | Takwimu`}</title>
      </Helmet>
      <Navigation takwimu={takwimu} />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <div className={classes.root} {...props}>
        <ContentSection classes={{ root: classes.section }}>
          {children}
        </ContentSection>
      </div>
      <Footer takwimu={takwimu} />
    </>
  );
}

ErrorPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  classes: PropTypes.shape({}).isRequired,
  takwimu: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(ErrorPage);
