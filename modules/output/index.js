const fs = require('fs');

module.exports = function(file,path){
  fs.writeFile(path,file);
}
