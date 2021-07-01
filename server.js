let http = require("http");
let fs = require("fs");
let port = 3000;
let ip = "127.0.0.1";

// to respond the request based on the request information
function sendResponse(filename, statusCode, response) {
  fs.readFile(`./${filename}`, (error, data) => {
    if (error) {
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain");
      response.end("error from the server");
    } else {
      response.statusCode = statusCode;
      response.setHeader("Content-Type", "text/html");
      response.end(data);
    }
  });
}

let server = http.createServer((request, response) => {
  //to identify the user's request on which page the user wanted
  let method = request.method;
  let url = request.url;
  let requestUrl = new URL(url, `http://${ip}:${port}`);
  let lang = requestUrl.searchParams.get("lang");
  url = requestUrl.pathname;
  let selector = "";

  if (lang === "en" || lang === "") {
    selector = "";
  } else if (lang === "zh") {
    selector = "-zh";
  } else {
    selector = "";
  }

  if (method === "GET") {
    if (url === "/") {
      sendResponse(`index${selector}.html`, 200, response);
    } else if (url === "/about.html" || url === "/about") {
      sendResponse(`about${selector}.html`, 200, response);
    } else {
      sendResponse(`404${selector}.html`, 404, response);
    }
  }
});

server.listen(port, ip, () => {
  console.log(`the server is running at: http://${ip}:${port}`);
});
