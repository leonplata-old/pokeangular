'use strict';

var nodeStatic = require('node-static');

// Create a node-static server instance to serve the './public' folder
var file = new nodeStatic.Server('./public');
var port = 5000;

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response);
  }).resume();
}).listen(port, function () {
  console.log('server started at ' + port);
});