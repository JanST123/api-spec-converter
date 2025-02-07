'use strict';

var FS = require('fs');
var Path = require('path');

var _ = require('lodash');
var URI = require('urijs');
var YAML = require('js-yaml');
var Promise = require('bluebird');
var traverse = require('traverse');

module.exports.joinPath = function () {
  var argArray = Array.prototype.slice.call(arguments);
  return argArray.join('/').replace(/\/\/+/g, '/')
}

module.exports.parseJSON = Promise.method(JSON.parse);
module.exports.parseYAML = Promise.method(YAML.safeLoad);

function readUrl(url, callback) {
  return new Promise((_resolve, _reject) => {
    fetch({
      url,
      headers: {
        'Accept': 'application/json,*/*',
      }
    }).then(response => {
      response.text().then(text => _resolve(text));
    }, e => _reject(e));

  });



}

function readFile(filename) {
  return Promise.fromCallback(callback => {
    FS.readFile(filename, 'utf8', callback);
  });
}

function readDummy(data) {
  return Promise.resolve(data);
}

module.exports.resourceReaders = {
  url: readUrl,
  file: readFile,
  object: readDummy,
  string: readDummy,
};

module.exports.getSourceType = function (source) {
  if (_.isObject(source))
    return 'object';
  if (!_.isString(source))
    return undefined;

  // windows resolved paths look like absolute URLs,
  // so check for file existence.
  try {
    // FIXME: existsSync fails in browser
    if (FS.existsSync(source)) return 'file';
  } catch (e) {}

  var uri = new URI(source);
  if (uri.is('absolute'))
    return 'url';
  else if (uri.is('relative'))
    return 'file';
  else
    return 'string';
};

module.exports.removeNonValues = function (obj) {
  traverse(obj).forEach(function (value) {
    if (value === undefined)
      this.remove();
  });
}
