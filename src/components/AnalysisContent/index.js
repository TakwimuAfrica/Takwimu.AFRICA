/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/styles/makeStyles';

import { RichTypography } from '../core';
import Actions from './Actions';
import AnalysisReadNext from '../Next/Analysis';
import CarouselTopic from './topics/CarouselTopic';
import CountryContent from '../CountryContent';
import ContentNavigation from './ContentNavigation';
// import DataContainer from '../DataContainer';
import RelatedContent from '../RelatedContent';
import OtherInfoNav from './OtherInfoNav';

import profileHeroImage from '../../assets/images/profile-hero-line.png';
// import config from '../../config';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '933px'
  },
  title: {
    margin: '37px 0 22px 19px'
  },
  body: {
    padding: '0 19px'
  },
  readNextContainer: {
    paddingBottom: '2.25rem'
  },
  hero: {
    backgroundImage: `url(${profileHeroImage})`,
    backgroundPosition: 'center',
    backgroundPositionY: '-6.25rem',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    borderBottomColor: theme.palette.primary.main,
    borderBottomStyle: 'solid',
    borderBottomWidth: '0.25rem',
    marginTop: '0.375rem',
    width: '100%',
    height: '21.125rem',
    [theme.breakpoints.up('md')]: {
      height: '17.125rem',
      backgroundPositionY: '-3rem'
    },
    [theme.breakpoints.up('lg')]: {
      height: '21.125rem',
      backgroundPositionY: '-6.25rem'
    }
  }
}));

function AnalysisContent({
  content,
  topicIndex,
  takwimu,
  onChange,
  analysisLink
}) {
  const classes = useStyles();

  const [carouselItemIndex, setCarouselItemIndex] = useState(
    content.topics[topicIndex].profile_section_topic.type === 'carousel_topic'
      ? 0
      : -1
  );
  useEffect(() => {
    setCarouselItemIndex(
      content.topics[topicIndex].profile_section_topic.type === 'carousel_topic'
        ? 0
        : -1
    );
  }, [content.topics, topicIndex]);

  // const [id, setId] = useState(`${content.id}-${topicIndex}`);
  // useEffect(() => {
  //   if (`${content.id}-${topicIndex}` !== id) {
  //     setId(`${content.id}-${topicIndex}`);
  //   }
  // }, [content.id, topicIndex, id]);

  // useEffect(() => {
  //   if (document.getElementsByClassName('flourish-embed')) {
  //     const script = document.createElement('script');
  //     const oldScript = document.getElementById('flourish-script');
  //     if (oldScript) {
  //       oldScript.remove();
  //     }

  //     window.FlourishLoaded = false;
  //     script.id = 'flourish-script';
  //     script.src = 'https://public.flourish.studio/resources/embed.js';
  //     document.body.appendChild(script);
  //   }
  // }, [id, carouselItemIndex]);

  const showContent = index => () => {
    onChange(index);
  };
  const profileNavigation = 'Other topics in';
  const readNext = 'Read next...';

  const topicType = content.topics[topicIndex].profile_section_topic.type;
  const data = {
    content: content.topics[topicIndex].profile_section_topic,
    item:
      carouselItemIndex !== -1
        ? content.topics[topicIndex].profile_section_topic.carousel
        : null
  };

  return (
    <>
      <OtherInfoNav
        labelText={profileNavigation}
        labelTextStrong={content.post_title}
        content={content}
        current={topicIndex}
        showContent={showContent}
      />
      <div className={classes.hero} />

      <div className={classes.root}>
        <Typography className={classes.title} variant="h2">
          {content.topics[topicIndex].profile_section_topic.post_title}
        </Typography>

        <ContentNavigation
          labelText={profileNavigation}
          labelTextStrong={content.post_title}
          current={topicIndex}
          content={content}
          showContent={showContent}
        />

        <Actions
          title={content.topics[topicIndex].profile_section_topic.post_title}
          page={takwimu.page}
          topic={topicType}
          data={data}
          takwimu={takwimu}
          link={analysisLink}
        />

        {topicType === 'topic' ? (
          <Grid container direction="row">
            <RichTypography className={classes.body} component="div">
              {content.topics[topicIndex].profile_section_topic.post_content}
            </RichTypography>
          </Grid>
        ) : (
          <CarouselTopic
            key={topicIndex}
            data={content.topics[topicIndex].profile_section_topic.carousel}
            onIndexChanged={setCarouselItemIndex}
            url={takwimu.url}
          />
        )}

        <Actions
          title={content.topics[topicIndex].profile_section_topic.post_title}
          page={takwimu.page}
          topic={topicType}
          data={data}
          takwimu={takwimu}
          hideLastUpdated
          link={analysisLink}
        />
        <ContentNavigation
          labelText={profileNavigation}
          labelTextStrong={content.post_title}
          current={topicIndex}
          content={content}
          showContent={showContent}
        />
        <AnalysisReadNext
          classes={{ container: classes.readNextContainer }}
          title={readNext}
          content={content}
          current={topicIndex}
          showContent={showContent}
        />
        <CountryContent content={{}} takwimu={takwimu} />
        <RelatedContent content={{}} />
      </div>
    </>
  );
}

AnalysisContent.propTypes = {
  content: PropTypes.shape({
    ID: PropTypes.number,
    post_title: PropTypes.string,
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        profile_section_topic: PropTypes.shape({
          post_content: PropTypes.string,
          post_title: PropTypes.string,
          type: PropTypes.string,
          carousel: PropTypes.arrayOf(PropTypes.shape({}))
        })
      })
    ),
    profile_navigation: PropTypes.shape({
      value: PropTypes.shape({})
    }),
    read_next: PropTypes.shape({
      value: PropTypes.shape({})
    }),
    related_content: PropTypes.shape({}),
    title: PropTypes.string,
    view_country_content: PropTypes.shape({})
  }).isRequired,
  topicIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  takwimu: PropTypes.shape({
    url: PropTypes.string.isRequired,
    page: PropTypes.shape({}).isRequired,
    country: PropTypes.shape({}).isRequired
  }).isRequired,
  analysisLink: PropTypes.string.isRequired
};

export default AnalysisContent;
