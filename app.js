var fs = require('fs');
var express = require('express');
var logger = require('morgan');
var async = require('async');
var ejs = require('ejs')

var filenames = Array.prototype.slice.call(process.argv, 2);
//var socketio = require('socket.io');

var app = express();

app.use(logger('dev'));


app.set('view engine', 'ejs');
var server = app.listen(6543);



app.get('/', function (request, response) {


  var mapFilenamesToContent = function(filename, callback) {
        fs.readFile(filename, 'utf8', function(err, data){
              if (data== undefined) data= "";
              callback(null,{ id: filename.replace(/[^0-9]/ig, ""),
              data: data.toString(),
              filename: filename
          })
      });    
  };

  async.map(filenames, mapFilenamesToContent, function (err, results) {
    if (err) console.log('async.map error:', err);  
    response.render( 'mainView', { files: results} );
  });
});
