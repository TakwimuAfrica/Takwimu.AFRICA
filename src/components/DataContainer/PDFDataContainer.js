/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import dynamic from 'next/dynamic';

import { ButtonBase, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DataActions from './DataActions';

import leftArrow from '../../assets/images/left-arrow.svg';
import rightArrow from '../../assets/images/right-arrow.svg';

const PDF = dynamic(() => import('../../modules/pdf'), { ssr: false });

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '1.25rem'
  },
  dataContainer: {
    padding: '0.625rem',
    backgroundColor: theme.palette.data.light,
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      padding: '1.25rem'
    }
  },
  title: {
    fontWeight: 'bold',
    lineHeight: 1.2,
    marginBottom: '0.625rem'
  },
  dataRoot: {
    display: 'flex',
    justifyContent: 'center'
  },
  pageButton: {
    margin: '20px'
  }
}));

function DataContainer({ id, data, countryName }) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);

  if (!data.source) {
    return null;
  }

  const handleDownload = () => {
    const node = document.getElementById(`${id}-container`);
    if (node) {
      const link = document.createElement('a');
      link.href = data.source;
      link.download = data.source;
      link.target = '_blank';
      node.appendChild(link);
      link.click();
      node.removeChild(link);
    }
  };
  const handleShare = () => {
    window.open(`https://twitter.com/intent/tweet?url=${escape(data.source)}`);
  };
  return (
    <div id={`${id}-container`} className={classes.root}>
      <div className={classes.dataContainer}>
        <Grid container direction="column" alignItems="center">
          <Typography variant="body1" align="center" className={classes.title}>
            {data.title}
          </Typography>
          <div id={`data-${id}`} className={classes.dataRoot}>
            <ButtonBase
              disabled={page <= 1}
              ga-on="click"
              ga-event-category="Data (PDF)"
              ga-event-action="Paginate"
              ga-event-label={data.title}
              ga-event-value={page + 1}
              className={classes.pageButton}
              onClick={() => setPage(page - 1)}
            >
              <img alt="" src={leftArrow} />
            </ButtonBase>
            <PDF
              scale={1}
              page={page}
              file={data.source}
              onDocumentComplete={setNumberOfPages}
            />
            <ButtonBase
              ga-on="click"
              ga-event-category="Data (PDF)"
              ga-event-action="Paginate"
              ga-event-label={data.title}
              ga-event-value={page + 1}
              disabled={page >= numberOfPages}
              className={classes.pageButton}
              onClick={() => setPage(page + 1)}
            >
              <img alt="" src={rightArrow} />
            </ButtonBase>
          </div>

          <DataActions
            title={`${countryName}: ${data.title}`}
            onDownload={handleDownload}
            onShare={handleShare}
          />
        </Grid>
      </div>
    </div>
  );
}

DataContainer.propTypes = {
  id: PropTypes.string,
  data: PropTypes.shape({
    title: PropTypes.string,
    source: PropTypes.string
  }).isRequired,
  countryName: PropTypes.string.isRequired
};

DataContainer.defaultProps = {
  id: ''
};

export default DataContainer;
