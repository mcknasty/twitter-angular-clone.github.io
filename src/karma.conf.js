// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
let reporters = ['progress', 'kjhtml', 'coverage-istanbul', "verbose"];
var hflag = (typeof HEADLESS == undefined) ? false : true;
process.env.CHROME_BIN = (hflag) ? require('puppeteer').executablePath() : '/mnt/c/Program Files/Google/Chrome/Application/chrome.exe'

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
      require('karma-verbose-reporter'),
      require('karma-typescript'),
      require('karma-sourcemap-loader'),
      require('karma-coverage'),
      require('karma-scss-preprocessor')
    ],
    preprocessors: {
      'src/**/*': ['sourcemap', 'coverage'],
      'test/**/*': ['sourcemap'],
      "**/*.ts": "karma-typescript",
      '**/*.js': ['sourcemap'],
      'src/**/*.scss': ['scss']
    },
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
    reporters: reporters,
    port: 9876,
    colors: true,
    logLevel: config.LOG_LOG,
    autoWatch: true,
    browsers: ['ChromeHeadless', 'WindowsChrome'],
    customLaunchers: {
      WindowsChrome: {
        base: 'Chrome',
        chromeDataDir: 'D:\\'
      }
    },
    singleRun: false,
    restartOnFileChange: true
  });
};
