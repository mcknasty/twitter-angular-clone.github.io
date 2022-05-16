var fs = require('fs');
const { exec } = require("child_process");
var HEADLESS = true;
module.exports = eval(fs.readFileSync('./src/karma.conf.js')+'');
