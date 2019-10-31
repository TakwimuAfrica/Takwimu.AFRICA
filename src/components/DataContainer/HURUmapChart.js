import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  ChartFactory,
  useProfileLoader
} from '@codeforafrica/hurumap-ui/factory';
import InsightContainer from '@codeforafrica/hurumap-ui/core/InsightContainer';
import sources from '../../data/sources.json';

function HURUmapChart({ countrySlug, geoId, chartId, charts }) {
  const chart = useMemo(() => charts.find(c => c.id === chartId), [
    charts,
    chartId
  ]);
  const visuals = useMemo(() => (chart ? [chart.visual] : []), [chart]);
  const { profiles, chartData } = useProfileLoader({ geoId, visuals });

  if (
    !chart ||
    (!chartData.isLoading &&
      chartData.profileVisualsData[chart.visual.queryAlias] &&
      chartData.profileVisualsData[chart.visual.queryAlias].nodes.length === 0)
  ) {
    /**
     * If chart failed just don't show it
     */
    return null;
  }
  return (
    <InsightContainer
      hideInsight
      key={chart.id}
      variant="analysis"
      loading={chartData.isLoading}
      title={chart.title}
      source={
        !chartData.isLoading &&
        sources[countrySlug][profiles.profile.geoLevel][chart.visual.table]
          ? sources[countrySlug][profiles.profile.geoLevel][chart.visual.table]
              .source
          : {}
      }
    >
      {!chartData.isLoading &&
        chartData.profileVisualsData[chart.visual.queryAlias] && (
          <ChartFactory
            definition={chart.stat}
            data={chartData.profileVisualsData[chart.visual.queryAlias].nodes}
            profiles={profiles}
          />
        )}
      {!chartData.isLoading &&
        chartData.profileVisualsData[chart.visual.queryAlias] && (
          <ChartFactory
            definition={chart.visual}
            data={chartData.profileVisualsData[chart.visual.queryAlias].nodes}
            profiles={profiles}
          />
        )}
    </InsightContainer>
  );
}

HURUmapChart.propTypes = {
  geoId: PropTypes.string,
  chartId: PropTypes.string,
  countrySlug: PropTypes.string.isRequired,
  charts: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

HURUmapChart.defaultProps = {
  geoId: undefined,
  chartId: undefined
};

export default HURUmapChart;
