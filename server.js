var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express(); //creating express 
var PORT = 3000;
//CRUD--CREATE/READ/UPDATE/DELETE

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);
//listening to port
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});