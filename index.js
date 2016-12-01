var express = require('express');
var app = express();
var exports = module.exports = {};

app.get('/*', function(req, res){
  var ip = req.headers['x-forwarded-for'] || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress ||
           req.connection.socket.remoteAddress,
      language = req.headers["accept-language"],
      software = req.headers["user-agent"],
      indexStart = software.indexOf('(') + 1,
      indexFinish = software.indexOf(')');
  var output = {
    "ipaddress": ip,
    "language": language.substr(0, language.indexOf(',', 0)),
    "software": software.substring(indexStart, indexFinish)
  }
  
  
  res.send(output);
});

var server = app.listen(process.env.PORT || 8080, function(){
  console.log('Magic is happening on port 8080');
});

exports.closeServer = function(){
  server.close();
};