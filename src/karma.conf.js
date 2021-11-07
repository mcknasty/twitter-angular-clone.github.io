// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-verbose-reporter')
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      captureConsole: true,
      mocha: {
        bail: true
      }
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage/twitter-clone'),
      reports: ['html', 'lcovonly', 'text'],
      fixWebpackSourcePaths: true
    },
    browserConsoleLogOptions: {
      terminal: true,
      level: ""
    },
    reporters: ['progress', 'kjhtml', 'coverage-istanbul', "verbose"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_LOG,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    restartOnFileChange: true
  });
};
