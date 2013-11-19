/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser("_TNGYz9W_SWcMPkS92yLC2yycpkk9gb5sny9JFvwimPu7Ad49EagAt9SLiLrPrcQpYwXXzmtXiK6ADPhc9gakDMoKTmbZZbe7DuTipfB3UuMr_jbQhroPcbsKiqsqpWo"));
    app.use(express.session());
    app.use(app.router);

    app.use(function(req, res, next){
        console.log("%s", req.method);
        next();
    });
    app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
    app.use(express.static(path.join(__dirname, 'public')));
    //app.dynamicHelpers({
    //    scripts: function(){
    //        return ['/js/jquery-1.10.min.js'];
    //    }
    //});


});
// development only
app.configure(function(){
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }
});


//if ('production' == app.get('env')) {
//  app.use(express.errorHandler());
//}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
