import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Section from '../Section';
import Selection from './Selection';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.light,
    margin: '0 0 2.3125rem 0',
    paddingTop: '3.125rem',
    paddingBottom: '3.5rem',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '44.015625rem', // .75 of lg
      paddingLeft: '1.625rem',
      paddingRight: '1.625rem'
    },
    [theme.breakpoints.up('lg')]: {
      width: '58.6875rem',
      paddingLeft: '2.8125rem',
      paddingRight: '2.8125rem'
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
    value: '/profiles/analysis/',
    label: 'Country analysis'
  }
];

const hrefForView = (view, country) => {
  if (view === '/profiles/analysis/') {
    return `${view}${country.slug}`;
  }
  if (view === '/profiles/country-') {
    return `${view}${country.iso_code}-${country.slug}`;
  }
  return '#/';
};

class ViewAnalysis extends Component {
  constructor(props) {
    super(props);

    const {
      takwimu: { country }
    } = this.props;
    this.state = {
      view: VIEW_ITEMS[0].value,
      countrySlug: country.slug
    };
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  handleViewChange(e) {
    this.setState({
      view: e.target.value
    });
  }

  handleCountryChange(e) {
    this.setState({
      countrySlug: e.target.value
    });
  }

  render() {
    const {
      content: { value: countryContent },
      takwimu: { countries }
    } = this.props;
    if (!countryContent) {
      return null;
    }

    const classes = useStyles();
    const { view, countrySlug } = this.state;
    const country = countries.find(c => c.slug === countrySlug);
    const href = hrefForView(view, country);
    const countryItems = countries.map(c => ({
      value: c.slug,
      label: c.short_name
    }));
    return (
      <Section classes={{ root: classes.root }}>
        <Typography variant="body1" className={classes.title}>
          {countryContent.title}
        </Typography>
        <Grid container direction="row" alignItems="center">
          <Typography variant="body1">
            {countryContent.content_selection_label}
          </Typography>
          <Selection
            items={VIEW_ITEMS}
            value={view}
            onChange={this.handleViewChange}
          />
          <Typography variant="body1" className={classes.countryText}>
            {' '}
            {countryContent.country_selection_label}
          </Typography>
          <Selection
            items={countryItems}
            value={countrySlug}
            onChange={this.handleCountryChange}
          />
          <Button
            href={href}
            classes={{
              root: classes.selectButtonRoot,
              label: classes.selectButtonLabel
            }}
          >
            {countryContent.view_content_action_label}
          </Button>
        </Grid>
      </Section>
    );
  }
}

ViewAnalysis.propTypes = {
  content: PropTypes.shape({
    value: PropTypes.shape({
      content_selection_label: PropTypes.string,
      country_selection_label: PropTypes.string,
      view_content_action_label: PropTypes.string
    })
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

export default ViewAnalysis;
