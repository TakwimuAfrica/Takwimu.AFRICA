import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ContentSection from './ContentSection';
import RichTypography from './RichTypography';

const useStyles = makeStyles(theme => ({
  root: {},
  serviceHeading: {
    fontWeight: 'bold',
    paddingTop: '2rem',
    paddingBottom: '1rem'
  },
  content: {
    '& a': {
      color: theme.palette.primary.main
    }
  },
  contentGrid: {
    paddingTop: '1rem'
  }
}));

function Services({ services, ...props }) {
  const classes = useStyles();
  if (!services) {
    return null;
  }
  const { description, title } = services;

  return (
    <ContentSection
      title={title}
      variant="h3"
      classes={{ root: classes.root }}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
    >
      <RichTypography className={classes.content}>{description}</RichTypography>
      <Grid className={classNames(classes.content, classes.contentGrid)}>
        <RichTypography variant="subtitle2" className={classes.serviceHeading}>
          {title}
        </RichTypography>
        <RichTypography>{description}</RichTypography>
      </Grid>
    </ContentSection>
  );
}

Services.propTypes = {
  services: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string
  }).isRequired
};

export default Services;
