// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const { conf } = require('./karma-conf-obj');
let reporters = ['coverage'];
conf.reporters = reporters;
module.exports = function (config) {
  (conf.logLevel = config.LOG_LOG), config.set(conf);
};
