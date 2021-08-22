let cheerio=require("cheerio");
let request=require("request");
const { fstat } = require("fs");
let issues=require("./issues");
let url="https://github.com/topics";
let original_url="https://github.com";   
function getRepos(url,topics){
    request(url,cb);
    function cb(err,response,html){
        if(err)
        console.log(err);
        else{
            getReposLink(html);
            // console.log(html);
        }
    }   
    function getReposLink(html){
        let $=cheerio.load(html);
        let headings_arr= $(".f3.color-text-secondary.text-normal.lh-condensed");
        for(let i=0;i<8;i++){
            let two_anchors=$(headings_arr[i]).find("a");
            let link=$(two_anchors[1]).attr("href");
            let full_link=`https://github.com${link}/issues`;
            issues(full_link,topics);
        }
    }
}
module.exports=getRepos;