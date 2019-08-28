import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import config from '../config';
import ContactContent from '../components/ContactContent';
import ContentPage from '../components/ContentPage';
import Page from '../components/Page';
import TableOfContent from '../components/ContactContent/TableOfContent';

const styles = () => ({
  root: {
    marginTop: '2.875rem',
    marginBottom: '4.375rem'
  }
});

function Contact({ classes }) {
  const [takwimu, setTakwimu] = useState(undefined);
  useEffect(() => {
    const { url } = config;
    fetch(`${url}/api/v2/pages/?type=takwimu.ContactPage&fields=*&format=json`)
      .then(response => response.json())
      .then(data => {
        if (data.items && data.items.length) {
          Object.assign(config.page, data.items[0]);
          setTakwimu(config);
        }
      });
  }, []);
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

Contact.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.shape({}).isRequired
  }).isRequired,
  takwimu: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
      address: PropTypes.shape({
        value: PropTypes.shape({
          label: PropTypes.string
        })
      }).isRequired,
      key_contacts: PropTypes.shape({}).isRequired,
      related_content: PropTypes.shape({}).isRequired,
      social_media: PropTypes.shape({}).isRequired
    }).isRequired,
    settings: PropTypes.shape({
      socialMedia: PropTypes.shape({}).isRequired
    }).isRequired
  }).isRequired
};

export default withStyles(styles)(Contact);
