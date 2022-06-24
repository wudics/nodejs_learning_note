var net = require("net");
var tcppkg = require("./tcp_packer");

var socket = net.connect({
    host: "127.0.0.1",
    port: 6080
}, function() {
    console.log("connected");
});

socket.on("connect", function() {
    console.log("connected to the server and send some datas");
    for (var i = 0; i < 10000; i++) {
        var buf = tcppkg.pack("Hello, World!");
        socket.write(buf);
    }
    setTimeout(function() {
        socket.end();
    } , 3000);
});

socket.on("error", function(err) {
    console.log("error occur:", err);
});

socket.on("close", function(reson) {
    console.log("close:", reson);
});

socket.on("end", function() {
    console.log("end from server");
});

socket.on("data", function(data) {
    console.log(data);
});