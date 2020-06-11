const WP_BACKEND_URL =
  // eslint-disable-next-line no-nested-ternary
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://dashboard.takwimu.africa';

const config = {
  url:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://takwimu.africa',
  robots: {
    devHosts: ['dev.takwimu.africa', 'now.sh'],
    dev: `
User-agent: *
Disallow: /
    `,
    prod: `
User-agent: *
Disallow:
    `
  },
  WP_BACKEND_URL,
  WP_HURUMAP_DATA_API: `${WP_BACKEND_URL}/wp-json/hurumap-data`,
  ES_URL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:9200'
      : 'https://search-cfa-openafrica-z56l24lkfbv5erjxxs76sevr3i.eu-west-1.es.amazonaws.com',
  DEFAULT_LANG: 'en',
  country: {},
  /* Name translations are taken from: https://unstats.un.org/unsd/geoinfo/UNGEGN/docs/11th-uncsgn-docs/E_Conf.105_13_CRP.13_15_UNGEGN%20WG%20Country%20Names%20Document.pdf */
  countries: [
    {
      iso_code: 'BF',
      // Same names in EN & FR
      name: 'Burkina Faso',
      iso_name: 'Burkina Faso',
      short_name: 'Burkina Faso',
      slug: 'burkina-faso',
      lang: 'en',
      published: true
    },
    {
      iso_code: 'CD',
      get name() {
        if (config.language === 'fr') {
          return 'République Démocratique du Congo';
        }
        return 'Democratic Republic of Congo';
      },
      get iso_name() {
        if (config.language === 'fr') {
          return 'Congo, la République Démocratique du';
        }
        return 'Congo, the Democratic Republic of the';
      },
      get short_name() {
        if (config.language === 'fr') {
          return 'RD Congo';
        }
        return 'DR Congo';
      },
      slug: 'democratic-republic-of-congo',
      lang: 'en',
      published: true
    },
    {
      iso_code: 'ET',
      get name() {
        if (config.language === 'fr') {
          return 'Éthiopie';
        }
        return 'Ethiopia';
      },
      get iso_name() {
        if (config.language === 'fr') {
          return 'République Fédérale Démocratiqued’Ethiopie';
        }
        return 'Federal Democratic Republic of Ethiopia';
      },
      get short_name() {
        return this.name;
      },
      slug: 'ethiopia',
      lang: 'en',
      published: true
    },
    {
      iso_code: 'KE',
      name: 'Kenya',
      get iso_name() {
        if (config.language === 'fr') {
          return 'République du Kenya';
        }
        return 'Republic of Kenya';
      },
      short_name: 'Kenya',
      slug: 'kenya',
      lang: 'en',
      published: true
    },
    {
      iso_code: 'NG',
      get name() {
        if (config.language === 'fr') {
          return 'Nigéria';
        }
        return 'Nigeria';
      },
      get iso_name() {
        if (config.language === 'fr') {
          return 'République Fédérale du Nigéria';
        }
        return 'Federal Republic of Nigeria';
      },
      get short_name() {
        return this.name;
      },
      slug: 'nigeria',
      lang: 'en',
      published: true
    },
    {
      iso_code: 'SN',
      get name() {
        if (config.language === 'fr') {
          return 'Sénégal';
        }
        return 'Senegal';
      },
      get iso_name() {
        if (config.language === 'fr') {
          return 'République du Sénégal';
        }
        return 'Republic of Senegal';
      },
      get short_name() {
        return this.name;
      },
      slug: 'senegal',
      lang: 'fr',
      published: true
    },
    {
      iso_code: 'ZA',
      get name() {
        if (config.language === 'fr') {
          return 'Afrique du Sud';
        }
        return 'South Africa';
      },
      get iso_name() {
        if (config.language === 'fr') {
          return 'Republic of South Africa';
        }
        return 'République sud-africaine';
      },
      get short_name() {
        return this.name;
      },
      slug: 'south-africa',
      lang: 'en',
      published: true
    },
    {
      iso_code: 'TZ',
      get name() {
        if (config.language === 'fr') {
          return 'Tanzanie';
        }
        return 'Tanzania';
      },
      get iso_name() {
        if (config.language === 'fr') {
          return 'Tanzanie, République-Unie de';
        }
        return 'Tanzania, United Republic of';
      },
      get short_name() {
        return this.name;
      },
      slug: 'tanzania',
      lang: 'en',
      published: true
    },
    {
      iso_code: 'UG',
      get name() {
        if (config.language === 'fr') {
          return 'Ouganda';
        }
        return 'Uganda';
      },
      get iso_name() {
        if (config.language === 'fr') {
          return 'République de l’Ouganda';
        }
        return 'Republic of Uganda';
      },
      get short_name() {
        return this.name;
      },
      slug: 'uganda',
      lang: 'en',
      published: true
    },
    {
      iso_code: 'ZM',
      get name() {
        if (config.language === 'fr') {
          return 'Zambie';
        }
        return 'Zambia';
      },
      get iso_name() {
        if (config.language === 'fr') {
          return 'République de Zambie';
        }
        return 'Republic of Zambia';
      },
      get short_name() {
        return this.name;
      },
      slug: 'zambia',
      lang: 'en',
      published: true
    }
  ],
  settings: {
    mailingList: {
      href:
        'https://sibforms.com/serve/MUIEAAXyVOKndq92iptN5nNOxxO8YIbsJQ6GRLFcss45EFC4D-346vXQNHit8uLluJ44jcDUNQztzGSQSX3H_AHE7J71-tlgBI4-cS6dnZrjzgxQxnK2Hd89yCpi_SJDZyUAKo9GGBNqQmbJEgpCInlf403iFzCqHf75RaNFWuGd73QH6yNWhnvrmDGgj3N_DcbUt3GLDzcm_wIP'
    },
    navigation: {
      country_analysis:
        '<div class="rich-text"><p>Actionable analysis by geo-political and socioeconomic experts across 10 African countries.</p></div>',
      data_by_topic:
        '<div class="rich-text"><p>Key Human Development metrics curated and visualised across 10 African countries.</p></div>'
    },
    support: {
      hello: 'hello@takwimu.africa',
      support: 'support@takwimu.africa'
    },
    socialMedia: {
      facebook: 'https://facebook.com/TakwimuAfrica',
      twitter: 'https://twitter.com/TakwimuAfrica',
      medium: 'https://medium.com/@takwimu_africa',
      linkedin: 'https://www.linkedin.com/company/takwimu-africa/'
    },
    address: {
      locality: 'Westlands',
      region: 'Nairobi',
      country: 'Kenya',
      postalCode: '00100'
    }
  },
  page: {},
  name: 'Takwimu',
  description:
    'Data driven analysis on development policies, programmes & outcomes in 10 African countries.',
  media: {
    imageUrl: 'https://takwimu.s3.eu-west-1.amazonaws.com/media/images',
    imageType: '.png'
  },
  populationTables: [
    'allPopulationSex2006S',
    'allPopulationSex2011S',
    'allPopulationSex2012S',
    'allPopulationSex2013S',
    'allPopulationSex2019S',
    'allPopulationResidence2012S',
    'allPopulationResidence2013S',
    /**
     * Countries have their populations in `allTotalPopulations`
     * Make sure we retrieve the latest population total
     */
    [
      'allTotalPopulations',
      {
        orderBy: 'TOTAL_POPULATION_YEAR_DESC',
        first: 1
      }
    ]
  ],
  stories: {
    url: 'https://medium.com/@takwimu_africa'
  }
};

if (typeof document !== 'undefined') {
  // Same-Origin Policy
  document.domain = window.location.hostname;
}

export default config;
