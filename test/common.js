/*global unexpected:true*/
unexpected = require('unexpected').clone()
    .installPlugin(require('../lib/unexpectedStream'));
