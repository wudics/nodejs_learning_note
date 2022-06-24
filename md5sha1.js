var crypto = require('crypto');

var hash_md5 = crypto.createHash('md5');
hash_md5.update('Hello, World!');
var str_md5 = hash_md5.digest('hex');
console.log(str_md5);

var hash_sha1 = crypto.createHash('sha1');
hash_sha1.update('Hello, World!');
var str_sha1 = hash_sha1.digest('hex');
console.log(str_sha1);