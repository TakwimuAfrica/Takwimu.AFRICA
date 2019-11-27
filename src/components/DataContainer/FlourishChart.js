import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import InsightContainer from '@codeforafrica/hurumap-ui/core/InsightContainer';

import config from '../../config';
import logo from '../../assets/images/logo-white-all.png';
import { shareIndicator } from '../../common';
import theme from '../../theme';

function FlourishChart({ chartId, charts }) {
  const chart = useMemo(() => charts.find(c => c.id === chartId), [
    charts,
    chartId
  ]);
  const [animated, setAnimated] = useState(false);
  const [animatedId, setAnimatedId] = useState('');

  useEffect(
    () => {
      let timer1;
      if (animated) {
        timer1 = setTimeout(() => setAnimated(true), 1000);
      }

      return () => {
        if (timer1) {
          clearTimeout(timer1);
        }
      };
    },
    [animated] // useEffect will run only one time
  );
  if (!chart) {
    return null;
  }
  const updateIframe = (iframe, wrapper) => {
    // Update only if we have access to contentDocument (Same-origin)
    if (!iframe.contentDocument) {
      return;
    }

    // In rear cases we don't have `wrapper` element to reference from, just
    // provide a default height to start
    const height =
      wrapper && wrapper.offsetHeight > 420 ? wrapper.offsetHeight : 420;
    /* eslint-disable no-param-reassign */
    iframe.style.height = `${height}px`;
    iframe.contentDocument.body.style.fontFamily = theme.typography.fontText;
    iframe.contentDocument.body.style.background = 'rgb(0,0,0) !important';
    /* eslint-enable no-param-reassign */
    const headers = iframe.contentDocument.getElementsByClassName(
      'flourish-header'
    );
    if (headers && headers.length) {
      headers[0].style.display = 'none';
    }

    // Sometimes chart come with `Show full visualization` button
    const expandEmbed = iframe.contentDocument.getElementById('expand-embed');
    if (expandEmbed) {
      expandEmbed.style.backgroundColor = theme.palette.data.light;
    }
  };

  const handleIframeLoaded = e => {
    const iframe = e.target;
    // handle only if we have access to contentDocument (Same-origin)
    if (!iframe.contentDocument) {
      return;
    }

    // Most static charts have a wrapper element with id `wrapper`
    const wrapper = iframe.contentDocument.getElementById('wrapper');
    if (wrapper) {
      updateIframe(iframe, wrapper);
    } else {
      // The animated charts may or may not contain a wrapping element.
      // In case there is one, store its id in the component state for easier
      // lookup
      let wrapperId = '';
      if (iframe.contentDocument.getElementById('flourish-popup-constrainer')) {
        wrapperId = 'flourish-popup-constrainer';
      }
      setAnimated(true);
      setAnimatedId(wrapperId);
    }
  };

  if (animated) {
    const iframe = document.getElementById(`data-indicator-${chartId}`);
    updateIframe(iframe, iframe.contentDocument.getElementById(animatedId));
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
      <div>
        <iframe
          id={`data-indicator-${chartId}`}
          frameBorder="0"
          scrolling="no"
          title={chart.title}
          style={{ minHeight: 420 }}
          onLoad={handleIframeLoaded}
          src={`${config.WP_HURUMAP_DATA_API}/flourish/${chartId}/`}
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
