// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const { conf } = require('./karma-conf-obj');
let reporters = ['coverage', 'progress'];
conf.reporters = reporters;
conf.logLevel = 'WARN';
conf.coverageReporter.reporters.push({ type: 'text-summary' });
module.exports = function (config) {
  const c = {};
  Object.assign(c, config, conf);
  config.set(c);
};
