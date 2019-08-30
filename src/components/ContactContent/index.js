import React from 'react';
import { PropTypes } from 'prop-types';

import { Typography, Grid, Icon } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import A from '../A';
import ContactContentNav from './ContactContentNav';
import ContentSection from '../ContentSection';
import RichTextSection from '../RichTextSection';
import { Contact as ContactWhereToNext } from '../Next';
import RelatedContent from '../RelatedContent';

import facebook from '../../assets/images/logo-facebook.svg';
import github from '../../assets/images/logo-github.svg';
import instagram from '../../assets/images/group-3.svg';
import linkedin from '../../assets/images/group-3-copy.svg';
import medium from '../../assets/images/logo-medium.svg';
import twitter from '../../assets/images/logo-twitter.svg';

const useStyles = makeStyles(({ theme }) => ({
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
  address: { value: address },
  addressIndex,
  keyContacts: { value: keyContacts },
  keyContactsIndex,
  socialMedia: { value: socialMedia },
  socialMediaIndex,
  current,
  contentHeadings,
  changeActiveContent,
  settingsSocialMedia,
  relatedContent,
  settings: { socialMedia: socialMediaSettings }
}) {
  const classes = useStyles();
  return (
    <>
      <ContactContentNav
        title={contentHeadings[0].title}
        current={current}
        contentHeadings={contentHeadings}
        changeActiveContent={changeActiveContent}
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
          <div className={classes.keyContacts}>
            {keyContacts.contacts.map(keyContact => (
              <Grid container direction="column">
                <Typography>{keyContact.title}</Typography>
                <A href={keyContact.link}>{keyContact.contact_details}</A>
              </Grid>
            ))}
          </div>
        </ContentSection>
      )}
      {address && (
        <RichTextSection
          id={contentHeadings[addressIndex].link}
          classes={{ root: classes.section }}
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
          <Grid container direction="row">
            {socialMedia.accounts.map(account => (
              <A
                className={classes.social}
                href={socialMediaSettings[account.name]}
                underline="hover"
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
      <ContactWhereToNext
        classes={{ sectionRoot: classes.whereToNext }}
        socialMedia={settingsSocialMedia}
      />
      <RelatedContent content={relatedContent} />
    </>
  );
}

ContactContent.propTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.shape({
    description: PropTypes.string,
    value: PropTypes.shape({}),
    title: PropTypes.string
  }).isRequired,
  addressIndex: PropTypes.number.isRequired,
  keyContacts: PropTypes.shape({
    title: PropTypes.string,
    contacts: PropTypes.arrayOf(PropTypes.shape({})),
    value: PropTypes.shape({})
  }).isRequired,
  keyContactsIndex: PropTypes.number.isRequired,
  socialMedia: PropTypes.shape({
    value: PropTypes.shape({})
  }).isRequired,
  socialMediaIndex: PropTypes.number.isRequired,
  settingsSocialMedia: PropTypes.shape({}).isRequired,
  relatedContent: PropTypes.shape({}).isRequired,
  current: PropTypes.number.isRequired,
  contentHeadings: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      title: PropTypes.string
    }).isRequired
  ).isRequired,
  changeActiveContent: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    socialMedia: PropTypes.shape({
      accounts: PropTypes.arrayOf(PropTypes.shape({})),
      title: PropTypes.string
    }).isRequired
  }).isRequired
};

export default ContactContent;
