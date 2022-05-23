var fs = require('fs');
module.exports = eval(fs.readFileSync('./src/karma.conf.js')+'');
