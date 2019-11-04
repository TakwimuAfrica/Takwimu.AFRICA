const config = {
  url:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://takwimu.africa',
  WP_BACKEND_URL:
    process.env.NODE_ENV === 'development'
      ? 'https://takwimutech.wpengine.com' // TODO: Need to change this to localhost:8080 but currently localhost has no seed data
      : 'https://takwimutech.wpengine.com',
  WP_HURUMAP_DATA_API:
    process.env.NODE_ENV === 'development'
      ? /**
         * TODO: we need to set this such that we can intercet /flourish request in local dev so that we can test iframe downloads
         */
        'https://takwimutech.wpengine.com/wp-json/hurumap-data'
      : 'https://takwimutech.wpengine.com/wp-json/hurumap-data',
  country: {},
  countries: [
    {
      iso_code: 'BF',
      name: 'Burkina Faso',
      iso_name: 'Burkina Faso',
      short_name: 'Burkina Faso',
      slug: 'burkina-faso',
      published: true
    },
    {
      iso_code: 'CD',
      name: 'Democratic Republic of Congo',
      iso_name: 'Congo, the Democratic Republic of the',
      short_name: 'DR Congo',
      slug: 'democratic-republic-of-congo',
      published: true
    },
    {
      iso_code: 'ET',
      name: 'Ethiopia',
      iso_name: 'Ethiopia',
      short_name: 'Ethiopia',
      slug: 'ethiopia',
      published: true
    },
    {
      iso_code: 'KE',
      name: 'Kenya',
      iso_name: 'Kenya',
      short_name: 'Kenya',
      slug: 'kenya',
      published: true
    },
    {
      iso_code: 'NG',
      name: 'Nigeria',
      iso_name: 'Nigeria',
      short_name: 'Nigeria',
      slug: 'nigeria',
      published: true
    },
    {
      iso_code: 'SN',
      name: 'Senegal',
      iso_name: 'Senegal',
      short_name: 'Senegal',
      slug: 'senegal',
      published: true
    },
    {
      iso_code: 'ZA',
      name: 'South Africa',
      iso_name: 'South Africa',
      short_name: 'South Africa',
      slug: 'south-africa',
      published: true
    },
    {
      iso_code: 'TZ',
      name: 'Tanzania',
      iso_name: 'Tanzania, United Republic of',
      short_name: 'Tanzania',
      slug: 'tanzania',
      published: true
    },
    {
      iso_code: 'UG',
      name: 'Uganda',
      iso_name: 'Uganda',
      short_name: 'Uganda',
      slug: 'uganda',
      published: true
    },
    {
      iso_code: 'ZM',
      name: 'Zambia',
      iso_name: 'Zambia',
      short_name: 'Zambia',
      slug: 'zambia',
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
  page: {
    name: 'base',
    first_published_at: '10th April 2019',
    last_published_at: '24th July 2019'
  },
  name: 'Takwimu',
  description:
    'Data driven analysis on development policies, programmes & outcomes in 10 African countries.',
  media: {
    imageUrl: 'https://takwimu.s3.eu-west-1.amazonaws.com/media/images',
    imageRendition: '.width-600',
    imageType: '.png'
  },
  populationTables: [
    'allPopulationSex2006S',
    'allPopulationSex2007S',
    'allPopulationSex2009S',
    'allPopulationSex2011S',
    'allPopulationSex2012S',
    'allPopulationSex2013S',
    'allPopulationSexYears',
    'allPopulationResidence2009S',
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
  document.domain = new URL(config.url).hostname;
}

export default config;
