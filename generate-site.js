/*global global*/
var argv = require('minimist')(process.argv.slice(2));

global.require = require;
var unexpected = require('unexpected').clone().installPlugin(require('./lib/unexpectedStream'));
unexpected.output.preferredWidth = 80;
var generator = require('unexpected-documentation-site-generator');
argv.unexpected = unexpected;
generator(argv);
