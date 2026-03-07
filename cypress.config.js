const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://uat-ostore.vercel.app',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    responseTimeout: 15000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'reports',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
    },
    setupNodeEvents(on, config) {
      // future plugin hooks
    },
  },
});
