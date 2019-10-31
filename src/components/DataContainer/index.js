/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { Typography, Grid } from '@material-ui/core';
import { ArrowDropUp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import classNames from 'classnames';
import EntitiesDataContainer from './EntitiesDataContainer';

import HTMLDataContainer from './HTMLDataContainer';
import ImageDataContainer from './ImageDataContainer';
import PDFDataContainer from './PDFDataContainer';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '1.25rem'
  },
  layoutHalf: {
    [theme.breakpoints.up('lg')]: {
      width: '50%'
    }
  },
  dataContainer: {
    padding: '0.625rem',
    backgroundColor: theme.palette.data.light,
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      padding: '1.25rem'
    }
  },
  descriptionWrapper: {
    marginTop: '1.25rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('md')]: {
      width: '90%'
    }
  },
  descriptionContainer: {
    width: 'auto'
  },
  description: {
    color: theme.palette.data.main,
    marginLeft: '1.25rem'
  },
  title: {
    fontWeight: 'bold',
    lineHeight: 1.2,
    marginBottom: '0.625rem'
  }
}));

function DataContainer({
  id,
  indicator: {
    value: { widget: data, summary },
    meta
  },
  country: { name: countryName },
  url
}) {
  const classes = useStyles();
  useEffect(() => {
    const params = new URL(window.location).searchParams;
    const indicatorId = params.get('indicator');
    if (indicatorId) {
      const element = document.getElementById(`indicator-${indicatorId}`);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, []);

  const isHalfWidth = () => {
    const { layout } = meta;
    if (layout === 'half_width') {
      return true;
    }

    return (
      layout === 'half_width' ||
      (layout === 'auto' &&
        (!['entities', 'document'].includes(data.type) &&
          (!summary || summary === '<p></p>')))
    );
  };
  return (
    <div
      id={`indicator-${id}`}
      className={classNames(classes.root, {
        [classes.layoutHalf]: isHalfWidth()
      })}
    >
      <div className={classes.dataContainer}>
        <Grid container direction="column" alignItems="center">
          <Typography variant="body1" align="center" className={classes.title}>
            {data.value.title}
          </Typography>

          {data.type === 'image' && (
            <ImageDataContainer
              id={id}
              data={data.value}
              countryName={countryName}
            />
          )}

          {data.type === 'html' && (
            <HTMLDataContainer
              id={id}
              data={data.value}
              countryName={countryName}
            />
          )}

          {data.type === 'entities' && (
            <EntitiesDataContainer
              id={id}
              data={data.value}
              countryName={countryName}
              url={url}
            />
          )}

          {data.type === 'document' && (
            <PDFDataContainer
              id={id}
              data={data.value}
              countryName={countryName}
              url={url}
            />
          )}
        </Grid>
      </div>

      {(data.value.description || data.summary) && (
        <div className={classes.descriptionWrapper}>
          <Grid
            container
            justify="center"
            alignItems="flex-start"
            wrap="nowrap"
            className={classes.descriptionContainer}
          >
            <Grid item>
              <ArrowDropUp color="primary" />
            </Grid>
            <Grid item>
              <Typography variant="caption" className={classes.description}>
                {data.value.description || data.summary}
              </Typography>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

DataContainer.propTypes = {
  id: PropTypes.string,
  indicator: PropTypes.shape({
    value: PropTypes.shape({
      summary: PropTypes.string,
      widget: PropTypes.shape({})
    }).isRequired,
    summary: PropTypes.string,
    meta: PropTypes.shape({
      layout: PropTypes.string
    }).isRequired,
    widget: PropTypes.shape({})
  }).isRequired,
  country: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  url: PropTypes.string.isRequired
};

DataContainer.defaultProps = {
  id: ''
};

export default DataContainer;
