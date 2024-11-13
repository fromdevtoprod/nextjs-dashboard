import { defineConfig } from "cypress";
// Populate process.env with values from .env file
require("dotenv").config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {
    googleRefreshToken: process.env.AUTH_GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.AUTH_GOOGLE_ID,
    googleClientSecret: process.env.AUTH_GOOGLE_SECRET,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
