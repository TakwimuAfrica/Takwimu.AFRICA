import React from 'react';

import Hero from '../components/MaintenanceHero';
import Page from '../components/Page';
// import Section from '../components/Section';
import config from '../config';

function MaintenanceHome(props) {
  return (
    <Page
      takwimu={{ page: {}, settings: { navigation: { country_analysis: {} } } }}
    >
      <Hero
        title="Actionanble Insights for African changemakers"
        message={`
     <p>Takwimu is taking a break for some essential maintenance and planned upgrades. The site will be back online in January 2021. In the interim please contact us by email to <a href="mailto:support@takwimu.africa" target="_blank" rel="noopener noreferrer">support@takwimu.africa</a> with any enquiries, or subscribe to our mailing list for updates.</p>
     <p>Thank you for your patience and continued support during this time.</p>
      `}
      />
    </Page>
  );
}

export default MaintenanceHome;
