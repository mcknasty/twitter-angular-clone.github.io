// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const { conf } = require('./karma-conf-obj');
let reporters = ['coverage', 'fail-fast'];
conf.reporters = reporters;
conf.failOnFailingTestSuite = true;
conf.failOnSkippedTests = true;
module.exports = function (config) {
  config.LOG_LOG = 'WARN';
//  config.LOG_LOG = 'OFF';
//  config.failOnFailingTestSuite = true;
//  config.failOnSkippedTests = true;
  (conf.logLevel = config.LOG_LOG), config.set(conf);
};
