var fs = require('fs');
var path = require('path');
var clui = require('clui');
var Progress = clui.Progress;
var clear = require('clear');

module.exports = function(folders){
  var requests = ['dummy','dummy_2','dummy_3','dummy_4'];
  var progressSize = 60;
  var progress = new Progress(progressSize);
  var defers = requests.map(re=>Promise.defer());
  var perRequest = 1/requests.length;
  let offset = 0;
  animate(progress,offset);
  requests.forEach((request,index)=>{
    var defer = defers[index];
    setTimeout(function(){
      fs.readFile(path.join(__dirname,`./resources/${request}.json`),{encoding:'utf-8'},function(err,data){
        if(err){
          defer.reject(err);
          return;
        }
        var res = JSON.parse(data);
        res.tickets.forEach(ticket=>{
          ticket.redmine_url = `http://renovation/redmine/issues/${ticket.id}`;
        });
        offset += perRequest;
        if(index === requests.length -1){
          offset = 1;
        }
        animate(progress,offset);
        defer.resolve(res);
      });
    },300 * index);
  });
  return Promise.all(defers.map(defer=>defer.promise));
}

var animate = function(progress,offset){
  process.stdout.clearLine();  // clear current text
  process.stdout.cursorTo(0);  // move cursor to beginning of line
  var text = 'loading...';
  if (offset === 1) {
      text = 'complete!';
  }
  process.stdout.write(`${text}\t${progress.update(offset)}`);  // write text
}
