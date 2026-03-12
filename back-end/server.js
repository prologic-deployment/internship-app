



const https = require("https");
// const http = require("http");
const app = require("./app");
const fs = require("fs");

const options={
    key: fs.readFileSync('./cert/prologic.key'),
    cert:fs.readFileSync('./cert/prolo-cert.pem')
}

const port = process.env.PORT;
app.set("port", port);
// const server = http.createServer(app);
const server = https.createServer(options,app);
server.listen(port, () => console.log("listening on port ", port));
