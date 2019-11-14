/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { RichTypography } from '../core';
import Actions from './Actions';
import AnalysisReadNext from '../Next/Analysis';
import CarouselTopic from './topics/CarouselTopic';
import CountryContent from '../CountryContent';
import ContentNavigation from './ContentNavigation';
import RelatedContent from '../RelatedContent';
import OtherInfoNav from './OtherInfoNav';

import profileHeroImage from '../../assets/images/profile-hero-line.png';
import PDFDataContainer from '../DataContainer/PDFDataContainer';

import HURUmapChart from '../DataContainer/HURUmapChart';
import FlourishChart from '../DataContainer/FlourishChart';
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
  topicIndex,
  takwimu,
  onChange,
  topicsNavigation,
  readNextTitle,
  analysisLink,
  charts
}) {
  const classes = useStyles();
  const [hydrateElements, setHydrateElements] = useState({
    hurumap: [],
    flourish: [],
    indicators: []
  });

  useEffect(() => {
    setHydrateElements(
      getHydrateContent(document, 'indicators', 'hurumap', 'flourish')
    );
  }, [charts, takwimu.country.name, topicIndex]);

  const [carouselItemIndex, setCarouselItemIndex] = useState(
    content.topics[topicIndex].type === 'carousel_topic' ? 0 : -1
  );
  useEffect(() => {
    setCarouselItemIndex(
      content.topics[topicIndex].type === 'carousel_topic' ? 0 : -1
    );
  }, [content.topics, topicIndex]);

  const showContent = index => () => {
    onChange(index);
  };

  const topicType = content.topics[topicIndex].type;
  const data = {
    content: content.topics[topicIndex],
    item: carouselItemIndex !== -1 ? content.topics[topicIndex].carousel : null
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
          {content.topics[topicIndex].post_title}
        </Typography>

        <ContentNavigation
          labelText={topicsNavigation}
          labelTextStrong={content.post_title}
          current={topicIndex}
          content={content}
          showContent={showContent}
        />

        <Actions
          title={content.topics[topicIndex].post_title}
          page={takwimu.page}
          topic={topicType}
          data={data}
          takwimu={takwimu}
          link={analysisLink}
        />

        {topicType === 'topic' ? (
          <Grid container direction="row">
            <RichTypography className={classes.body} component="div">
              {content.topics[topicIndex].content}
            </RichTypography>
          </Grid>
        ) : (
          <CarouselTopic
            key={topicIndex}
            data={content.topics[topicIndex].carousel}
            onIndexChanged={setCarouselItemIndex}
            url={takwimu.url}
          />
        )}

        {hydrateElements.hurumap.map(({ element, geoId, chartId }) =>
          ReactDOM.createPortal(
            <HURUmapChart
              geoId={geoId}
              chartId={chartId}
              charts={charts.hurumap}
            />,
            element
          )
        )}
        {hydrateElements.flourish.map(({ element, chartId }) =>
          ReactDOM.createPortal(
            <FlourishChart chartId={chartId} charts={charts.flourish} />,
            element
          )
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
              return ReactDOM.createPortal(
                <PDFDataContainer
                  id={element.id}
                  countryName={takwimu.country.name}
                  data={{ title, source }}
                />,
                element
              );
            }
            return null;
          }
        )}

        <Actions
          title={content.topics[topicIndex].post_title}
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
  topicIndex: PropTypes.number.isRequired,
  topicsNavigation: PropTypes.string.isRequired,
  readNextTitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  takwimu: PropTypes.shape({
    url: PropTypes.string.isRequired,
    page: PropTypes.shape({}).isRequired,
    country: PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string
    }).isRequired
  }).isRequired,
  analysisLink: PropTypes.string.isRequired,
  charts: PropTypes.shape({
    hurumap: PropTypes.arrayOf(PropTypes.shape({})),
    flourish: PropTypes.arrayOf(PropTypes.shape({}))
  })
};

AnalysisContent.defaultProps = {
  charts: []
};

export default AnalysisContent;
