let cheerio = require("cheerio");
let request = require("request");
let path = require("path");
let fs = require("fs");
let pdfkit=require("pdfkit");
const { fstat } = require("fs");

function getIssues(url, topics) {
  request(url, cb);

  function cb(err, response, html) {
    if (err) console.log(err);
    else {
      let file_name = "" + url;
      file_name = file_name.split("/");
      getFinalIssues(html, file_name[file_name.length - 2]);
    }
  }

  function getFinalIssues(html, file_name) {
    let $ = cheerio.load(html);
    let issues_arr = $(
      ".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title"
    );
    let arr = [];
    for (let i = 0; i < issues_arr.length; i++) {
      let link = $(issues_arr[i]).attr("href");
      // console.log(link);
      arr.push(`https://github.com/${link}`);
      let folder_path = path.join(process.cwd(), topics);
      if (!fs.existsSync(folder_path)) {
        fs.mkdirSync(folder_path);
      }
      let file_path = path.join(folder_path, file_name + ".pdf");
      let text= JSON.stringify(arr);
      let pdfDoc=new pdfkit();
      pdfDoc.pipe(fs.createWriteStream(file_path));
      pdfDoc.text(text);
      pdfDoc.end();
    //   fs.writeFileSync(file_path,);
    }
  }
}
module.exports = getIssues;
