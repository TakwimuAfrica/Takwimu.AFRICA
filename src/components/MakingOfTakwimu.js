import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { RichTypography } from './core';
import Section from './Section';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    paddingBottom: '56.25%',
    margin: '2.8125rem 0'
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 0
  },
  title: {
    marginTop: '4.125rem'
  }
});

function MakingOfTakwimu({
  takwimu: {
    page: {
      making_of_takwimu_title: title,
      making_of_takwimu_description: description,
      making_of_takwimu_link: link
    }
  }
}) {
  const classes = useStyles();
  const iframeId = 'making-of-takwimu-yt-iframe';

  useEffect(() => {
    if (link && link !== '') {
      const tag = document.createElement('script');
      tag.id = 'making-of-takwimu-yt-iframe_api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        // eslint-disable-next-line no-new
        new window.YT.Player(iframeId, {
          events: {
            onStateChange: () => {
              window.ga('send', 'event', 'Video', 'Play', `${title}: ${link}`);
            }
          }
        });
      };
    }
  });

  if (!link) {
    return null;
  }

  return (
    <Section
      id="takwimuMakingOf"
      title={title}
      variant="h3"
      classes={{ title: classes.title }}
    >
      <RichTypography>{description}</RichTypography>
      <div className={classes.container}>
        <iframe
          id={iframeId}
          title={title}
          src={
            link.indexOf('?') === -1
              ? `${link}?enablejsapi=1`
              : `${link}enablejsapi=1`
          }
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={classes.iframe}
        />
      </div>
    </Section>
  );
}

MakingOfTakwimu.propTypes = {
  takwimu: PropTypes.shape({
    page: PropTypes.shape({
      making_of_takwimu_title: PropTypes.string.isRequired,
      making_of_takwimu_description: PropTypes.string.isRequired,
      making_of_takwimu_link: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default MakingOfTakwimu;
