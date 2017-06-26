var fs = require('fs');
module.exports = function(dir){
var defer = Promise.defer();
fs.readdir(dir, function(err, files){
    if (err) throw err;
    var folderList = [];
    files.filter(function(file){
        return fs.statSync(file).isDirectory();
    }).forEach(function (file) {
        folderList.push(file);
    });
    defer.resolve(folderList);
  });
  return defer.promise;
}
