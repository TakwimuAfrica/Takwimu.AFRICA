import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import A from '@hurumap-ui/core/A';
import Section from '../Section';

import Takwimu from './Takwimu';
import QuickLinks from './QuickLinks';
import StayInTouch from './StayInTouch';
import Initiative from './Initiative';
import Support from './Support';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    zIndex: 1,
    flexGrow: 1,
    color: 'white',
    backgroundColor: 'black',
    paddingTop: '4.5625rem',
    paddingBottom: '5.3125rem',
    marginTop: '1.875rem'
  },
  license: {
    marginTop: '2.3125rem'
  },
  takwimu: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '14.375rem', // match thinnest component
      // Should be marginRight: '2.578125rem' but won't fit
      marginRight: '2rem'
    },
    [theme.breakpoints.up('lg')]: {
      width: '19.5625rem',
      marginRight: '3.4375rem'
    }
  },
  stayInTouch: {
    marginTop: '3.125rem'
  },
  links: {
    paddingTop: '2.25rem',
    [theme.breakpoints.up('md')]: {
      paddingTop: 0,
      paddingLeft: '4.6875rem',
      paddingRight: '3.9375rem',
      borderLeft: '0.125rem solid rgba(151, 151, 151, 0.45)',
      borderRight: '0.125rem solid rgba(151, 151, 151, 0.45)'
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '6.25rem',
      paddingRight: '5.25rem'
    }
  },
  project: {
    width: '100%',
    paddingTop: '2.25rem',
    [theme.breakpoints.up('md')]: {
      width: '14.53125rem', // .75 of lg
      // Should be marginLeft: '5.109375rem' but won't fit
      marginLeft: '2rem',
      padding: 0
    },
    [theme.breakpoints.up('lg')]: {
      width: '19.375rem',
      marginLeft: '6.8125rem'
    }
  },
  support: {
    marginTop: '4.0625rem'
  },
  text: {
    fontSize: '0.9375rem',
    color: 'white'
  }
}));

function Footer({ takwimu: { settings }, ...props }) {
  const classes = useStyles(props);
  return (
    <Grid
      id="footer"
      container
      justify="center"
      alignItems="flex-start"
      className={classes.root}
    >
      <Section>
        <Grid container justify="flex-start" alignItems="flex-start">
          <div className={classes.takwimu}>
            <Takwimu classes={{ root: classes.takwimu }} />
            <StayInTouch
              settings={settings}
              classes={{ root: classes.stayInTouch }}
            />
          </div>
          <div className={classes.links}>
            <QuickLinks />
          </div>
          <div className={classes.project}>
            <Initiative />
            <Support classes={{ root: classes.stayInTouch }} />
          </div>
        </Grid>
        <div className={classes.license}>
          <Typography variant="subtitle2" className={classes.text}>
            2018-2020 Takwimu{' '}
            <A
              href="//creativecommons.org/licenses/by/4.0/"
              className={classes.text}
            >
              CC by 4.0
            </A>
          </Typography>
        </div>
      </Section>
    </Grid>
  );
}

Footer.propTypes = {
  takwimu: PropTypes.shape({
    settings: PropTypes.shape({}).isRequired
  }).isRequired
};

export default Footer;
