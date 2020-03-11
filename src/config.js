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
  countries: [
    {
      iso_code: 'BF',
      name: 'Burkina Faso',
      iso_name: 'Burkina Faso',
      short_name: 'Burkina Faso',
      slug: 'burkina-faso',
      lang: 'en',
      published: true
    },
    {
      iso_code: 'CD',
      name: 'Democratic Republic of Congo',
      iso_name: 'Congo, the Democratic Republic of the',
      short_name: 'DR Congo',
      slug: 'democratic-republic-of-congo',
      lang: 'en',
      published: true
    },
    {
      iso_code: 'ET',
      name: 'Ethiopia',
      iso_name: 'Ethiopia',
      short_name: 'Ethiopia',
      slug: 'ethiopia',
      lang: 'en',
      published: true
    },
    {
      iso_code: 'KE',
      name: 'Kenya',
      iso_name: 'Kenya',
      short_name: 'Kenya',
      slug: 'kenya',
      lang: 'en',
      published: true
    },
    {
      iso_code: 'NG',
      name: 'Nigeria',
      iso_name: 'Nigeria',
      short_name: 'Nigeria',
      slug: 'nigeria',
      lang: 'en',
      published: true
    },
    {
      iso_code: 'SN',
      name: 'Senegal',
      iso_name: 'Senegal',
      short_name: 'Senegal',
      slug: 'senegal',
      lang: 'fr',
      published: true
    },
    {
      iso_code: 'ZA',
      name: 'South Africa',
      iso_name: 'South Africa',
      short_name: 'South Africa',
      slug: 'south-africa',
      lang: 'en',
      published: true
    },
    {
      iso_code: 'TZ',
      name: 'Tanzania',
      iso_name: 'Tanzania, United Republic of',
      short_name: 'Tanzania',
      slug: 'tanzania',
      lang: 'en',
      published: true
    },
    {
      iso_code: 'UG',
      name: 'Uganda',
      iso_name: 'Uganda',
      short_name: 'Uganda',
      slug: 'uganda',
      lang: 'en',
      published: true
    },
    {
      iso_code: 'ZM',
      name: 'Zambia',
      iso_name: 'Zambia',
      short_name: 'Zambia',
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
  ]
};

if (typeof document !== 'undefined') {
  // Same-Origin Policy
  document.domain = window.location.hostname;
}

export default config;
