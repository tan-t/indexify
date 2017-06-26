var fs = require('fs');
var path = require('path');
module.exports = function(folders){
  var defer = Promise.defer();
  fs.readFile(path.join(__dirname,'./resources/dummy.json'),{encoding:'utf-8'},function(err,data){
    if(err){
      defer.reject(err);
      return;
    }
    var res = JSON.parse(data);
    res.tickets.forEach(ticket=>{
      ticket.redmine_url = `http://renovation/redmine/issues/${ticket.id}`;
    });
    defer.resolve(res);
  });
  return defer.promise;
}
