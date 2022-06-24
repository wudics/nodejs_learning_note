var fs = require('fs');

fs.readFile("avatar.png", function(err, data) {
    if (err) {
        return;
    }

    // 在当前事件循环结束时调用（不是立即执行回调函数）
    console.log("begin setImmediate");
    setImmediate(function() {
        console.log("run setImmediate callback");
    });
    console.log("end setImmediate");
});

var timerInterval = setInterval(function(data) {
    console.log("setInterval callback:", data);
}, 1000, "setInterval params");

setTimeout(function(data) {
    console.log("setTimeout callback:", data);
}, 1000, "setTimeout params");

// 5秒后取消timerInterval定时器
setTimeout(function() {
    clearInterval(timerInterval);
}, 6000);