/*global global*/
var argv = require('minimist')(process.argv.slice(2));

global.require = require;
var unexpected = require('unexpected').clone().installPlugin(require('./lib/unexpectedStream'));
var generator = require('unexpected-documentation-site-generator');
argv.unexpected = unexpected;
generator(argv);
