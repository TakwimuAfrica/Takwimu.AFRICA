import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import InsightContainer from '@codeforafrica/hurumap-ui/core/InsightContainer';

import config from '../../config';
import logo from '../../assets/images/logo-white-all.png';
import { shareIndicator } from '../../common';

function FlourishChart({ chartId, charts }) {
  const chart = useMemo(() => charts.find(c => c.id === chartId), [
    charts,
    chartId
  ]);
  if (!chart) {
    return null;
  }

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
      loading={false}
      logo={logo}
      title={chart.title}
      variant="analysis"
    >
      <div />
      <iframe
        id={`data-indicator-${chartId}`}
        frameBorder="0"
        scrolling="no"
        title={chart.title}
        style={{ minHeight: 420 }}
        src={`${config.WP_HURUMAP_DATA_API}/flourish/${chartId}/`}
      />
    </InsightContainer>
  );
}

FlourishChart.propTypes = {
  chartId: PropTypes.string.isRequired,
  charts: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default FlourishChart;
