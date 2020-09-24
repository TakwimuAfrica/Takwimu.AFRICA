import React from 'react';
import { PropTypes } from 'prop-types';

import { Button, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import RichTypography from '../RichTypography';
import Section from '../Section';
import config from '../../config';

const useStyles = makeStyles(theme => ({
  section: {
    marginTop: '2.25rem',
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  root: {
    width: '100%'
  },
  gradient: {
    padding: '1.25rem'
  },
  hero: {
    flexGrow: 1
  },
  title: {
    margin: 0,
    width: '100%',
    paddingTop: '0.5625rem',

    // Some words are too big to fit mobile so break them
    wordBreak: 'break-all',
    [theme.breakpoints.up('md')]: {
      maxWidth: '40rem',
      wordBreak: 'initial'
    }
  },
  description: {
    marginTop: '1.0625rem',
    marginBottom: '3.125rem',
    width: '100%',
    '& a': {
      color: theme.palette.primary.main,
      fontWeight: 'bold'
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '27.375rem'
    }
  },
  aboutLink: {
    color: theme.palette.primary.main
  },
  button: {
    marginBottom: '2.3125rem'
  },
  buttonIcon: {
    marginLeft: '1.9375rem'
  },
  banner: {
    display: 'none', // kilemensi(2020-03-31): The banner doesn't look good in < md
    [theme.breakpoints.up('md')]: {
      display: 'block',
      position: 'absolute',
      right: 0,
      top: 0
    }
  },
  message: {
    backgroundColor: '#ececec',
    border: '1px dashed #979797',
    padding: '1.25rem',
    '& a': {
      color: theme.palette.primary.main
    },
    '& a.button': {
      borderRadius: 0,
      color: theme.palette.text.secondary,
      maxWidth: theme.typography.pxToRem(140),
      minWidth: theme.typography.pxToRem(140),
      padding: '0.5rem 0'
    }
  },
  team: {
    fontWeight: 700
  }
}));

function MaintenanceHero({ message, title, ...props }) {
  const classes = useStyles(props);

  if (!(title && message)) {
    return null;
  }
  return (
    <div className={classes.root}>
      <div className={classes.gradient}>
        <Section classes={{ root: classes.section }}>
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            className={classes.hero}
          >
            <Grid item xs={12} lg={7}>
              <RichTypography
                component="div"
                variant="h1"
                className={classes.title}
              >
                {title}
              </RichTypography>
            </Grid>
            <Grid item xs={12} lg={5} container className={classes.message}>
              <Grid item xs={12}>
                <RichTypography component="div">{message}</RichTypography>
              </Grid>
              <Grid item xs={12} container justify="space-between">
                <Grid item>
                  <RichTypography className={classes.team}>
                    The Takwimu Team
                  </RichTypography>
                </Grid>
                <Grid item>
                  <Button
                    href={config.settings.mailingList.href}
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                  >
                    Subscribe
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Section>
      </div>
    </div>
  );
}

MaintenanceHero.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default MaintenanceHero;
