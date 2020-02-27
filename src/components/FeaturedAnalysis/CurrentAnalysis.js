import React from 'react';
import { PropTypes } from 'prop-types';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import config from '../../config';
import flags from '../../flags';
import Link from '../Link';
import RichTypography from '../RichTypography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '43.734375rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      width: '58.3125rem'
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.info.main,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '2.4375rem', // .75 of lg
      paddingRight: '2.71875rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '3.25rem',
      paddingRight: '3.625rem'
    }
  },
  header: {
    paddingTop: '3.0625rem',
    paddingBottom: '1.875rem'
  },
  flag: {
    height: '4.4375rem',
    marginRight: '1.5rem'
  },
  title: {
    margin: 0
  },
  body: {
    paddingBottom: '1.875rem',
    lineHeight: 1.55,
    '& > p': {
      lineHeight: 1.55
    }
  },
  actions: {
    marginBottom: '3.0625rem'
  },
  primaryAction: {
    // Override original Takwimu & Bootstrap styles
    '&:hover': {
      color: theme.palette.text.secondary,
      textDecoration: 'none'
    }
  },
  secondaryAction: {
    marginTop: '1rem',
    padding: 0,
    border: '0.125rem solid',
    [theme.breakpoints.up('md')]: {
      marginTop: 0,
      marginLeft: '2.15625rem' // .75 lg
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '2.875rem'
    },

    // Override original Takwimu & Bootstrap styles
    '&:hover': {
      border: '0.125rem solid',
      color: theme.palette.primary.dark,
      textDecoration: 'none'
    }
  },
  // override label padding for secondary button/ allow for the 2px border
  secondaryActionLabel: {
    paddingTop: '1rem',
    paddingBottom: '0.9375rem'
  }
}));

function CurrentAnalysis({
  countrifyTitle,
  content: { featured_page: currentAnalysis, from_country: countrySlug },
  readAnalysisTitle,
  viewProfileTitle
}) {
  const classes = useStyles();
  const country = config.countries.find(c => c.slug === countrySlug);
  if (!country) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        className={classes.content}
      >
        <Grid item xs={12}>
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            className={classes.header}
          >
            <img
              src={flags[country.iso_code]}
              alt={countrySlug}
              className={classes.flag}
            />

            <RichTypography
              variant="h4"
              component="h1"
              className={classes.title}
            >
              {countrifyTitle(currentAnalysis, countrySlug)}
            </RichTypography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <RichTypography className={classes.body} component="span">
            {currentAnalysis.post_content}
          </RichTypography>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            className={classes.actions}
          >
            <Link
              button
              href="/profiles/[geoIdOrCountrySlug]/[analysisSlug]"
              as={`/profiles/${countrySlug}/${currentAnalysis.post_name}`}
              className={classes.primaryAction}
            >
              {readAnalysisTitle}
            </Link>
            <Link
              button
              href="/profiles/[geoIdOrCountrySlug]"
              as={`/profiles/${countrySlug}`}
              className={classes.secondaryAction}
              classes={{ label: classes.secondaryActionLabel }}
              variant="outlined"
            >
              {viewProfileTitle}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

CurrentAnalysis.propTypes = {
  countrifyTitle: PropTypes.func.isRequired,
  content: PropTypes.shape({
    featured_page: PropTypes.shape({}).isRequired,
    from_country: PropTypes.string.isRequired
  }).isRequired,
  readAnalysisTitle: PropTypes.string.isRequired,
  viewProfileTitle: PropTypes.string.isRequired
};

export default CurrentAnalysis;
