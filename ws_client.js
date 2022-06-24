var ws = require("ws");

var socket = new ws("ws://127.0.0.1:6080");

socket.on("open", function() {
    socket.send("Hello, World!");
});

socket.on("error", function(err) {
    console.log("error:", err);
});

socket.on("close", function(reson) {
    console.log("close:", reson);
});

socket.on("message", function(data) {
    console.log("message:", data.toString());
});
