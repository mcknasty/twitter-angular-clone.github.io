// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const { conf } = require('./karma-conf-obj');
let reporters = ['coverage', 'fail-fast'];
conf.reporters = reporters;
conf.failOnFailingTestSuite = true;
conf.failOnSkippedTests = false;
conf.logLevel = 'FATAL';
conf.plugins.push(require('karma-fail-fast-reporter'))
conf.coverageReporter.reporters.push({ type: 'lcov' });
module.exports = function (config) {
  const c = {};
  Object.assign(c, config, conf);
  config.set(c);
};
