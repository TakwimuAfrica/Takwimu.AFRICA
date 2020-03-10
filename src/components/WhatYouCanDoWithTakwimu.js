import React from 'react';
import { PropTypes } from 'prop-types';

import classNames from 'classnames';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import RichTypography from './RichTypography';
import Section from './Section';

import reasearchIcon from '../assets/images/a-chart.svg';
import downloadIcon from '../assets/images/cloud-download-93.svg';
import presentIcon from '../assets/images/computer-upload.svg';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.info.main,
    padding: '2.438rem 0.625rem',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      padding: '2.438rem 1.875rem 2.9375rem 4.03125rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      padding: '2.438rem 2.5rem 2.9375rem 5.375rem'
    }
  },
  box: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '1.25rem',
    [theme.breakpoints.up('md')]: {
      width: '14.25rem',
      margin: '0'
    },
    [theme.breakpoints.up('lg')]: {
      width: '19rem'
    }
  },
  marginLeft: {
    [theme.breakpoints.up('md')]: {
      marginLeft: '4.03125rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '5.9375rem'
    }
  },
  label: {
    fontWeight: 'bold',
    padding: '17px 0 22px'
  },
  title: {
    marginBottom: '3.0625rem'
  },
  description: {
    fontSize: theme.typography.body1.fontSize
  }
}));

// These icons will be reused in the order written here if there are more
// than three uses
const icons = [reasearchIcon, downloadIcon, presentIcon];

function WhatYouCanDoWithTakwimu({
  takwimu: {
    page: {
      what_can_you_do_with_takwimu_title: title,
      uses_of_takwimu: usesOfTakwimu
    }
  }
}) {
  const classes = useStyles();

  if (!title || !usesOfTakwimu) {
    return null;
  }

  return (
    <Section title={title}>
      {usesOfTakwimu && usesOfTakwimu.length > 0 && (
        <Grid container justify="flex-start" className={classes.container}>
          {usesOfTakwimu.map((u, i) => (
            <Grid key={u.title} item>
              <div
                className={classNames([
                  classes.box,
                  { [classes.marginLeft]: i > 0 }
                ])}
              >
                <img alt="{u.title}" src={icons[i]} />
                <RichTypography className={classes.label}>
                  {u.title}
                </RichTypography>
                <RichTypography variant="body2" className={classes.description}>
                  {u.description}
                </RichTypography>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </Section>
  );
}

WhatYouCanDoWithTakwimu.propTypes = {
  takwimu: PropTypes.shape({
    page: PropTypes.shape({
      what_can_you_do_with_takwimu_title: PropTypes.string,
      uses_of_takwimu: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string
        })
      )
    }).isRequired
  }).isRequired
};

export default WhatYouCanDoWithTakwimu;
