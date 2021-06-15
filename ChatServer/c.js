const http = require("http");
const fs = require('fs').promises;

// requests handle
let messages = [];

const requestListener = function (req, res) {
    console.log(
        `Request: ${req.method}, ${req.url}.`
    );

    if (req.url === "/") {
        console.log(`${__dirname}/c.css`);
        fs.readFile(`${__dirname}/c.html`)
            .then((html_content) => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(html_content);
            });
    } else if (req.url.endsWith(".css")) {
        fs.readFile(`${__dirname}/c.css`)
            .then((css_content) => {
                res.setHeader("Content-Type", "text/css");
                res.writeHead(200);
                res.end(css_content);
            });
    } else if (req.url === "/msg" && req.method === "POST") {
        let data = "";
        req.once('data', chunk => {
            data += chunk;
        })
        req.once('end', () => {
            let new_msg = JSON.parse(data);
            messages.push(new_msg);
            console.log(`New msg added - { name: "${new_msg.name}", message: "${new_msg.message}" }.`);
            res.end();
        })
    } else if (req.url === "/msg" && req.method === "GET") {
        res.setHeader("Content-Type", "text");
        res.writeHead(200);
        res.end(JSON.stringify(messages));
    } else {
        res.writeHead(500);
        res.end("Error, unsupported");
        return;
    }
};

// creating server
const port = 8000;
const server = http.createServer(requestListener);
server.listen(port);