import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import ContentSection from '../ContentSection';
import Faq from './Faq';
import { RichTypography } from '../core';

const useStyles = makeStyles(({ theme }) => ({
  root: {},
  contentGrid: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    '& a': {
      color: theme.palette.primary.main
    }
  }
}));

function Faqs({ faqs: { value: currentFaqs }, ...props }) {
  const classes = useStyles();
  if (!currentFaqs) {
    return null;
  }

  return (
    <ContentSection
      title={currentFaqs.title}
      variant="h3"
      classes={{ root: classes.root }}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
    >
      <RichTypography>{currentFaqs.description}</RichTypography>
      <Grid
        container
        className={classes.contentGrid}
        direction="column"
        justify="flex-start"
      >
        {currentFaqs.faqs.map(({ value: faq }) => (
          <Faq expandTitle={faq.question} key={faq.question}>
            <RichTypography variant="body2">{faq.answer}</RichTypography>
          </Faq>
        ))}
      </Grid>
    </ContentSection>
  );
}

Faqs.propTypes = {
  faqs: PropTypes.shape({
    value: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      faqs: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.shape({
            question: PropTypes.string,
            answer: PropTypes.string
          })
        })
      )
    })
  }).isRequired
};

export default Faqs;
