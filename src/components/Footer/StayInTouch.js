import React from 'react';
import PropTypes from 'prop-types';

import { Link as RouterLink } from 'react-router-dom';

import { Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import A from '@codeforafrica/hurumap-ui';
import Title from './Title';

import email from '../../assets/images/email.svg';
import facebook from '../../assets/images/facebook.svg';
import group3 from '../../assets/images/group-3.svg';
import group3Copy from '../../assets/images/group-3-copy.svg';
import twitter from '../../assets/images/twitter.svg';

const useStyles = makeStyles({
  root: {
    width: '14.375rem'
  },
  icons: {
    marginTop: '2.25rem'
  },
  icon: {
    width: '1.5625rem',
    height: '1.5625rem',
    objectFit: 'contain',
    marginRight: '0.9375rem'
  },
  title: {
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    color: 'inherit'
  }
});

function StayInTouch({ settings: { support, socialMedia } }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Title>
        <Link
          component={RouterLink}
          to="/contact"
          variant="subtitle1"
          className={classes.title}
        >
          Stay in touch
        </Link>
      </Title>
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        className={classes.icons}
      >
        <div className={classes.iconContainer}>
          <A
            href={`mailto:${support.hello}`}
            className={classes.links}
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            <img src={email} alt="" className={classes.icon} />
          </A>
        </div>
        <div className={classes.iconContainer}>
          <A href={socialMedia.twitter} className={classes.links}>
            <img src={twitter} alt="" className={classes.icon} />
          </A>
        </div>
        <div className={classes.iconContainer}>
          <A href={socialMedia.facebook} className={classes.links}>
            <img src={facebook} alt="" className={classes.icon} />
          </A>
        </div>
        <div className={classes.iconContainer}>
          <A href={socialMedia.medium} className={classes.links}>
            <img src={group3} alt="" className={classes.icon} />
          </A>
        </div>
        <div className={classes.iconContainer}>
          <A href={socialMedia.linkedin} className={classes.links}>
            <img src={group3Copy} alt="" className={classes.icon} />
          </A>
        </div>
      </Grid>
    </div>
  );
}

StayInTouch.propTypes = {
  settings: PropTypes.shape({
    support: PropTypes.shape({
      hello: PropTypes.string
    }).isRequired,
    socialMedia: PropTypes.shape({
      facebook: PropTypes.string,
      linkedin: PropTypes.string,
      medium: PropTypes.string,
      twitter: PropTypes.string
    }).isRequired
  }).isRequired
};

export default StayInTouch;
