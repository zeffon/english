/* eslint-disable no-restricted-globals */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'English',
  url: 'https://english.zeffon.cn',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ZH-cn',
    locales: ['ZH-cn']
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/zeffon/english'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ],
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        debug: false,
        docs: {
          id: 'symbol',
          path: 'symbol',
          routeBasePath: 'symbol',
          sidebarPath: require.resolve('./sidebarsSymbol.js')
        },
        blog: false,
        pages: false,
        sitemap: false,
        theme: {
          id: 'symbol',
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'English',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg'
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'docs',
          //   position: 'left',
          //   label: 'Docs'
          // },
          {
            to: '/symbol',
            position: 'left',
            label: '音标',
            activeBaseRegex: `/symbol/`
          },
          {
            type: 'docSidebar',
            sidebarId: 'marking',
            position: 'left',
            label: '语音标记'
          },
          {
            href: 'https://github.com/zeffon/english',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © 2022-present Zeffon Wu.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
}

module.exports = config
