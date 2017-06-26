#!/usr/bin/env node
var dir = process.cwd();
require('../modules/directory_crawler')(dir).then(res=>{
  require('../modules/ticket_finder')().then(function(res){
    var data = {tickets:[]};
    res.forEach(response=>data.tickets = data.tickets.concat(response.tickets));
    data.path=dir;
    require('../modules/output')(require('../modules/html')(data),`./${require('object-hash')(new Date(Date.now()))}.html`);
  }).catch(err=>{
    console.error(err);
  });
});
