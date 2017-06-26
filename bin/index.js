#!/usr/bin/env node
var dir = process.cwd();
require('../modules/directory_crawler')(dir).then(res=>{
  require('../modules/ticket_finder')().then(function(res){
    res.path=dir;
    require('../modules/output')(require('../modules/html')(res),`./${require('object-hash')(new Date(Date.now()))}.html`);
  }).catch(err=>{
    console.error(err);
  });
});
