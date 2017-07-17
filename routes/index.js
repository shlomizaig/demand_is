var express = require('express');
var router = express.Router();
var fs = require("fs");
http = require ("http");

var url = 'http://export.apprevolve.com/v2/getAds?accessKey=314fb885c767&secretKey=14b1e26c569c160d29899a8293154580&applicationKey=5a46b52d';
var filename = "./public/getAds.json";

function fetchDeals(cb)
{ 
    if ( fs.existsSync(filename) )
    {
      var s = fs.readFileSync(filename);
      console.log(s.length);
      cb(s);
      return;
    }
    else
     console.log("no found");
    return; 
    http.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
      body += chunk;
    });

    res.on('end', function(){
      //fs.writeFileSync(filename,body);
      var isResponse = JSON.parse(body);
      
      cb(isResponse);
      //buildhtml(isResponse);
    });
    }).on('error', function(e){
       console.log("Got an error: ", e);
       cb("ERROR");
    });
}

var stt={};
function stats(obj)
{
    if( ! Array.isArray(obj) )
      obj = [obj];
    obj.forEach(function(o){
        stt[o] = stt[o]?stt[o]+1:1;
    });
}

function buildhtml(obj,res)
{
   //var fs = require('fs');  // file system
   var wstream = res;//fs.createWriteStream('./all.html');
   wstream.write("<html>");
   obj.ads.forEach(function(el) {
       var str = "<div> <h3>"+ el.title+ "</h3><br><b>"+el.geoTargeting+"</b> <img src =\"" + el.creatives[0].url + "\"<img></div>";
      // stats(el.geoTargeting);
       stats(el.bid);
       wstream.write(str);
   });
   wstream.write("</html>");
   wstream.close();
   console.log("done:",stt);
}





/* GET home page. */
router.get('/', function(req, res, next) {
  var s = fs.readFileSync(filename);
  //fetchDeals(function(text){
  //   buildhtml(text,res);
  //});
  //res.render('index', { title: 'Express' });
});

module.exports = router;
