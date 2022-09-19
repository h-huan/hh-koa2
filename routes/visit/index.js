const router = require('koa-router')()
const status = require('../../enum')
const redis = require('../../conf/DBredis');
const moment = require('moment');
const getClientIP = require('../../util/util');
const visitDao = require("../../controller/visit");

// 添加访问量
router.get("/add", async ctx => {
    try {
        let data = {
            ip: getClientIP(ctx.req),
            create_time: moment().format('YYYY-MM-DD')
        }
        // 将数据添加到redis 当天
        await redis.sadd('dayVisit', JSON.stringify(data)).then((value) => {
            ctx.body = { code: status.suc }
            redis.expire("dayVisit", 60 * 60 * 24);
        });
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

// 查询总人数
router.get("/count", async ctx => {
    try {
        // 现在访问量 以前的访问量
        let num = 0, befnum = 0;
        // 查询今天的访问数量。
        await redis.smembers('dayVisit').then((value) => {
            num += value.length
        })
        redis.expire("dayVisit", 60 * 60 * 24);
        // 查询以前数据的总条数
        await redis.get('visit').then((value) => {
            let _value = parseInt(value);
            if (_value > 0) {
                befnum = _value;
                ctx.body = { code: status.suc, data: num + befnum }
            }
        })
        // 没有的话，将值保存到redis
        if (befnum == 0) {
            await visitDao.countVisit().then((value) => {
                redis.set('visit', value[0].count);
                ctx.body = { code: status.suc, data: num + value[0].count }
                redis.expire("visit", 60 * 60 * 24);
            })
        }
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

// // 查询访问人数
// router.get("/count/per", async ctx => {
//     try {
//         await visitDao.countPerVisit().then((value) => {
//             ctx.body = { code: status.suc, data: value }
//         })
//     } catch (err) {
//         ctx.body = { code: status.err, message: err }
//     }
// })

module.exports = router; 