import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import InsightContainer from '@codeforafrica/hurumap-ui/core/InsightContainer';

import config from '../../config';
import { shareIndicator } from '../../common';

function FlourishChart({ chartId, charts }) {
  const chart = useMemo(() => charts.find(c => c.id === chartId), [
    charts,
    chartId
  ]);
  if (!chart) {
    return null;
  }

  return (
    <InsightContainer
      actions={{
        handleShare: shareIndicator.bind(null, chart.id)
      }}
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
