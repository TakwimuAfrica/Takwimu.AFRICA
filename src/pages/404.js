import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, Typography } from '@material-ui/core';

import config from '../config';
import { About } from '../components/Next';
import Error from '../components/Error';
import ErrorPage from '../components/ErrorPage';
import SearchInput from '../components/SearchInput';

const styles = () => ({
  root: {}
});

function NotFoundError({ classes }) {
  const {
    settings: { socialMedia }
  } = config;
  return (
    <ErrorPage
      classes={{ root: classes.root }}
      takwimu={config}
      title="Page Not Found"
    >
      <Error title="404 - Page Not Found">
        <Typography variant="body1">
          The page you are looking for does not exist.
        </Typography>
      </Error>
      <SearchInput title="Why not try searching…" />
      <About title="Explore further" socialMedia={socialMedia} />
    </ErrorPage>
  );
}

NotFoundError.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(NotFoundError);
