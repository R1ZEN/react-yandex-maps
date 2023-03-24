// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config();
require('./scripts/create-robots-txt');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React Yandex Maps',
  tagline: 'React Yandex Maps',
  url: process.env.BASE_URL || 'https://example.com/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  trailingSlash: true,

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo-landscape.png',
      metadata: [
        {
          name: 'keywords',
          content: 'react-yandex-maps, @pbe/react-yandex-maps, yandex-maps',
        },
        process.env.YANDEX_VERIFICATION && {
          name: 'yandex-verification',
          content: process.env.YANDEX_VERIFICATION,
        },
      ].filter(Boolean),
      navbar: {
        title: 'React Yandex Maps',
        logo: {
          alt: 'React Yandex Maps Logo',
          src: 'img/logo.svg',
          width: 32,
          height: 32,
        },
        items: [
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            label: 'Yandex Maps API',
            href: 'https://yandex.com/dev/maps/jsapi/doc/',
            position: 'right',
          },
          {
            href: 'https://github.com/R1ZEN/react-yandex-maps',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} React Yandex Maps`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  plugins: [
    process.env.GOOGLE_ANALYTIC_ID && [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: process.env.GOOGLE_ANALYTIC_ID,
        anonymizeIP: false,
      },
    ],
    process.env.YANDEX_METRIKA_ID && [
      'docusaurus-plugin-yandex-metrica',
      {
        counterID: process.env.YANDEX_METRIKA_ID,
      },
    ],
  ].filter(Boolean),
};

module.exports = config;
