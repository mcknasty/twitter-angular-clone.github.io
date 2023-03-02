const { join } = require('path');
const { mkdirSync } = require('fs');

mkdirSync('./.cache/puppeteer', { recursive: true })

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};