const { join } = require('path');

process.env.NODE_OPTIONS = '--max-old-space-size=8192';
process.env.NODE_ENV = 'production';
process.env.CHROME_BIN = require('puppeteer').executablePath();
Error.stackTraceLimit = 0;
module.exports.conf = {
  basePath: '',
  frameworks: ['jasmine', '@angular-devkit/build-angular'],
  plugins: [
    require('karma-jasmine'),
    require('karma-chrome-launcher'),
    require('karma-jasmine-html-reporter'),
    require('@angular-devkit/build-angular/plugins/karma'),
    require('karma-verbose-reporter'),
    require('karma-typescript'),
    require('karma-coverage')
  ],
  preprocessors: {
    '**/*.ts': ['karma-typescript', 'coverage'],
    '**/*.js': 'coverage'
  },
  client: {
    clearContext: false, // leave Jasmine Spec Runner output visible in browser
    captureConsole: true,
    jasmine: {
      random: true,
      seed: '4321',
      oneFailurePerSpec: true,
      stopOnSpecFailure: true,
      timeoutInterval: 180000
    }
  },
  coverageReporter: {
    dir: require('path').join(__dirname, '../../.coverage'),
    subdir: '.',
    reporters: [],
    fixWebpackSourcePaths: true
  },
  browserConsoleLogOptions: {
    terminal: true,
    level: ''
  },
  port: 9876,
  colors: true,
  autoWatch: true,
  browsers: ['ChromeHeadless'],
  concurrency: 3,
  singleRun: false,
  customLaunchers: {
    WindowsChrome: {
      base: 'Chrome',
      chromeDataDir: 'D:\\'
    },
    ChromeHeadless: {
      base: 'Chrome',
      flags: [
        '--headless',
        '--disable-gpu',
        '--no-sandbox',
        '--remote-debugging-port=9222'
      ],
      browserDisconnectTimeout: 280000,
      browserNoActivityTimeout: 280000,
      browserDisconnectTolerance : 3
    }
  }
  /**                          ** /
  restartOnFileChange: true,
  browserDisconnectTimeout : 10000,
  browserDisconnectTolerance : 10,
  browserDisconnectTolerance : 1,
  captureTimeout : 4*60*1000
  /**                          **/
};

