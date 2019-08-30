import React from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import config from '../config';
import { About } from '../components/Next';
import Error from '../components/Error';
import ErrorPage from '../components/ErrorPage';
import SearchInput from '../components/SearchInput';

const useStyles = makeStyles({
  root: {}
});

function NotFoundError() {
  const {
    settings: { socialMedia }
  } = config;

  const classes = useStyles();
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

export default NotFoundError;
