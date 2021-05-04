const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
const webpack = require("webpack");
const path = require("path");

/* module.exports = {
  exportPathMap: function() {
    return {
      "/locales/de-DE/summer-dress-f": {
        page: "/locales/[locale]/[slug]",
        query: { locale: "de-DE", slug: "summer-dress-f" }
      }
    };
  }
}; */ 
module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/home' },
      '/auth/login': { page: '/auth/login' },
      '/auth/register': { page: '/auth/register' },
      '/admin/dashboard': { page: '/admin/dashboard' },
      '/admin/candidatures': { page: '/admin/candidatures' },
      '/recruiter/dashboard': { page: '/recruiter/dashboard' },
      '/recruiter/profil': { page: '/recruiter/profil'},
      '/recruiter/missions': { page: '/recruiter/missions'},
      '/user/dashboard': { page: '/user/dashboard'},
      '/user/profil': { page: '/user/profil'},
      '/user/editcv': { page: '/user/editcv'},
      '/user/viewcv': { page: '/user/viewcv'},

    }
  },
}

module.exports = {
  trailingSlash: true,
}

module.exports = {
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
}

module.exports = withFonts(
  withCSS(
    withImages(
      withSass({
        webpack(config, options) {
          config.module.rules.push({
            test: /\.(eot|ttf|woff|woff2)$/,
            use: {
              loader: "url-loader",
            },
          });
          config.resolve.modules.push(path.resolve("./"));
          return config;
        },
      })
    )
  )
);

