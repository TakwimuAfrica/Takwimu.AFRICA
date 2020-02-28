import React from 'react';
import { PropTypes } from 'prop-types';

import { Typography, Grid, Icon } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import A from '@hurumap-ui/core/A';

import ContentSection from './ContentSection';
import RichTextSection from './RichTextSection';
import WhereToNext from './Next';
import RelatedContent from './RelatedContent';

import facebook from '../assets/images/logo-facebook.svg';
import github from '../assets/images/logo-github.svg';
import instagram from '../assets/images/group-3.svg';
import linkedin from '../assets/images/group-3-copy.svg';
import medium from '../assets/images/logo-medium.svg';
import twitter from '../assets/images/logo-twitter.svg';
import ContentNavigation from './PageContentNavigation';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '58.313rem'
  },
  title: {
    marginBottom: '1.375rem',
    padding: '0 0.75rem'
  },
  addressText: {
    marginTop: '2.5rem'
  },
  body: {
    padding: '0 1.188rem'
  },
  contactTitle: {
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  contactEmail: {
    fontSize: '1.25rem'
  },
  section: {
    marginTop: '2.5rem',
    paddingTop: '1.5rem',
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
  socialGrid: {
    marginTop: '2.8125rem'
  },
  whereToRoot: {
    marginTop: '2.375rem'
  },
  keyContacts: {
    fontSize: '1.25rem',
    marginBottom: '2.75rem'
  },
  whereToNext: {
    width: '100%',
    margin: '7.75rem 0 0 0',
    padding: 0,
    [theme.breakpoints.up('md')]: {
      width: '43.734375rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      width: '58.3125rem'
    }
  }
}));

const SOCIAL_MEDIA = {
  facebook: { name: 'Facebook', logo: facebook },
  github: { name: 'GitHub', logo: github },
  instagram: { name: 'Instagram', logo: instagram },
  linkedin: { name: 'LinkedIn', logo: linkedin },
  medium: { name: 'Medium', logo: medium },
  twitter: { name: 'Twitter', logo: twitter }
};

function ContactContent({
  title,
  address,
  addressIndex,
  keyContacts,
  keyContactsIndex,
  socialMedia,
  socialMediaIndex,
  current,
  contentHeadings,
  whereToNext,
  relatedContent
}) {
  const classes = useStyles();
  return (
    <>
      <ContentNavigation
        navigation
        current={current}
        content={contentHeadings}
        contentTitle={contentHeadings[0].title}
        generateHref={({ link }) => `/contact#${link}`}
        generateTitle={({ title: linkTitle }) => linkTitle}
      />
      <Typography variant="h2" className={classes.title}>
        {title}
      </Typography>
      {keyContacts && (
        <ContentSection
          id={contentHeadings[keyContactsIndex].link}
          classes={{ root: classes.section }}
          title={keyContacts.title}
          variant="h3"
        >
          {keyContacts.contacts.map(keyContact => (
            <Grid
              key={keyContact.link}
              className={classes.keyContacts}
              container
              direction="column"
            >
              <Typography className={classes.contactTitle}>
                {keyContact.title}
              </Typography>
              <A href={keyContact.link} className={classes.contactEmail}>
                {keyContact.contact_details}
              </A>
            </Grid>
          ))}
        </ContentSection>
      )}
      {address && (
        <RichTextSection
          id={contentHeadings[addressIndex].link}
          classes={{ root: classes.section, text: classes.addressText }}
          title={address.title}
          value={address.description}
          component={ContentSection}
        />
      )}
      {socialMedia && (
        <ContentSection
          id={contentHeadings[socialMediaIndex].link}
          classes={{ root: classes.section }}
          title={socialMedia.title}
          variant="h3"
        >
          <Grid container direction="row" className={classes.socialGrid}>
            {socialMedia.accounts.map(account => (
              <A
                className={classes.social}
                href={account.account_url}
                underline="hover"
                key={account.name}
              >
                <img
                  src={SOCIAL_MEDIA[account.name].logo}
                  alt=""
                  className={classes.icon}
                />
                <Icon className={classes.social} />
                {SOCIAL_MEDIA[account.name].name}
              </A>
            ))}
          </Grid>
        </ContentSection>
      )}
      <WhereToNext
        classes={{
          sectionRoot: classes.whereToNext,
          root: classes.whereToRoot
        }}
        variant="dual"
        whereToNext={whereToNext}
      />
      <RelatedContent content={relatedContent} />
    </>
  );
}

ContactContent.propTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  addressIndex: PropTypes.number.isRequired,
  keyContacts: PropTypes.shape({
    title: PropTypes.string,
    contacts: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  keyContactsIndex: PropTypes.number.isRequired,
  socialMedia: PropTypes.shape({
    title: PropTypes.string,
    accounts: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  socialMediaIndex: PropTypes.number.isRequired,
  relatedContent: PropTypes.shape({}).isRequired,
  current: PropTypes.number.isRequired,
  contentHeadings: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      title: PropTypes.string
    }).isRequired
  ).isRequired,
  whereToNext: PropTypes.shape({
    title: PropTypes.string,
    whereLink: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired
};

export default ContactContent;
