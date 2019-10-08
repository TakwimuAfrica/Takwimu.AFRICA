import React from 'react';

import makeStyles from '@material-ui/styles/makeStyles';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import config from '../src/config';
import { About } from '../src/components/Next';
import Error from '../src/components/Error';
import ErrorPage from '../src/components/ErrorPage';
import SearchInput from '../src/components/SearchInput';

const useStyles = makeStyles({
  root: {}
});

function NotFoundError({ statusCode }) {
  const {
    settings: { socialMedia }
  } = config;

  const classes = useStyles();
  return (
    <ErrorPage
      classes={{ root: classes.root }}
      takwimu={config}
      title={statusCode === 404 ? 'Page Not Found' : 'Internal Server Error'}
    >
      {statusCode === 404 && (
        <>
          <Error title="404 - Page Not Found">
            <Typography variant="body1">
              The page you are looking for does not exist.
            </Typography>
          </Error>
          <SearchInput title="Why not try searching…" />
          <About title="Explore further" socialMedia={socialMedia} />
        </>
      )}

      {statusCode === 500 && (
        <Error title="500 - Internal Server Error">
          <Typography variant="body1">
            We’re having some trouble processing your request. We’ve logged the
            error and will investigate. You can try again or if the issue
            persists, please{' '}
            <NextLink href="/contact">
              <Link href="/contact" underline="always">
                contact us
              </Link>
            </NextLink>
          </Typography>
        </Error>
      )}
    </ErrorPage>
  );
}

NotFoundError.propTypes = {
  statusCode: PropTypes.number.isRequired
};

NotFoundError.getInitialProps = ({ res, err }) => {
  return {
    statusCode: (res && res.statusCode) || (err && err.statusCode) || 404
  };
};

export default NotFoundError;
