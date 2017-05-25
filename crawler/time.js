var main=require("./index.js");
var CronJob=require("cron").CronJob;

new CronJob('00 */1 * * * *',function(){
    process.send("爬取中...");
    index();
},null,true,'America/Los_Angeles')