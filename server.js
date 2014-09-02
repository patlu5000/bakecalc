var express = require('express');
var app = express();

app.use(express.static(__dirname));

var port = process.env.PORT || 5000;
var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});

