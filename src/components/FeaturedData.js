import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import ReactDOM from 'react-dom';

import getHydrateContent from '../utils/getHydrateContent';
import FlourishChart from './DataContainer/FlourishChart';
import HURUmapChart from './DataContainer/HURUmapChart';
import Section from './Section';

function FeaturedData({ charts, children }) {
  const [hydrateElements, setHydrateElements] = useState({
    title: '',
    hurumap: [],
    flourish: []
  });
  useEffect(() => {
    const featureDataElement = document.getElementById('featured-data');
    const title = featureDataElement.attributes['data-title'].value;
    setHydrateElements({
      title,
      ...getHydrateContent(featureDataElement, 'hurumap', 'flourish')
    });
  }, []);

  return (
    <Section title={hydrateElements.title} variant="h2">
      {children}
      {hydrateElements.hurumap.map(({ element, geoId, chartId }) =>
        ReactDOM.createPortal(
          <HURUmapChart
            charts={charts.hurumap}
            chartId={chartId}
            geoId={geoId}
          />,
          element
        )
      )}
      {hydrateElements.flourish.map(({ element, title, chartId }) =>
        ReactDOM.createPortal(
          <FlourishChart
            charts={charts.flourish}
            chartId={chartId}
            title={title}
          />,
          element
        )
      )}
    </Section>
  );
}

FeaturedData.propTypes = {
  charts: PropTypes.shape({
    hurumap: PropTypes.arrayOf(PropTypes.shape({})),
    flourish: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default FeaturedData;
