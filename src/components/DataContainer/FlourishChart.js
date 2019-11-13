import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import InsightContainer from '@codeforafrica/hurumap-ui/core/InsightContainer';
import config from '../../config';

function FlourishChart({ chartId, charts }) {
  const chart = useMemo(() => charts.find(c => c.id === chartId), [
    charts,
    chartId
  ]);

  return (
    <InsightContainer
      hideInsight
      key={chart.id}
      variant="analysis"
      loading={false}
      title={chart.title}
    >
      <div />
      <div>
        <iframe
          id={`data-indicator-${chartId}`}
          frameBorder="0"
          scrolling="no"
          title={chart.title}
          style={{ minHeight: 420 }}
          src={`${config.WP_HURUMAP_DATA_API}/flourish/${chartId}`}
        />
      </div>
    </InsightContainer>
  );
}

FlourishChart.propTypes = {
  chartId: PropTypes.string.isRequired,
  charts: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default FlourishChart;
