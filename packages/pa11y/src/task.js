const pa11yLib = require("pa11y");
const puppeteer = require("puppeteer");

const pa11y = (callback) => async ({ url, opts }) => {
  console.log("cy.pa11y()", "Inside pa11y function");
  
  const browser = await puppeteer.connect({
    browserURL: `http://localhost:${global.cypress_audit_port}`,
  });
  
  throw new Error(`Connected to browser using puppeteer ${browser}`);

  const results = await pa11yLib(url, { browser, runners: ["axe"], ...opts });
  
  throw new Error(`Fetched results ${results}`);

  if (callback) {
    callback(results);
  }

  return results.issues || [];
};

module.exports = { pa11y };
