import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ButtonLink from '../Link/Button';
import Section from '../Section';
import Selection from './Selection';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.light,
    margin: '1.375rem 0 2.3125rem 0',
    paddingTop: '3.125rem',
    paddingBottom: '3.5rem',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '1.625rem',
      paddingRight: '1.625rem',
      width: '43.734375rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '2.8125rem',
      paddingRight: '2.8125rem',
      width: '58.3125rem'
    }
  },
  title: {
    paddingBottom: '2.375rem',
    fontWeight: 'bold'
  },
  countryText: {
    marginTop: '0.9375rem',
    [theme.breakpoints.up('md')]: {
      marginTop: 0
    }
  },
  selectButtonRoot: {
    width: '100%',
    padding: 0,
    marginTop: '0.9375rem',
    [theme.breakpoints.up('md')]: {
      width: '6.609375rem'
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: 0,
      marginLeft: '0.9375rem',
      width: '8.8125rem'
    }
  },
  selectButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    fontFamily: theme.typography.body1.fontFamily,
    paddingTop: '1.125rem',
    paddingBottom: '1.0625rem'
  }
}));

const VIEW_ITEMS = [
  {
    value: '/profiles/country-',
    label: 'Data by topic'
  },
  {
    value: '/profiles/',
    label: 'Country analysis'
  }
];

function CountryContent({ content, takwimu: { country, countries } }) {
  const classes = useStyles();
  const [countrySlug, setCountrySlug] = useState(country.slug);
  const [view, setView] = useState(VIEW_ITEMS[0].value);
  const [href, setHref] = useState('');

  useEffect(() => {
    const selectedCountry = countries.find(c => c.slug === countrySlug);
    if (view === '/profiles/') {
      setHref(`${view}${selectedCountry.slug}`);
    }
    if (view === '/profiles/country-') {
      setHref(`${view}${selectedCountry.iso_code}-${selectedCountry.slug}`);
    }
  }, [countries, countrySlug, view]);

  if (!content) {
    return null;
  }
  const countryItems = countries.map(c => ({
    value: c.slug,
    label: c.short_name
  }));

  return (
    <Section classes={{ root: classes.root }}>
      <Typography variant="body1" className={classes.title}>
        {content.contentSelectTitle}
      </Typography>
      <Grid container direction="row" alignItems="center">
        <Typography variant="body1">{content.contentSelectLabel}</Typography>
        <Selection
          items={VIEW_ITEMS}
          value={view}
          onChange={e => setView(e.target.value)}
        />
        <Typography variant="body1" className={classes.countryText}>
          {' '}
          {content.countrySelectLabel}
        </Typography>
        <Selection
          items={countryItems}
          value={countrySlug}
          onChange={e => setCountrySlug(e.target.value)}
        />
        <ButtonLink
          href="/profiles/[geoIdOrCountrySlug]"
          as={href}
          classes={{
            root: classes.selectButtonRoot,
            label: classes.selectButtonLabel
          }}
        >
          {content.actionLabel}
        </ButtonLink>
      </Grid>
    </Section>
  );
}

CountryContent.propTypes = {
  content: PropTypes.shape({
    contentSelectLabel: PropTypes.string,
    countrySelectLabel: PropTypes.string,
    contentSelectTitle: PropTypes.string,
    actionLabel: PropTypes.string
  }).isRequired,
  takwimu: PropTypes.shape({
    country: PropTypes.shape({
      slug: PropTypes.string
    }),
    countries: PropTypes.arrayOf(
      PropTypes.shape({
        slug: PropTypes.string
      })
    ).isRequired
  }).isRequired
};

export default CountryContent;
