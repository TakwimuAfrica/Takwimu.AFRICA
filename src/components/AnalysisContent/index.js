/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import renderBlocks from '@hurumap-ui/content/renderBlocks';
import RichTypography from '../RichTypography';
import Actions from './Actions';
import AnalysisReadNext from '../Next/Analysis';
import CarouselTopic from './CarouselTopic';
import CountryContent from '../CountryContent';
import RelatedContent from '../RelatedContent';
import OtherInfo from '../PageContentNavigation';

import profileHeroImage from '../../assets/images/profile-hero-line.png';

import logo from '../../assets/images/logo-white-all.png';
import config from '../../config';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '933px'
  },
  title: {
    margin: '37px 0 22px 19px'
  },
  body: {
    padding: '0 19px',
    width: '100%'
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
  takwimu,
  topicsNavigation,
  readNextTitle,
  analysisLink,
  contentSelector,
  contentActionsLabels
}) {
  const classes = useStyles();

  const [topicIndex, setTopicIndex] = useState(0);
  // If there is topic specified, it'll be as hash;
  useEffect(() => {
    const topicId = window.location.hash && window.location.hash.split('#')[1];
    const foundTopicIndex = topicId
      ? content.topics.findIndex(topic => topic.post_name === topicId)
      : 0;
    setTopicIndex(foundTopicIndex !== -1 ? foundTopicIndex : 0);
  }, [content]);

  const [blocks, setBlocks] = useState();
  useEffect(() => {
    setBlocks(
      renderBlocks({
        logo,
        flourishURL: id =>
          `${config.WP_BACKEND_URL}/wp-json/hurumap-data/flourish/${id}/`,
        fetchDefinitionUrl: (type, id) => {
          switch (type) {
            case 'flourish':
            case 'hurumap':
              return `${config.WP_BACKEND_URL}/wp-json/hurumap-data/charts/${id}`;
            case 'snippet':
              return `${config.WP_BACKEND_URL}/wp-json/wp/v2/${type}/${id}`;
            default:
              return '';
          }
        }
      })
    );
  }, [takwimu.country.name, content, topicIndex]);

  const [carouselItemIndex, setCarouselItemIndex] = useState(
    content.topics &&
      content.topics[topicIndex] &&
      content.topics[topicIndex].type === 'carousel_topic'
      ? 0
      : -1
  );

  useEffect(() => {
    if (
      content.topics &&
      content.topics[topicIndex] &&
      content.topics[topicIndex].type === 'carousel_topic'
    ) {
      setCarouselItemIndex(0);
    }
    window.scrollTo(0, 0);
  }, [content, topicIndex]);

  const topic = content.topics && content.topics[topicIndex];
  if (!topic) {
    return null;
  }

  const renderActions = props => (
    <Actions
      title={topic.post_title}
      page={takwimu.page}
      topic={topic.type}
      data={{
        content: topic,
        item: carouselItemIndex !== -1 ? topic.carousel : null
      }}
      labels={contentActionsLabels}
      takwimu={takwimu}
      link={analysisLink}
      {...props}
    />
  );

  const renderOtherTopics = props => (
    <OtherInfo
      title={topicsNavigation}
      contentTitle={content.post_title}
      content={content.topics}
      current={topicIndex}
      onClick={setTopicIndex}
      generateHref={({ post_name: postName }) => `#${postName}`}
      generateTitle={({ post_title: postTitle }) => postTitle}
      {...props}
    />
  );

  return (
    <>
      {renderOtherTopics({ navigation: true })}

      <div className={classes.hero} />

      <div className={classes.root}>
        <Typography className={classes.title} variant="h2">
          {topic.post_title}
        </Typography>

        {renderOtherTopics()}

        {renderActions()}

        {topic.type === 'topic' ? (
          <Grid container direction="row">
            <RichTypography className={classes.body} component="div">
              {topic.content}
            </RichTypography>
          </Grid>
        ) : (
          <CarouselTopic
            key={topicIndex}
            data={topic.carousel}
            onIndexChanged={setCarouselItemIndex}
            url={takwimu.url}
          />
        )}

        {blocks}

        {renderActions({ hideLastUpdated: true })}

        {renderOtherTopics()}

        <AnalysisReadNext
          classes={{ container: classes.readNextContainer }}
          title={readNextTitle}
          content={content}
          current={topicIndex}
          onClick={setTopicIndex}
        />
        <CountryContent content={contentSelector} takwimu={takwimu} />
        <RelatedContent content={{}} />
      </div>
    </>
  );
}

AnalysisContent.propTypes = {
  content: PropTypes.shape({
    post_title: PropTypes.string,
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string,
        post_title: PropTypes.string,
        type: PropTypes.string,
        carousel: PropTypes.arrayOf(PropTypes.shape({}))
      })
    )
  }).isRequired,
  topicsNavigation: PropTypes.string.isRequired,
  readNextTitle: PropTypes.string.isRequired,
  contentSelector: PropTypes.shape({}).isRequired,
  contentActionsLabels: PropTypes.shape({}).isRequired,
  takwimu: PropTypes.shape({
    url: PropTypes.string.isRequired,
    page: PropTypes.shape({}).isRequired,
    country: PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string
    }).isRequired
  }).isRequired,
  analysisLink: PropTypes.string.isRequired
};

export default AnalysisContent;
