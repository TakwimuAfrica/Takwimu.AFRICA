import React from 'react';
import { PropTypes } from 'prop-types';

import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import RichTypography from './RichTypography';
import Section from './Section';
import Link from './Link';

import heroImage from '../assets/images/africanparliament.jpg';
import bannerImage from '../assets/images/covid-19-logo.png';
import triangle from '../assets/images/triangle.svg';

const useStyles = makeStyles(theme => ({
  section: {
    marginTop: '2.25rem',
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  root: {
    width: '100%',
    backgroundImage: `url(${heroImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right bottom',
    backgroundSize: 'cover'
  },
  gradient: {
    backgroundImage: `linear-gradient(89deg, #ffffff 30%, rgba(255, 255, 255, 0)),
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
  bannerImg: {
    [theme.breakpoints.up('md')]: {
      maxHeight: '100%',
      height: 'auto',
      width: '18.75rem'
    }
  }
}));

function Hero({
  takwimu: {
    page: { title, tagline, watch_video_link_label: watchVideoLinkTitle }
  }
}) {
  const classes = useStyles();
  if (!title || !tagline || !watchVideoLinkTitle) {
    return null;
  }
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
          <Link
            href="/profiles/[...geoIdOrCountrySlug]"
            as="/profiles/covid-19"
            className={classes.banner}
          >
            <img
              alt="COVID-19"
              src={bannerImage}
              className={classes.bannerImg}
            />
          </Link>
        </Section>
      </div>
    </div>
  );
}

Hero.propTypes = {
  takwimu: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
      tagline: PropTypes.string.isRequired,
      watch_video_link_label: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Hero;
