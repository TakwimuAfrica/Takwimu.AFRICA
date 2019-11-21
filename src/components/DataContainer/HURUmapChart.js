import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  ChartFactory,
  useProfileLoader
} from '@codeforafrica/hurumap-ui/factory';
import InsightContainer from '@codeforafrica/hurumap-ui/core/InsightContainer';

import config from '../../config';
import logo from '../../assets/images/logo-white-all.png';
import { shareIndicator } from '../../common';
import sources from '../../data/sources.json';

function HURUmapChart({ geoId, chartId, charts }) {
  const chart = useMemo(() => charts.find(c => c.id === chartId), [
    charts,
    chartId
  ]);
  const visuals = useMemo(() => (chart ? [chart.visual] : []), [chart]);
  const { profiles, chartData } = useProfileLoader({ geoId, visuals });
  // geoId: country-NG, level1-KE_1_006, etc.
  const countryCode = geoId.split('-')[1].substring(0, 3);
  const foundCountry = config.countries.find(c => c.iso_code === countryCode);
  const countrySlug = foundCountry && foundCountry.slug;

  if (
    !chart ||
    (!chartData.isLoading &&
      chartData.profileVisualsData[chart.visual.queryAlias] &&
      chartData.profileVisualsData[chart.visual.queryAlias].nodes.length ===
        0) ||
    !countrySlug
  ) {
    /**
     * If chart failed, or wrong countrySlug,just don't show it
     */
    return null;
  }

  return (
    <InsightContainer
      actions={{
        handleShare: shareIndicator.bind(null, chart.id)
      }}
      hideInsight
      key={chart.id}
      loading={chartData.isLoading}
      logo={logo}
      source={
        !chartData.isLoading &&
        sources[countrySlug][profiles.profile.geoLevel][chart.visual.table]
          ? sources[countrySlug][profiles.profile.geoLevel][chart.visual.table]
              .source
          : {}
      }
      title={chart.title}
      variant="analysis"
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
  charts: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

HURUmapChart.defaultProps = {
  geoId: undefined,
  chartId: undefined
};

export default HURUmapChart;
