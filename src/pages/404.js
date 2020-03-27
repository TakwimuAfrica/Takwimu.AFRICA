import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import config from '../config';
import { getSitePage } from '../cms';
import Error from '../components/Error';
import CustomErrorPage from '../components/ErrorPage';
import SearchInput from '../components/SearchInput';
import WhereToNext from '../components/Next';

const useStyles = makeStyles(theme => ({
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

function NotFound({ whereToNextLink }) {
  const classes = useStyles();

  return (
    <CustomErrorPage takwimu={config} title="Page Not Found">
      <>
        <Error title="404 - Page Not Found">
          <Typography variant="body1">
            The page you are looking for does not exist.
          </Typography>
        </Error>

        <SearchInput title="Why not try searching…" />

        {whereToNextLink && (
          <WhereToNext
            variant="dual"
            whereToNext={{
              title: 'Explore further',
              whereToNextLink
            }}
            classes={{ sectionRoot: classes.whereToNext }}
          />
        )}
      </>
    </CustomErrorPage>
  );
}

NotFound.propTypes = {
  whereToNextLink: PropTypes.arrayOf(PropTypes.shape({}))
};

NotFound.defaultProps = {
  whereToNextLink: []
};

export async function getStaticProps() {
  const {
    page: { where_to_next_link: whereToNextLink }
  } = await getSitePage('about');
  return {
    props: { whereToNextLink } // will be passed to the page component as props
  };
}

export default NotFound;
