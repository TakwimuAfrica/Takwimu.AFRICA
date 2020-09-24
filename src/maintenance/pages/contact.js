import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { useRouter } from 'next/router';
import { getSitePage } from '../cms';
import ContactContent from '../components/ContactContent';
import ContentPage from '../components/ContentPage';
import Page from '../components/Page';
import AsideTableOfContent from '../components/AsideTableOfContent';
import config from '../config';

const useStyles = makeStyles({
  root: {
    marginTop: '2.875rem',
    marginBottom: '4.375rem'
  }
});

function Contact(takwimu) {
  const classes = useStyles();
  const {
    page: {
      title,
      contact_title: keyContactTitle,
      contact_label: keyContactLabel,
      contacts,
      social_media_title: socialMediaTitle,
      social_media_label: socialMediaLabel,
      social_media_accounts: socialMediaAccounts,
      related_content_title: relatedContentTitle,
      related_links: relatedLinks,
      address_title: addressTitle,
      address_label: addressLabel,
      address_description: addressDescription,
      where_to_next_title: whereToNextTitle,
      where_to_next_link: whereToNextLink
    }
  } = takwimu;

  const keyContacts = {
    label: keyContactLabel,
    title: keyContactTitle,
    contacts
  };
  const address = {
    label: addressLabel,
    title: addressTitle,
    description: addressDescription
  };
  const socialMedia = {
    label: socialMediaLabel,
    title: socialMediaTitle,
    accounts: socialMediaAccounts
  };
  const relatedContent = {
    title: relatedContentTitle,
    relatedLinks
  };
  const whereToNext = {
    title: whereToNextTitle,
    whereToNextLink
  };

  let keyContactsIndex = -1;
  let addressIndex = -1;
  let socialMediaIndex = -1;
  let count = 0;

  const contentHeadings = [];
  if (keyContacts) {
    contentHeadings.push({ title: keyContacts.label, link: 'contacts' });
    keyContactsIndex = count;
    count += 1;
  }
  if (address) {
    contentHeadings.push({ title: address.label, link: 'address' });
    addressIndex = count;
    count += 1;
  }
  if (socialMedia) {
    contentHeadings.push({ title: socialMedia.label, link: 'social' });
    socialMediaIndex = count;
    count += 1;
  }

  const [current, setCurrent] = useState(-1);
  useEffect(() => {
    if (current === -1) {
      return;
    }
    const { link } = contentHeadings[current];
    const sectionEl = document.getElementById(link);
    if (sectionEl) {
      window.scrollTo(0, sectionEl.offsetTop - 90);
    }
  }, [contentHeadings, current]);

  const router = useRouter();
  useEffect(() => {
    const handleHash = () => {
      setCurrent(
        contentHeadings.findIndex(
          heading => heading.link === window.location.hash.slice(1)
        )
      );
    };

    handleHash();
    router.events.on('hashChangeComplete', handleHash);
    return () => {
      router.events.off('hashChangeComplete', handleHash);
    };
  }, [contentHeadings, router]);

  if (count < 1) {
    return null;
  }

  return (
    <Page takwimu={takwimu} title={title}>
      <ContentPage
        aside={
          <AsideTableOfContent
            current={current}
            contentHeadings={contentHeadings}
            generateHref={({ link }) => `/contact#${link}`}
          />
        }
        classes={{ root: classes.root }}
      >
        <ContactContent
          title={title}
          address={address}
          addressIndex={addressIndex}
          keyContacts={keyContacts}
          keyContactsIndex={keyContactsIndex}
          socialMedia={socialMedia}
          socialMediaIndex={socialMediaIndex}
          current={current}
          contentHeadings={contentHeadings}
          relatedContent={relatedContent}
          whereToNext={whereToNext}
        />
      </ContentPage>
    </Page>
  );
}

Contact.getInitialProps = async props => {
  const {
    query: { lang: pageLanguage }
  } = props;
  const lang = pageLanguage || config.DEFAULT_LANG;
  return getSitePage('contact', lang);
};

export default Contact;
