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
    /**                 **/
    jasmine: {
      random: true,
      seed: '4321',
      oneFailurePerSpec: true,
      stopOnSpecFailure: true,
      timeoutInterval: 180000
    }
  },
  coverageReporter: {
    dir: require('path').join(__dirname, '../coverage'),
    subdir: '.',
    reporters: [
      { type: 'lcovonly' },
      { type: 'text-summary' },
      { type: 'text' }
    ],
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
      ]
    }
  },
  concurrency: 3,
  singleRun: false,
  browserDisconnectTimeout: 180000,
  browserNoActivityTimeout: 180000
  //restartOnFileChange: true,
  /**                          ** /
  browserDisconnectTimeout : 10000,
  browserDisconnectTolerance : 10,
  browserNoActivityTimeout : 4*60*1000,
  //browserNoActivityTimeout: 9000,

  browserDisconnectTimeout : 10000,
  browserDisconnectTolerance : 1,
  //browserNoActivityTimeout : 4*60*1000,
  //captureTimeout : 4*60*1000
  /**                          **/
};

// per https://pptr.dev/guides/configuration
// module.exports.cacheDirectory = join('~', 'project', '.cache', 'puppeteer');

