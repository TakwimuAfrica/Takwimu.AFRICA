import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ContentSection from '../ContentSection';
import Faq from './Faq';
import RichTypography from '../RichTypography';

const useStyles = makeStyles(theme => ({
  root: {},
  contentGrid: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    '& a': {
      color: theme.palette.primary.main
    }
  }
}));

function Faqs({ faqs, ...props }) {
  const classes = useStyles();
  if (!faqs) {
    return null;
  }
  const { title, description, questionsAnswers } = faqs;

  return (
    <ContentSection
      title={title}
      variant="h3"
      classes={{ root: classes.root }}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
    >
      <RichTypography>{description}</RichTypography>
      <Grid
        container
        className={classes.contentGrid}
        direction="column"
        justify="flex-start"
      >
        {questionsAnswers.map(faq => (
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
    title: PropTypes.string,
    description: PropTypes.string,
    questionsAnswers: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string,
        answer: PropTypes.string
      })
    )
  }).isRequired
};

export default Faqs;
