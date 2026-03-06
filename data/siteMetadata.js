/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Prasanth Panneer Selvam',
  author: 'Prasanth Panneer Selvam',
  headerTitle: 'Azure Cloud Engineer',
  description:
    'Azure Cloud Engineer specializing in secure infrastructure, monitoring, and cloud security on Microsoft Azure.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://prasanth-portfolio-blond.vercel.app',
  siteRepo: 'https://github.com/Prasanth0809/prasanth-portfolio',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  mastodon: 'https://mastodon.social/@mastodonuser',
  email: 'prasanthp.080902@gmail.com',
  github: 'https://github.com/Prasanth0809',
  linkedin: 'https://www.linkedin.com/in/prasanthpanneer',
  locale: 'en-US',

  // set to true if you want a navbar fixed to the top
  stickyNav: false,

  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },

  newsletter: {
    provider: 'buttondown',
  },

  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },

  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
