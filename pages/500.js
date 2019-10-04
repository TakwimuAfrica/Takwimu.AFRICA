import React from 'react';
import { makeStyles } from '@material-ui/styles';

import NextLink from 'next/link';

import { Link, Typography } from '@material-ui/core';

import config from '../src/config';
import Error from '../src/components/Error';
import ErrorPage from '../src/components/ErrorPage';

const useStyles = makeStyles({
  root: {
    marginBottom: '14.375rem'
  }
});

function ServerError() {
  const classes = useStyles();
  return (
    <ErrorPage
      classes={{ root: classes.root }}
      takwimu={config}
      title="Internal Server Error"
    >
      <Error title="500 - Internal Server Error">
        <Typography variant="body1">
          We’re having some trouble processing your request. We’ve logged the
          error and will investigate. You can try again or if the issue
          persists, please{' '}
          <NextLink href="/contact">
            <Link to="/contact" underline="always">
              contact us
            </Link>
          </NextLink>
        </Typography>
      </Error>
    </ErrorPage>
  );
}

export default ServerError;
