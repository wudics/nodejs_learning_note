var http = require("http");

/*
    [100] = "Continue",
    [101] = "Switching Protocols",
    [200] = "OK",
    [201] = "Created",
    [202] = "Accepted",
    [203] = "Non-Authoritative Information",
    [204] = "No Content",
    [205] = "Reset Content",
    [206] = "Partial Content",
    [300] = "Multiple Choices",
    [301] = "Moved Permanently",
    [302] = "Found",
    [303] = "See Other",
    [304] = "Not Modified",
    [305] = "Use Proxy",
    [307] = "Temporary Redirect",
    [400] = "Bad Request",
    [401] = "Unauthorized",
    [402] = "Payment Required",
    [403] = "Forbidden",
    [404] = "Not Found",
    [405] = "Method Not Allowed",
    [406] = "Not Acceptable",
    [407] = "Proxy Authentication Required",
    [408] = "Request Time-out",
    [409] = "Conflict",
    [410] = "Gone",
    [411] = "Length Required",
    [412] = "Precondition Failed",
    [413] = "Request Entity Too Large",
    [414] = "Request-URI Too Large",
    [415] = "Unsupported Media Type",
    [416] = "Requested range not satisfiable",
    [417] = "Expectation Failed",
    [500] = "Internal Server Error",
    [501] = "Not Implemented",
    [502] = "Bad Gateway",
    [503] = "Service Unavailable",
    [504] = "Gateway Time-out",
    [505] = "HTTP Version not supported",
*/

/*
GET REQUEST
callback(is_success, data)
*/
function http_get(ip, port, url, params, callback) {
    // 通过http.request创建客户端请求对象 http.ClientRequest --> req
    var options = {
        host: ip,
        port: port,
        path: url + "?" + params,
        method: "GET"
    };
    // 当有请求返回的时候，参数就会被传递为http.IncomingMessage对象
    var req = http.request(options, function(incomingMessage) {
        incomingMessage.on("data", function(data) {
            if (incomingMessage.statusCode === 200) {
                callback(true, data);
            } else {
                callback(false, data);
            }
        });
    });
    // 通过end方法将请求发送到服务端
    req.end();
}

// http_get("127.0.0.1", 8080, "/", "", function(is_success, data) {
//     if (is_success) console.log(data.toString());
// });

// http_get("127.0.0.1", 8080, "/login", "username=wudics&password=cz19900602", function(is_success, data) {
//     if (is_success) console.log(data.toString());
// });

/*
POST REQUEST
callback(is_success, data)
*/
function http_post(ip, port, url, params, body, callback) {
    // 通过http.request创建客户端请求对象 http.ClientRequest --> req
    var options = {
        host: ip,
        port: port,
        path: url + "?" + params,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": body.length
        }
    };
    // 当有请求返回的时候，参数就会被传递为http.IncomingMessage对象
    var req = http.request(options, function(incomingMessage) {
        incomingMessage.on("data", function(data) {
            if (incomingMessage.statusCode === 200) {
                callback(true, data);
            } else {
                callback(false, data);
            }
        });
    });

    // 通过write方法写入body数据，通过end方法将请求发送到服务端
    req.write(body);
    req.end();
}

http_post("127.0.0.1", 8080, "/upload", "filename=upload.txt", "post body data write to upload.txt", function(is_success, data) {
    if (is_success) console.log(data.toString());
});