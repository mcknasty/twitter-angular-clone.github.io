const { conf } = require('./karma-conf-obj');
let reporters = ['coverage', 'fail-fast'];
conf.reporters = reporters;
conf.failOnFailingTestSuite = true;
conf.failOnSkippedTests = false;
conf.logLevel = 'OFF';
conf.plugins.push(require('karma-fail-fast-reporter'))
conf.coverageReporter.reporters.push({ type: 'text' });
module.exports = function (config) {
  const c = {};
  Object.assign(c, config, conf);
  config.set(c);
};