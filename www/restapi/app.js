var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();
const https = require('https');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

//var server = app.listen(7000, function () {
//    console.log("app running on port.", server.address().port);
//});


https.createServer({
    key: fs.readFileSync('../../ssl/weku.key'),
    cert: fs.readFileSync('/etc/ssl/certs/weku.crt')
    
}, app)
.listen(7000);
