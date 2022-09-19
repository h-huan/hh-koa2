const router = require('koa-router')()
const status = require('../../enum')
const moment = require('moment');
const redis = require('../../conf/DBredis');

const sortDao = require("../../controller/sort");

/** 添加分类 */
router.post("/add", async ctx => {
    try {
        const data = {
            sort_name: ctx.request.body.sortName, // 分类内容
            content: ctx.request.body.content || null, // 分类简介
            create_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
            update_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 更新时间 
            state: 0, // 状态:0表示正常，1表示注销
            click_count: 0, // 点击数
        }
        await sortDao.exitSort(data).then((value) => {
            if (value.length != 0) {
                return ctx.body = { code: status.err, message: "该分类已经存在" };
            }
        })
        await sortDao.addSort(data).then((value) => {
            ctx.body = { code: status.suc, message: "添加成功" }
        })
        await redis.del("sortNum");
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 获取分类列表 */
router.get("/list", async ctx => {
    try {
        await sortDao.listSort().then((value) => {
            ctx.body = { code: status.suc, data: value }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 获取分类列表和对应的博客数 */
router.get("/list/count", async ctx => {
    try {
        await sortDao.getListCount().then((value) => {
            ctx.body = { code: status.suc, data: value }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 根据分类id来删除分类 */
router.delete("/del/:id", async ctx => {
    try {
        const data = {
            id: ctx.params.id
        };
        await sortDao.delSort(data).then((value) => {
            ctx.body = { code: status.suc, message: "删除成功" }
        })
        await redis.del("sortNum");
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 根据分类id修改分类名称 */
router.put("/name/upd/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id,  //分类id
            sort_name: ctx.request.body.sortName,  //分类名
            update_time: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        await sortDao.updNameSort(data).then((value) => {
            ctx.body = { code: status.suc, message: "修改成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 根据分类id修改分类状态 */
router.put("/state/upd/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id,
            state: ctx.request.body.state,  //分类的状态
        }
        await sortDao.updstateSort(data).then((value) => {
            ctx.body = { code: status.suc, message: "修改成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 添加分类的点击数 */
router.get("/cli/count/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id
        }
        await sortDao.countSort(data).then((value) => {
            ctx.body = { code: status.suc }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 获取分类的总数量 */
router.get("/count", async ctx => {
    try {
        let sortNum;
        await redis.get("sortNum").then((value) => {
            sortNum = value;
        });
        if (sortNum == null) {
            await sortDao.getCont().then((value) => {
                ctx.body = { code: status.suc, data: value[0].count }
                redis.set("sortNum", value[0].count);
                redis.expire("sortNum", 60 * 60 * 24);
            })
        } else {
            ctx.body = { code: status.suc, data: parseInt(sortNum) }
        }

    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 根据id获取对应的博客 */
router.get("/get/blog/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id
        }
        await sortDao.getBlog(data).then((value) => {
            ctx.body = { code: status.suc, data: value };
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

module.exports = router;