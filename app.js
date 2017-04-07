// dependencies
var http = require("http");
var express = require("express");
var app = express();
var path = require('path')
var bodyParser = require('body-parser');
var guid = require('guid');


// init the view engine
app.set('view engine', 'ejs');


// set up body parser for parsing requests and
// configure router.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(app.router);


// setup public folder access to the css and
// js can be served
app.use(express.static('public'))


app.get("/", function (req, res) {
  res.render("index", {
    result: getGUIDs(1).join("\n")
  });
});


app.post("/", function (req, res) {

  // get the count for how many GUIDs to create
  let count = req.body.count == undefined ?
              1 : req.body.count;
              
  res.render("index", {
    count: count,
    result:getGUIDs(count).join("\n")
   });
});


app.get('/api/get', function(req, res) {
  res.json({
    result: getGUIDs(req.query.count == undefined ?
                     1 : req.query.count)
  });
});


var getGUIDs = function (count) {
  return new Array(parseInt(count)).fill("").map(function () {
    return "{" + guid.create().value + "}";
  });
}



// start server
http.createServer(app).listen(8081);
