// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
let { conf } = require('./karma-conf-obj');
let reporters = ['coverage', 'verbose', 'progress'];
conf.reporters = reporters;
conf.logLevel = 'INFO';
conf.coverageReporter.reporters.push({ type: 'text-summary' });
conf.coverageReporter.reporters.push({ type: 'text' });
module.exports = function (config) {
  const c = {};
  Object.assign(c, config, conf);
  config.set(c);
}

