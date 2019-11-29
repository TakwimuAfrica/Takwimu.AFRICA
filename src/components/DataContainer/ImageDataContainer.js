/* eslint-disable react/no-danger */
import React from 'react';
import { PropTypes } from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import DataActions from './DataActions';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    '& img': {
      maxWidth: '100%',
      height: 'auto'
    }
  }
});

function DataContainer({
  id,
  data: {
    title,
    image: { src }
  },
  countryName
}) {
  const classes = useStyles();
  const handleDownload = () => {
    const node = document.getElementById(`data-indicator-${id}`);
    if (node) {
      const index = src.lastIndexOf('.');
      const ext = index !== -1 ? src.substring(index + 1) : '';
      const link = document.createElement('a');
      link.download = `${title}.${ext}`;
      link.target = '_blank';
      link.href = src;
      node.body.appendChild(link);
      link.click();
      node.body.removeChild(link);
    }
  };

  const handleShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${window.encodeURIComponent(src)}`
    );
  };

  if (!src) {
    return null;
  }

  return (
    <>
      <div id={`data-indicator-${id}`} className={classes.root}>
        <img alt={title} src={src} />
      </div>
      <DataActions
        title={`${countryName}: ${title}`}
        onShare={handleShare}
        onDownload={handleDownload}
      />
    </>
  );
}

DataContainer.propTypes = {
  id: PropTypes.string,
  data: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string
    }),
    title: PropTypes.string
  }).isRequired,
  countryName: PropTypes.string.isRequired
};

DataContainer.defaultProps = {
  id: ''
};

export default DataContainer;
