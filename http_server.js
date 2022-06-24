var express = require("express");
var path = require("path");

var app = express();
app.use(express.static(path.join(process.cwd(), "www_root")));
app.listen(8080);

// 设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// test get request
app.get("/login", function(req, res) {
    console.log("/login");
    console.log(req.query);
    res.send("success");
});

// test post request
app.post("/upload", function(req, res) {
    console.log("/upload");
    console.log(req.query);

    // post request 会传输body数据，需要监听data事件获取
    req.on("data", function(data) {
        console.log(data.toString());
        res.send("success");
    });
});