var express = require('express');
var app     = module.exports = express();
var routes  = require('./routes');
var path    = require('path');
var morgan  = require('morgan');

// Setting up our environment
app.set('views', __dirname + '/views');
app.use(morgan('dev'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

// Our routes | Serving our index and view partials.
app.get('/', routes.index);

app.get('/partials/:name', routes.partials);

// Redirecting all others to the index (HTML 5 history)
app.get('*', routes.index);

// Starting our application server on port 8080
app.listen('7070', function() {
   console.log('Server started on port: ' + 7070);
});