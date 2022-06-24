var ws = require("ws");

var server = new ws.Server({
    host: "127.0.0.1",
    port: 6080
});

server.on("connection", function(client) {
    client.on("close", function(reson) {
        console.log("client close:", reson);
    });

    client.on("error", function(err) {
        console.log("client error:", err);
    });

    client.on("message", function(data) {
        client.send(data);
        console.log("client message:", data.toString());
    });
});

server.on("error", function(err) {
    console.log("server close:", err);
});

server.on("headers", function(data) {
    console.log("server headers:", data);
});

