var express = require("express");
var app = express();


app.use(app.router);
app.use(express.static(__dirname + "/"));


app.listen( '7777', 'localhost' );



var io = require('socket.io').listen(9999);
var when = require('when'); // you can use any other http://promises-aplus.github.io/promises-spec/ compliant library
var rpc = require('socket.io-rpc');

rpc.createServer(io, app);

rpc.expose('myChannel', {
    chat : function( obj ) {
    	var res = obj.mssg + " recived";
    	
    	console.log( "**************", res, "********************" );

    	return res;
    }
});




io.sockets.on('connection', function (socket) {
    rpc.loadClientChannel(socket,'ClientChannel').then(function (fns) {
        
        setTimeout(function(){
	        fns.fnOnClient("calling client ").then(function (ret) {
	            console.log("client returned: " + ret);
	        });
        }, 4000);

    });

});


