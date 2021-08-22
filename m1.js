let cheerio=require("cheerio");
let request=require("request");
let path=require("path");
let fs=require("fs");
const { fstat } = require("fs");
let url="https://github.com/topics";
let original_url="https://github.com";
let repos=require("./GetReposLink");
request(url,cb);
function cb(error,response,html){
    if(error)
    console.log("error from cb");
    else{
        dataextracter(html);     
    }
}
function dataextracter(html){
       let whole_data=cheerio.load(html);
        let three_url=whole_data(".no-underline.d-flex.flex-column.flex-justify-center");
        for(let i=0;i<three_url.length;i++){
            let str_arr=whole_data(three_url[i]).attr('href');
            let topics=str_arr.split("/").pop();
            // console.log(topics);
            let n_str=`https://github.com${str_arr}`;
            repos(n_str,topics);
    }
}
