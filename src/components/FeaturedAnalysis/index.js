import React from 'react';
import { PropTypes } from 'prop-types';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { countrify } from '../core';
import AnalysisList from './AnalysisList';
import CurrentAnalysis from './CurrentAnalysis';
import Section from '../Section';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.info.main
  },
  content: {
    paddingBottom: '1rem'
  },
  list: {
    height: '100%'
  }
});

class FeaturedAnalysis extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index) {
    this.setState({ current: index });
  }

  render() {
    const {
      classes,
      takwimu: {
        countries,
        page: {
          featured_analysis_title: title,
          read_analysis_link_label: readAnalysisTitle,
          view_profile_link_label: viewProfileTitle,
          analysis: featuredAnalyses
        }
      }
    } = this.props;
    if (!featuredAnalyses && featuredAnalyses.length === 0) {
      return null;
    }
    const { current } = this.state;

    const countrifyTitle = (analysis, countrySlug) => {
      const { post_title: t } = analysis;
      const country = countries.find(c => c.slug === countrySlug);
      return countrify(t, country, countries);
    };

    return (
      <Section title={title} variant="h2">
        <Grid
          container
          justify="flex-start"
          alignItems="stretch"
          className={classes.root}
        >
          {featuredAnalyses && featuredAnalyses.length > 0 && (
            <>
              <CurrentAnalysis
                countrifyTitle={countrifyTitle}
                content={featuredAnalyses[current]}
                classes={{ content: classes.content }}
                readAnalysisTitle={readAnalysisTitle}
                viewProfileTitle={viewProfileTitle}
              />
              <AnalysisList
                countrifyTitle={countrifyTitle}
                content={featuredAnalyses}
                current={current}
                onClick={this.handleClick}
                classes={{ content: classes.list }}
              />
            </>
          )}
        </Grid>
      </Section>
    );
  }
}

FeaturedAnalysis.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  takwimu: PropTypes.shape({
    countries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    page: PropTypes.shape({
      featured_analysis_title: PropTypes.string,
      read_analysis_link_label: PropTypes.string,
      view_profile_link_label: PropTypes.string,
      analysis: PropTypes.arrayOf(
        PropTypes.shape({
          feature_page: PropTypes.shape({
            post_title: PropTypes.string.isRequired,
            post_content: PropTypes.string.isRequired
          }),
          from_country: PropTypes.string.isRequired
        })
      ).isRequired
    }).isRequired
  }).isRequired
};

export default withStyles(styles)(FeaturedAnalysis);
