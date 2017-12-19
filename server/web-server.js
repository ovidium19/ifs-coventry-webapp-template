var express= require('express');
var path = require('path');
var parts=require('./partsController');
var lessMiddleware = require('less-middleware');
var app = express();
var bodyParser = require('body-parser');
var rootPath = path.normalize(__dirname+"/../");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(lessMiddleware(path.join(rootPath,"public"),{force:true}));
app.use(express.static(path.join(rootPath+"public")));
app.get("/data/:source",parts.get);
app.get("*",function(req,res){
    res.sendFile(rootPath+"/index.html");
});
app.listen(process.env.PORT || 8000);
console.log("Listening on port " + process.env.PORT + "...");