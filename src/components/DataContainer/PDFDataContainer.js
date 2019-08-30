/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import { ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import DataActions from './DataActions';

import leftArrow from '../../assets/images/left-arrow.svg';
import rightArrow from '../../assets/images/right-arrow.svg';

const PDF = React.lazy(() => import('../../modules/pdf'));

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  pageButton: {
    margin: '20px'
  }
});

function DataContainer({ id, data, countryName, url }) {
  const classes = useStyles();
  const [documents, setDocuments] = useState({});
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (data.document) {
      fetch(`${url}/api/v2/documents/${data.document}`)
        .then(response => response.json())
        .then(json =>
          setDocuments(prev => ({
            ...prev,
            [json.id]: json.meta.download_url
          }))
        );
    }
    return () => {};
  }, [data.document, url]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = documents[data.document];
    link.download = documents[data.document].split('/').pop();
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${escape(documents[data.document])}`
    );
  };

  return (
    data.document && (
      <>
        <div id={`data-indicator-${id}`} className={classes.root}>
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
          {documents[data.document] && (
            <React.Suspense fallback={<div>Loading...</div>}>
              <PDF
                scale={1}
                page={page}
                file={documents[data.document]}
                onDocumentComplete={setNumberOfPages}
              />
            </React.Suspense>
          )}
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
      </>
    )
  );
}

DataContainer.propTypes = {
  id: PropTypes.string,
  data: PropTypes.shape({}).isRequired,
  countryName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

DataContainer.defaultProps = {
  id: ''
};

export default DataContainer;
