const schedule = require('node-schedule');
const redis = require('../conf/DBredis');

const visit = require("../controller/visit");
module.exports = {
    updSchedule: function () {
        let rule = new schedule.RecurrenceRule();
        // 每天两点将新的访问量放到数据库
        rule.hour = 2;
        schedule.scheduleJob(rule, async function () {
            // 添加内容
            await redis.smembers('dayVisit').then((value) => {
                if (value != null) {
                    if (value.length > 0) {
                        value.forEach((item) => {
                            let _item = JSON.parse(item);
                            let data = {
                                ip: _item.ip,
                                create_time: _item.create_time
                            }
                            visit.addVisit(data);
                        })
                    }
                }
            })
            // 删除
            await redis.del("dayVisit");
            await redis.del("visit");
        });
    }
}

