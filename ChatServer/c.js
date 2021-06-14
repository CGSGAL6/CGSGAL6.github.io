const http = require("http");
const fs = require('fs').promises;
const host = 'localhost';
const port = 8000;
let cFile;

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(cFile);
};

const server = http.createServer(requestListener);

fs.readFile("z:/fractal/CGSGAL6.github.io/index.html")
    .then(contents => {
        cFile = contents;
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
    });