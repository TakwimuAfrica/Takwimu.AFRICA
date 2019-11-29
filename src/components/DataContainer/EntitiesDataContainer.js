/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import DataActions from './DataActions';
import { RichTypography } from '../core';

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
});

function DataContainer({ id, data, countryName, url }) {
  const [images, setImages] = useState({});
  const classes = useStyles();

  useEffect(() => {
    data.entities.forEach(
      entity =>
        entity.image &&
        fetch(`${url}/api/v2/images/${entity.image}`)
          .then(response => response.json())
          .then(json =>
            setImages(prev => ({
              ...prev,
              [json.id]: json.meta.download_url
            }))
          )
    );

    return () => {};
  }, [data.entities, url]);

  return (
    <>
      {data.entities.map(entity => (
        <div id={`data-indicator-${id}`} className={classes.root}>
          {entity.image && <img alt="" src={images[entity.image]} />}
          <RichTypography component="div">{entity.description}</RichTypography>
        </div>
      ))}
      <DataActions title={`${countryName}: ${data.title}`} />
    </>
  );
}

DataContainer.propTypes = {
  id: PropTypes.string,
  data: PropTypes.shape({
    entities: PropTypes.arrayOf(PropTypes.shape({})),
    title: PropTypes.string
  }).isRequired,
  countryName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

DataContainer.defaultProps = {
  id: ''
};

export default DataContainer;
