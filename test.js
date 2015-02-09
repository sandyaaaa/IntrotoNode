var buffer = '';
var fs = require('fs');
fs.readFile('./file1.txt', function(err, data) {
     buffer = data.toString();  // buffer object
	 console.log(buffer);
});
