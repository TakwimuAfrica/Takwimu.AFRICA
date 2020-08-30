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

import covid19HeroImage from '../../assets/images/covid-19-hero.png';
import profileHeroImage from '../../assets/images/profile-hero-line.png';

import logo from '../../assets/images/logo-white-all.png';
import config from '../../config';

const HERO_STYLES = {
  'covid-19': () => ({
    backgroundImage: `url(${covid19HeroImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    width: '100%',
    height: '0',
    paddingTop: '30%' /* (img-height / img-width * container-width) */
  })
};

const DEFAULT_HERO_STYLES = theme => ({
  backgroundImage: `url(${profileHeroImage})`,
  backgroundPosition: 'center',
  backgroundPositionY: '-6.25rem',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
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
});

const useStyles = makeStyles(theme => ({
  root: {
    borderTopColor: theme.palette.primary.main,
    borderTopStyle: 'solid',
    borderTopWidth: '0.25rem',
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
  hero: ({ heroStyle }) => heroStyle(theme)
}));

function AnalysisContent({
  content,
  profile,
  takwimu,
  topicsNavigation,
  readNextTitle,
  analysisLink,
  contentSelector,
  contentActionsLabels
}) {
  const foundKey = Object.keys(HERO_STYLES).find(key => key === profile);
  const heroStyle = (foundKey && HERO_STYLES[foundKey]) || DEFAULT_HERO_STYLES;
  const classes = useStyles({ heroStyle });

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
          `${config.WP_BACKEND_URL}/wp-json/hurumap-data/flourish/${id}/?lang=${takwimu.language}`,
        fetchDefinitionUrl: (type, id) => {
          switch (type) {
            case 'flourish':
            case 'hurumap':
              return `${config.WP_BACKEND_URL}/wp-json/hurumap-data/charts/${id}?lang=${takwimu.language}`;
            case 'snippet':
              return `${config.WP_BACKEND_URL}/wp-json/wp/v2/${type}/${id}?lang=${takwimu.language}`;
            default:
              return '';
          }
        }
      })
    );
  }, [takwimu.country.name, content, topicIndex, takwimu.language]);

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
      page={topic}
      topic={topic.type}
      data={{
        content: topic,
        item: carouselItemIndex !== -1 ? topic.carousel : null
      }}
      labels={contentActionsLabels}
      takwimu={takwimu}
      link={`${config.url}${analysisLink}`}
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
      generateHref={({ post_name: postName }) => `${analysisLink}#${postName}`}
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
        {takwimu.country.slug && (
          <CountryContent content={contentSelector} takwimu={takwimu} />
        )}
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
  profile: PropTypes.string.isRequired,
  topicsNavigation: PropTypes.string.isRequired,
  readNextTitle: PropTypes.string.isRequired,
  contentSelector: PropTypes.shape({}).isRequired,
  contentActionsLabels: PropTypes.shape({}).isRequired,
  takwimu: PropTypes.shape({
    url: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    page: PropTypes.shape({}).isRequired,
    country: PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string
    }).isRequired
  }).isRequired,
  analysisLink: PropTypes.string.isRequired
};

export default AnalysisContent;
