var express = require('express');
var app = express();

app.use(express.static(__dirname));

// var server = app.listen(4000, function() {
//   console.log('Listening on port %d', server.address().port);
// });

var port = process.env.PORT || 5000; // Use the port that Heroku provides or default to 5000
app.listen(port, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});