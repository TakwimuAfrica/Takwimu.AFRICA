/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { RichTypography } from '../core';
import Actions from './Actions';
import AnalysisReadNext from '../Next/Analysis';
import CarouselTopic from './topics/CarouselTopic';
import CountryContent from '../CountryContent';
import ContentNavigation from './ContentNavigation';
import Portal from '../Portal';
import RelatedContent from '../RelatedContent';
import OtherInfoNav from './OtherInfoNav';

import profileHeroImage from '../../assets/images/profile-hero-line.png';
import PDFDataContainer from '../DataContainer/PDFDataContainer';

import getHydrateContent from '../../utils/getHydrateContent';

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
  analysisLink
}) {
  const classes = useStyles();

  const [topicIndex, setTopicIndex] = useState(0);
  // If there is topic specified, it'll be as hash;
  useEffect(() => {
    const topicId = window.location.hash
      ? window.location.hash.split('#')[1]
      : '';
    const foundTopicIndex = topicId
      ? content.topics.findIndex(topic => topic.post_name === topicId)
      : 0;
    setTopicIndex(foundTopicIndex !== -1 ? foundTopicIndex : 0);
  }, [content]);
  const [hydrateElements, setHydrateElements] = useState({
    indicators: []
  });
  useEffect(() => {
    setHydrateElements(getHydrateContent(document, 'indicators'));
  }, [takwimu.country.name, topicIndex]);

  const [carouselItemIndex, setCarouselItemIndex] = useState(
    content.topics &&
      content.topics[topicIndex] &&
      content.topics[topicIndex].type === 'carousel_topic'
      ? 0
      : -1
  );
  useEffect(() => {
    setCarouselItemIndex(
      content.topics &&
        content.topics[topicIndex] &&
        content.topics[topicIndex].type === 'carousel_topic'
        ? 0
        : -1
    );
  }, [content, topicIndex]);

  const topic = content.topics && content.topics[topicIndex];
  if (!topic) {
    return null;
  }

  const changeTopic = next => {
    setTopicIndex(next);
    window.scrollTo(0, 0);
  };
  const showContent = index => () => {
    changeTopic(index);
  };
  const topicType = topic.type;
  const data = {
    content: topic,
    item: carouselItemIndex !== -1 ? topic.carousel : null
  };
  return (
    <>
      <OtherInfoNav
        labelText={topicsNavigation}
        labelTextStrong={content.post_title}
        content={content}
        current={topicIndex}
        showContent={showContent}
      />
      <div className={classes.hero} />

      <div className={classes.root}>
        <Typography className={classes.title} variant="h2">
          {topic.post_title}
        </Typography>

        <ContentNavigation
          labelText={topicsNavigation}
          labelTextStrong={content.post_title}
          current={topicIndex}
          content={content}
          showContent={showContent}
        />

        <Actions
          title={topic.post_title}
          page={takwimu.page}
          topic={topicType}
          data={data}
          takwimu={takwimu}
          link={analysisLink}
        />

        {topicType === 'topic' ? (
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
        {hydrateElements.indicators.map(
          ({ element, layout, title, src: source }) => {
            if (layout === 'document_widget') {
              /**
               * Currently the content returned from wp contains styling.
               * Remove this styling and render the appropriate container.
               */
              // eslint-disable-next-line no-param-reassign
              element.innerHTML = '';
              return (
                <Portal key={element.id} element={element}>
                  <PDFDataContainer
                    id={element.id}
                    countryName={takwimu.country.name}
                    data={{ title, source }}
                  />
                </Portal>
              );
            }
            return null;
          }
        )}

        <Actions
          title={topic.post_title}
          page={takwimu.page}
          topic={topicType}
          data={data}
          takwimu={takwimu}
          hideLastUpdated
          link={analysisLink}
        />
        <ContentNavigation
          labelText={topicsNavigation}
          labelTextStrong={content.post_title}
          current={topicIndex}
          content={content}
          showContent={showContent}
        />
        <AnalysisReadNext
          classes={{ container: classes.readNextContainer }}
          title={readNextTitle}
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
    post_title: PropTypes.string,
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string,
        post_title: PropTypes.string,
        type: PropTypes.string,
        carousel: PropTypes.arrayOf(PropTypes.shape({}))
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
  topicsNavigation: PropTypes.string.isRequired,
  readNextTitle: PropTypes.string.isRequired,
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
