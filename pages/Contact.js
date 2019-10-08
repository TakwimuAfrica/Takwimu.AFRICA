import React, { useCallback, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/styles';

import ContactContent from '../src/components/ContactContent';
import ContentPage from '../src/components/ContentPage';
import Page from '../src/components/Page';
import TableOfContent from '../src/components/ContactContent/TableOfContent';
import getTakwimuPage from '../src/getTakwimuPage';

const useStyles = makeStyles({
  root: {
    marginTop: '2.875rem',
    marginBottom: '4.375rem'
  }
});

function Contact(takwimu) {
  const classes = useStyles();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const contentHeadings = [];
  const {
    page: {
      title,
      key_contacts: keyContacts,
      social_media: socialMedia,
      related_content: relatedContent,
      address
    },
    settings
  } = takwimu || {
    page: {
      address: {},
      key_contacts: {},
      related_content: {},
      social_media: {}
    }
  };
  let keyContactsIndex = -1;
  let addressIndex = -1;
  let socialMediaIndex = -1;
  let count = 0;
  if (keyContacts.value) {
    contentHeadings.push({ title: keyContacts.value.label, link: 'contacts' });
    keyContactsIndex = count;
    count += 1;
  }
  if (address.value) {
    contentHeadings.push({ title: address.value.label, link: 'address' });
    addressIndex = count;
    count += 1;
  }
  if (socialMedia.value) {
    contentHeadings.push({ title: socialMedia.value.label, link: 'social' });
    socialMediaIndex = count;
    count += 1;
  }

  const changeActiveContent = useCallback(
    index => {
      setCurrentSectionIndex(index);
      const activeElement = document.getElementById(
        contentHeadings[index].link
      );
      window.scrollTo(0, activeElement.offsetTop - 90);
    },
    [contentHeadings]
  );

  useEffect(() => {
    const currentIndex = contentHeadings.findIndex(
      x => x.link === window.location.hash.replace('#', '')
    );
    if (currentIndex !== -1) {
      changeActiveContent(currentIndex);
    }
  }, [changeActiveContent, contentHeadings]);

  if (count < 1) {
    return null;
  }

  return (
    <Page takwimu={takwimu} title={takwimu.page.title}>
      <ContentPage
        aside={
          <TableOfContent
            current={currentSectionIndex}
            contentHeadings={contentHeadings}
            changeActiveContent={changeActiveContent}
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
          current={currentSectionIndex}
          contentHeadings={contentHeadings}
          relatedContent={relatedContent}
          changeActiveContent={changeActiveContent}
          settingsSocialMedia={settings.socialMedia}
          settings={settings}
        />
      </ContentPage>
    </Page>
  );
}

Contact.getInitialProps = async () => {
  return getTakwimuPage('takwimu.ContactPage');
};

export default Contact;
