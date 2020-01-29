import React from 'react';
import { PropTypes } from 'prop-types';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ContentNavigation from './PageContentNavigation';
import ContentSection from './ContentSection';
import RelatedContent from './RelatedContent';
import RichTextSection from './RichTextSection';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '58.313rem'
  },
  title: {
    marginBottom: '1.375rem',
    padding: '0 0.75rem'
  },
  body: {
    padding: '0 1.188rem'
  },
  section: {
    marginTop: '2.5rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    borderTop: `4px solid ${theme.palette.primary.main}`
  },
  social: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '&:not(:last-child)': {
      marginRight: '3.125rem'
    },
    '& > :first-child': {
      marginRight: '0.625rem'
    }
  },
  keyContacts: {
    '& > :not(:last-child)': {
      marginBottom: '2.5rem'
    }
  },
  whereToNext: {
    marginTop: '7.75rem'
  }
}));

function LegalContent({
  title,
  navigationTitle,
  contents,
  current,
  contentHeadings,
  relatedContent
}) {
  const classes = useStyles();
  return (
    <>
      <ContentNavigation
        navigation
        current={current}
        content={contentHeadings}
        contentTitle={navigationTitle}
        generateHref={({ link }) => `/${link}`}
        generateTitle={({ title: linkTitle }) => linkTitle}
      />
      <Typography variant="h2" className={classes.title}>
        {title}
      </Typography>
      <ContentNavigation
        current={current}
        content={contentHeadings}
        contentTitle={navigationTitle}
        generateHref={({ link }) => `/${link}`}
        generateTitle={({ title: linkTitle }) => linkTitle}
      />
      {contents.map((content, i) => (
        <RichTextSection
          key={contentHeadings[i].link}
          id={contentHeadings[i].link}
          classes={{ root: classes.section }}
          title={content.title}
          value={content.description}
          component={ContentSection}
        />
      ))}
      <RelatedContent content={relatedContent} />
    </>
  );
}

LegalContent.propTypes = {
  title: PropTypes.string.isRequired,
  navigationTitle: PropTypes.string.isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contentHeadings: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string
    }).isRequired
  ).isRequired,
  current: PropTypes.number.isRequired,
  relatedContent: PropTypes.shape({}).isRequired
};

export default LegalContent;
