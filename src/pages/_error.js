import React from 'react';
import PropTypes from 'prop-types';

import NextLink from 'next/link';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import makeStyles from '@material-ui/core/styles/makeStyles';

import config from '../config';
import { getSitePage } from '../getTakwimuPage';
import Error from '../components/Error';
import ErrorPage from '../components/ErrorPage';
import SearchInput from '../components/SearchInput';
import WhereToNext from '../components/Next';

const useStyles = makeStyles(theme => ({
  root: {},
  whereToNext: {
    width: '100%',
    margin: 0,
    padding: 0,
    [theme.breakpoints.up('md')]: {
      width: '43.734375rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      width: '58.3125rem'
    }
  }
}));

function NotFoundError({ statusCode, whereToNextLink }) {
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
          <WhereToNext
            variant="dual"
            whereToNext={{
              title: 'Explore further',
              whereToNextLink
            }}
            classes={{ sectionRoot: classes.whereToNext }}
          />
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
  statusCode: PropTypes.number.isRequired,
  whereToNextLink: PropTypes.arrayOf(PropTypes.shape({}))
};

NotFoundError.defaultProps = {
  whereToNextLink: []
};

NotFoundError.getInitialProps = async ({ res, err }) => {
  const {
    page: { where_to_next_link: whereToNextLink }
  } = await getSitePage('about');
  return {
    statusCode: (res && res.statusCode) || (err && err.statusCode) || 404,
    whereToNextLink
  };
};

export default NotFoundError;
