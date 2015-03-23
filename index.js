var path = require('path');
var ghost = require('ghost');

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

module.exports = startServer;
