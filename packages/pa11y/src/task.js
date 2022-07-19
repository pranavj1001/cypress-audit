const pa11yLib = require("pa11y");
const puppeteer = require("puppeteer");

const pa11y = (callback) => async ({ url, opts }) => {
//   throw new Error(`Inside pa11y function port ${global.cypress_audit_port}, url ${url}, opts ${opts}, puppeteer.connect ${puppeteer.connect}`);
  
  const browser = await puppeteer.connect({
    browserURL: `http://docker.for.mac.localhost:${global.cypress_audit_port}`,
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
