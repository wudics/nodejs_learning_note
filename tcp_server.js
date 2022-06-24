var net = require("net");
var tcppkg = require("./tcp_packer");

var server = net.createServer(function(client) {
    console.log("new client is coming:", client.remoteAddress, client.remotePort);

    client.on("close", function(reson) {
        console.log("close:", reson);
    });

    client.on("error", function(err) {
        console.log("error:", err);
    });

    client.on("data", function(data) {
        var pkg_set = tcppkg.unpack(client, data);
        for (var k in pkg_set) {
            console.log(pkg_set[k]);
        }
    });
});

server.on("listening", function(status) {
    console.log("server listening:", status);
});

server.on("error", function(err) {
    console.log("server error:", err);
});

server.on("connection", function(client) {
    console.log("server connection:", client.remoteAddress, client.remotePort);
});

server.on("close", function(reson) {
    console.log("server close:", reson);
});

server.listen({
    host: "127.0.0.1",
    port: 6080,
    exclusive: true
});
