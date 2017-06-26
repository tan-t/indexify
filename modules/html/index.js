const Hogan = require('hogan.js');
const fs = require('fs');
const path = require('path');
var template = Hogan.compile(fs.readFileSync(path.join(__dirname,'./resources/template.html'),{encoding:'utf-8'}));
module.exports = function(arg){
  var html = template.render(arg);
  return html;
};
