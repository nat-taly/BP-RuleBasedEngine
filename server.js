// constants for creating server
const http = require('http');
const {format} = require('date-fns');
const ws = require("ws"); // websockets

//create local server
const hostname = '127.0.0.1';
const port = 3000;

// GLOBAL VARIABLES
const WEBSOCKET_HOST = "ws://demo.sewio.net";
const API_KEY = "17254faec6a60f58458308763";


// LOGIC
const socket = new ws(WEBSOCKET_HOST);

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello World!');
    console.log(format(new Date(), 'dd.MM.yyyy\tHH:mm:ss'));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


socket.on("open", () => {
    console.log("Connection Established!");
    sendSubscribeMessage();
});

socket.on("message", message => {
    showData(message);
});

function sendSubscribeMessage() {
    socket.send(
        '{"headers":{"X-ApiKey":"' +
        API_KEY +
        '"},"method":"subscribe", "resource":"/feeds/"}'
    );
}

function showData(message) {
    var x = JSON.parse(message);
    if(x["body"]["id"] === "22"){
        var str = "{\"tagID\":\"" + x["body"]["id"] + "\",\"posX\":\"" + x["body"]["datastreams"][0]["current_value"] + "\", \"posY\":\"" + x["body"]["datastreams"][1]["current_value"] + "\"}";
        console.log(str);
    }
}


