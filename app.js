var fs = require('fs');
var express = require('express');
var logger = require('morgan');
var async = require('async');
var ejs = require('ejs')




// take a list of files from the command line.
// now we can watch three files using:
// node app.js file1.js file2.js file3.js
var filenames = Array.prototype.slice.call(process.argv, 2);
//var socketio = require('socket.io');


// create the express app
var app = express();

// connect the Morgan logging middleware to our app
app.use(logger('dev'));


app.set('view engine', 'ejs');


// start a server listening on port 1234
var server = app.listen(6543);
//var io = socketio.listen( server );




app.get('/', function (request, response) {


  var mapFilenamesToContent = function(filename, callback) {
       //fs.readFile(filename, function(err, data) {
       //     return callback(null, data.toString());
       // });

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
    //response.send( '<pre>' + results.join("\n\n") + '</pre>' );
    response.render( 'mainView', { files: results} );
  });



});



// PART 1 
// when someone requests http://localhost:1234/, run the callback
// function listed here and respond with the data
// we call this the "/" (or "Root") route.

/*
app.get("/", function(request, response) {
    response.writeHead(200, {
        "Content-Type": "text/css"
    });
    for (var i = 0; i < filenames.length; i++) {
        var data_str = "";


        fs.readFile(filenames[i], function(err, data) {
            response.write("\n" + data.toString() + "\n");
        });

    }
    if (i == filenames.length - 3) {
        response.end();
    }


});
*/