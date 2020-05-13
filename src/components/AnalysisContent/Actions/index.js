/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import dynamic from 'next/dynamic';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { TwitterShareButton } from 'react-share';

import shareIcon from '../../../assets/images/analysis/share.svg';

const DownloadPDF = dynamic(() => import('./DownloadPDF'), { ssr: false });

const useStyles = makeStyles({
  root: {
    padding: '30px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    '& > *': {
      marginRight: '50px'
    },
    '& > button:last-child': {
      marginRight: '0'
    }
  },
  actionIcon: {
    marginRight: '21px'
  },
  lastUpdated: {
    fontSize: '0.875rem',
    lineHeight: 'normal',
    fontStyle: 'italic'
  },
  shareButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  buttonText: {
    fontSize: '0.813rem',
    color: '#848484'
  },
  sharePopover: {
    width: '20.313rem',
    padding: '10px'
  }
});

function Actions({
  data,
  hideLastUpdated,
  labels: { lastUpdateLabel, analysisShareLabel, analysisDownloadLabel },
  link,
  page: pageProp,
  takwimu,
  title,
  topic
}) {
  const classes = useStyles();
  const [analysisLink, setAnalysisLink] = useState(link);

  useEffect(() => {
    function locationHashChanged() {
      setAnalysisLink(window.location.href);
    }

    window.addEventListener('hashchange', locationHashChanged);

    return () => {
      window.removeEventListener('hashchange', locationHashChanged);
    };
  }, []);
  const page = pageProp || takwimu.page;
  const { post_modified: lastUpdated } = page;

  return (
    <div className={classes.root}>
      {!hideLastUpdated && (
        <Typography className={classes.lastUpdated}>
          {`${lastUpdateLabel}: `}
          <strong>
            {new Intl.DateTimeFormat('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }).format(new Date(lastUpdated))}
          </strong>
        </Typography>
      )}

      <TwitterShareButton
        additionalProps={{
          'ga-on': 'click',
          'ga-event-category': 'Twitter',
          'ga-event-action': 'Tweet',
          'ga-event-label': analysisLink
        }}
        url={analysisLink}
      >
        <Grid
          container
          alignItems="center"
          className={classes.shareButtonContainer}
        >
          <img alt="share" src={shareIcon} className={classes.actionIcon} />
          <Typography className={classes.buttonText}>
            {analysisShareLabel}
          </Typography>
        </Grid>
      </TwitterShareButton>
      <DownloadPDF
        title={title}
        topic={topic}
        data={data}
        label={analysisDownloadLabel}
        takwimu={takwimu}
        top={!hideLastUpdated}
      />
    </div>
  );
}

Actions.propTypes = {
  data: PropTypes.shape({}).isRequired,
  hideLastUpdated: PropTypes.bool,
  link: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    analysisShareLabel: PropTypes.string,
    analysisDownloadLabel: PropTypes.string,
    lastUpdateLabel: PropTypes.string
  }),
  page: PropTypes.shape({
    post_modified: PropTypes.string
  }).isRequired,
  takwimu: PropTypes.shape({
    page: PropTypes.shape({}).isRequired
  }).isRequired,
  title: PropTypes.string.isRequired,
  topic: PropTypes.oneOf(['topic', 'carousel_topic']).isRequired
};

Actions.defaultProps = {
  hideLastUpdated: false,
  labels: {
    analysisShareLabel: 'Share this analysis',
    analysisDownloadLabel: 'Download this analysis',
    lastUpdateLabel: 'Last Updated'
  }
};

export default Actions;
