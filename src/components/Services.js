import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import ContentSection from './ContentSection';
import { RichTypography } from './core';

const useStyles = makeStyles(({ theme }) => ({
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

function Services({ services: { value: currentServices }, ...props }) {
  const classes = useStyles();
  if (!currentServices) {
    return null;
  }

  return (
    <ContentSection
      title={currentServices.title}
      variant="h3"
      classes={{ root: classes.root }}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
    >
      <RichTypography className={classes.content}>
        {currentServices.description}
      </RichTypography>
      <Grid className={classNames(classes.content, classes.contentGrid)}>
        {currentServices.services.map(({ value: service }) => (
          <React.Fragment key={service.title}>
            <RichTypography
              variant="subtitle2"
              className={classes.serviceHeading}
            >
              {service.title}
            </RichTypography>
            <RichTypography>{service.description}</RichTypography>
          </React.Fragment>
        ))}
      </Grid>
    </ContentSection>
  );
}

Services.propTypes = {
  services: PropTypes.shape({
    value: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      services: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string
          })
        })
      )
    })
  }).isRequired
};

export default Services;
