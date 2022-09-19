const Redis = require("ioredis");

const redis = new Redis({
    port: 6379, // Redis port
    host: "xxx.xx.xx.xx", // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    prefix: 'hh:',  //前缀
    ttl: 60 * 60 * 24,   //设置过期时间
    password: "xxxx",  //密码
    db: 0,  // 访问的数据库
});

module.exports = redis;