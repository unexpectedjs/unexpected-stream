/*global unexpected:true*/
unexpected = require('unexpected').clone()
    .use(require('../lib/unexpectedStream'));

unexpected.output.preferredWidth = 80;
