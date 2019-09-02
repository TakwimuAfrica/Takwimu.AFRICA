/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import { makeStyles, withTheme } from '@material-ui/styles';

import DataActions from './DataActions';
import { shareIndicator, uploadImage } from './common';

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
});

function DataContainer({ id, data, theme, countryName, url }) {
  const classes = useStyles();
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

  const toCanvas = () => {
    const iframe = document.getElementById(`data-indicator-${id}`);
    return iframe.contentWindow.html2canvas(iframe.contentDocument.body);
  };

  const handleDownload = () => {
    toCanvas().then(canvas => {
      const link = document.createElement('a');
      link.download = `${data.title}.png`;
      link.target = '_blank';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleShare = () => {
    toCanvas().then(canvas => {
      uploadImage(id, canvas.toDataURL('image/png')).then(success => {
        if (success) {
          shareIndicator(id);
        }
      });
    });
  };

  const updateIframe = (iframe, wrapper) => {
    /* eslint-disable no-param-reassign */
    // In rear cases we don't have `wrapper` element to reference from, just
    // provide a default height to start
    const height =
      wrapper && wrapper.offsetHeight > 420 ? wrapper.offsetHeight : 420;
    iframe.style.height = `${height}px`;
    iframe.contentDocument.body.style.fontFamily = theme.typography.fontText;
    iframe.contentDocument.body.style.background = 'rgb(0,0,0) !important';
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

    // Add htm2canvas
    const frameHead = iframe.contentDocument
      .getElementsByTagName('head')
      .item(0);
    const script = iframe.contentDocument.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.1/dist/html2canvas.min.js';
    frameHead.appendChild(script);

    // Override `body` inline style
    const style = iframe.contentDocument.createElement('style');
    style.type = 'text/css';
    style.append('body[style] { background: none !important; }');
    frameHead.appendChild(style);
  };

  /**
   * First time the onLoad function is called, we get:
   * `TypeError: iframe.contentDocument is null`.
   *
   * This function is temporary fix to get around that... The downside being
   * when we do add the second `onLoad` listener, the `load` event could
   * have been already fired.
   * @param {*} e .
   */
  const handleIframeCreated = e => {
    const iframe = e.target;
    iframe.addEventListener('load', handleIframeLoaded);
  };

  if (animated) {
    const iframe = document.getElementById(`data-indicator-${id}`);
    updateIframe(iframe, iframe.contentDocument.getElementById(animatedId));
  }

  const embedCode = `<iframe title="${data.title}"
 frameborder="0"
 scrolling="no"
 src="${url}/flourish/${data.html}" />`;

  return (
    <>
      <iframe
        id={`data-indicator-${id}`}
        frameBorder="0"
        scrolling="no"
        title={data.title}
        onLoad={handleIframeCreated}
        src={`${url}/flourish/${data.html}`}
        className={classes.root}
      />
      <DataActions
        title={`${countryName}: ${data.title}`}
        onDownload={handleDownload}
        embedCode={embedCode}
        onShare={handleShare}
      />
    </>
  );
}

DataContainer.propTypes = {
  countryName: PropTypes.string.isRequired,
  data: PropTypes.shape({
    html: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  id: PropTypes.string,
  theme: PropTypes.shape({
    palette: PropTypes.shape({
      data: PropTypes.shape({
        light: PropTypes.string
      })
    }),
    typography: PropTypes.shape({
      fontText: PropTypes.string
    })
  }).isRequired,
  url: PropTypes.string.isRequired
};

DataContainer.defaultProps = {
  id: ''
};

export default withTheme(DataContainer);
