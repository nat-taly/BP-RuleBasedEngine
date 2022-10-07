// constants for creating server
const http = require('http');
const {format} = require('date-fns');

const hostname = '127.0.0.1';
const port = 3000;

// GLOBAL VARIABLES
const WEBSOCKET_HOST = "ws://demo.sewio.net";
const PATH_TO_STORE_DATA = "./output.txt";
const API_KEY = "17254faec6a60f58458308763";

// LIBS
const ws = require("ws"); // websockets
const fs = require("fs"); // file system

// LOGIC
const socket = new ws(WEBSOCKET_HOST);
const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello World again!');
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
    //storeToFile(message);
});

function sendSubscribeMessage() {
    socket.send(
        '{"headers":{"X-ApiKey":"' +
        API_KEY +
        '"},"method":"subscribe", "resource":"/feeds/"}'
    );
}

function showData(message){
    console.log(JSON.parse(message));
}