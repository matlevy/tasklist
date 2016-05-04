var express = require("express");
var app = express();

app.use( '/angular', express.static("node_modules/angular") );
app.use( '/moment', express.static("node_modules/moment") );
app.use( '/requirejs', express.static("node_modules/requirejs") );

app.use( '/', express.static('app') );

app.listen( 3000, function(){
	console.log( "listening on port 3000");
});