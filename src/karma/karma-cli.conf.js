// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const { conf } = require('./karma-conf-obj');
let reporters = ['coverage', 'verbose'];
conf.reporters = reporters;
module.exports = function (config) {
  config.LOG_LOG = 'OFF';
  (conf.logLevel = config.LOG_LOG), config.set(conf);
};
