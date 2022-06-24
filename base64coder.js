// base64编码，将二进制数据转换成ascii字符串
function base64_encode(bufBytes) {
    var buf = Buffer.from(bufBytes);
    var base64 = buf.toString("base64");
    return base64;
}

// base64解码，将ascii字符串转换成二进制数据
function base64_decode(asciiString) {
    var buf = Buffer.from(asciiString, "base64");
    return buf;
}

// test
var base64Str = base64_encode([0xff, 0xf1, 0x11, 0x13, 0xf7]);
console.log(base64Str);

var decodeBuf = base64_decode(base64Str);
console.log(decodeBuf);

var fs = require("fs");
fs.readFile("avatar.png", function(err, data) {
    if (err) {
        console.log(err.message);
        return;
    }

    var img_base64 = base64_encode(data);
    console.log(img_base64);

    var img_data = base64_decode(img_base64);
    fs.writeFile("avatar2.png", img_data, function(err) {
        if (err) {
            console.log(err.message);
            return;
        }

        console.log("avatar2.png save");
    });
});