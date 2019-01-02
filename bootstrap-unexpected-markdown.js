/*global unexpected:true*/
unexpected = require('unexpected');
unexpected.output.preferredWidth = 80;
unexpected = unexpected.clone();
unexpected.use(require('./lib/unexpectedStream'));
