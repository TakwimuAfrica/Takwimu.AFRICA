import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import ReactDOM from 'react-dom';

import HURUmapChart from './DataContainer/HURUmapChart';
import FlourishChart from './DataContainer/FlourishChart';
import Section from './Section';

function FeaturedData({ charts, children }) {
  const [hydrateElements, setHydrateElements] = useState({
    hurumap: [],
    flourish: []
  });
  useEffect(() => {
    setHydrateElements({
      hurumap: Array.from(
        document.querySelectorAll('div[id^="indicator-hurumap"]')
      ).map(element => ({
        element,
        geoId: element.attributes['data-geo-type'].value,
        chartId: element.attributes['data-chart-id'].value
      })),
      flourish: Array.from(
        document.querySelectorAll('div[id^="indicator-flourish"]')
      ).map(element => ({
        element,
        title: element.attributes['data-chart-title'].value,
        chartId: element.attributes['data-chart-id'].value
      }))
    });
  }, []);

  return (
    <Section title="Featured Data" variant="h2">
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
