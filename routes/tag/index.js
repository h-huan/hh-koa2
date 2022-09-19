const router = require('koa-router')()
const status = require('../../enum')
const moment = require('moment');
const redis = require('../../conf/DBredis');


const tabDao = require("../../controller/tab");

/** 添加标签 */
router.post("/add", async ctx => {
    try {
        const data = {
            tab_name: ctx.request.body.tanName, // 标签内容
            content: ctx.request.body.content || null, // 标签简介
            create_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
            update_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 更新时间 
            state: 0, // 状态:0表示正常，1表示注销
            click_count: 0, // 点击数
        }
        // 判断标签是否存在
        await tabDao.exitTab(data).then((value) => {
            if (value.length != 0) {
                return ctx.body = { code: status.err, message: "该标签已经存在" };
            }
        })
        // 添加标签
        await tabDao.addTab(data).then((value) => {
            ctx.body = { code: status.suc, message: "添加成功" }
        })
        redis.del("tabNum");

    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 获取标签列表 */
router.get("/list", async ctx => {
    try {
        await tabDao.listTab().then((value) => {
            ctx.body = { code: status.suc, data: value }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 获取标签和对应的博客数 */
router.get("/list/count", async ctx => {
    try {
        await tabDao.getListCount().then((value) => {
            ctx.body = { code: status.suc, message: value }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 根据标签id来删除分类 */
router.delete("/del/:id", async ctx => {
    try {
        const data = {
            id: ctx.params.id
        };
        await tabDao.delTab(data).then((value) => {
            ctx.body = { code: status.suc, message: "删除成功" }
        })
        redis.del("tabNum");
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 根据分类id修改分类名称 */
router.put("/name/upd/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id,  //分类id
            tab_name: ctx.request.body.tanName,  //分类名
            update_time: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        await tabDao.updNameTab(data).then((value) => {
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
        await tabDao.updstateTab(data).then((value) => {
            ctx.body = { code: status.suc, message: "修改成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 修改分类的点击数 */
router.get("/cli/count/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id
        }
        await tabDao.countTab(data).then((value) => {
            ctx.body = { code: status.suc }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 查询标签的总数量 */
router.get("/count", async ctx => {
    try {
        let tabNum;
        // 判断redis里面是否保存了count
        await redis.get("tabNum").then((value) => {
            tabNum = value;
        });

        if (tabNum == null) {
            await tabDao.getCont().then((value) => {
                ctx.body = { code: status.suc, data: value[0].count }
                redis.set("tabNum", value[0].count);
                redis.expire("tabNum", 60 * 60 * 24);
            })
        } else {
            ctx.body = { code: status.suc, data: parseInt(tabNum) }
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
        await tabDao.getBlog(data).then((value) => {
            ctx.body = { code: status.suc, message: value };
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})


module.exports = router;