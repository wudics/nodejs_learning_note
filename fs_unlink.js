// var fs = require('fs');
var fs = require('fs/promises');

/*
echo hello > hello.txt 生成待删除的测试文件
*/

/*
同步方式
*/
// try {
//     fs.unlinkSync('./hello.txt');
//     console.log('successfully deleted ./hello.txt');
// } catch (err) {
//     console.log(err);
// }

/*
异步方式
*/
// fs.unlink("./hello.txt", function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('successfully deleted ./hello.txt');
//     }
// });

/*
promise方式（async-await）
*/
(async function() {
    try {
        await fs.unlink('./hello.txt');
        console.log('uccessfully deleted ./hello.txt')
    } catch (err) {
        console.log(err.message);
    }
})();
