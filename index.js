var path = require('path');
var ghost = require('ghost');
var async = require('async');
var fs = require('fs');
var mkdirp = require('mkdirp');

function createBuiltDir(callback) {
  mkdirp(__dirname + '/node_modules/ghost/core/built', function(err) {
    callback(err);
  });
}

function createSymlinks(callback) {
  var items = [
    {
      src: __dirname + '/content/assets',
      dest: __dirname + '/node_modules/ghost/core/built/assets'
    },
    {
      src: __dirname + '/content/views/default.hbs',
      dest: __dirname + '/node_modules/ghost/core/server/views/default.hbs'
    }
  ];
  function makeSymlink(item, cb) {
    fs.link(item.src, item.dest, function(err) {
      if (err && err.code !== 'EEXIST') {
        // We ignore this error, because it happens all the time in development.
        cb(err);
        return;
      }
      cb();
    });
  }
  async.map(items, makeSymlink, function(err, res) {
    callback(err);
  });
}

function startServer(callback) {
  ghost({
    config: path.join(__dirname, 'config.js')
  }).then(function (ghostServer) {
    ghostServer.start();
    callback();
  }).catch(function (err) {
    callback(err);
  });
}

async.series([createBuiltDir, createSymlinks, startServer], function(err, res) {
  if (err) {
    throw err;
  }
});
