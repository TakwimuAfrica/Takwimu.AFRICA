import React from 'react';
import { PropTypes } from 'prop-types';

import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { RichTypography } from './core';
import Section from './Section';

import africanParliament from '../assets/images/africanparliament.jpg';
import triangle from '../assets/images/triangle.svg';

const useStyles = makeStyles(theme => ({
  section: {
    marginTop: '2.25rem'
  },
  root: {
    width: '100%',
    backgroundImage: `url(${africanParliament})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right bottom',
    backgroundSize: 'cover'
  },
  gradient: {
    backgroundImage: `linear-gradient(89deg, #ffffff, rgba(255, 255, 255, 0)),
      linear-gradient(to bottom, #ffffff, transparent)`
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
      color: theme.palette.primary.main
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
  }
}));

function Hero({
  takwimu: {
    page: {
      hero: { value: currentHero }
    }
  }
}) {
  const classes = useStyles();
  if (!currentHero) {
    return null;
  }

  const {
    title,
    tagline,
    watch_video_link_label: watchVideoLinkTitle
  } = currentHero;
  return (
    <div className={classes.root}>
      <div className={classes.gradient}>
        <Section classes={{ root: classes.section }}>
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            className={classes.hero}
          >
            <Grid item xs={12}>
              <RichTypography
                component="div"
                variant="h1"
                className={classes.title}
              >
                {title}
              </RichTypography>
            </Grid>
            <Grid item xs={12}>
              <RichTypography component="div" className={classes.description}>
                {tagline}
              </RichTypography>
            </Grid>
            <Grid item xs={12}>
              <Button href="#takwimuMakingOf" className={classes.button}>
                {watchVideoLinkTitle}{' '}
                <img alt="play" src={triangle} className={classes.buttonIcon} />
              </Button>
            </Grid>
          </Grid>
        </Section>
      </div>
    </div>
  );
}

Hero.propTypes = {
  takwimu: PropTypes.shape({
    page: PropTypes.shape({
      hero: PropTypes.shape({
        value: PropTypes.shape({
          title: PropTypes.string,
          tagline: PropTypes.string,
          watch_video_link_label: PropTypes.string
        })
      })
    }).isRequired
  }).isRequired
};

export default Hero;
