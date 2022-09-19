const router = require('koa-router')()
const status = require('../../enum')
const moment = require('moment');

const leaveDao = require("../../controller/leave");



/** 添加留言 */
router.post("/add", async ctx => {
    try {
        let data = {
            name: ctx.request.body.name,      // 昵称
            email: ctx.request.body.email,      // 邮箱
            cent: ctx.request.body.cent,      // 留言
            create_time: moment().format('YYYY-MM-DD HH:mm:ss'),   // 创建时间
            update_time: moment().format('YYYY-MM-DD HH:mm:ss'),   // 更新时间
        }
        await leaveDao.addleave(data).then((value) => {
            ctx.body = { code: status.suc, message: "添加成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 查询所有的留言 */
router.get("/list", async ctx => {
    try {
        await leaveDao.listLeave().then((value) => {
            ctx.body = { code: status.suc, data: value }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 对留言进行回复 */
router.put("/upd/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id,
            reply: ctx.request.body.reply
        }
        await leaveDao.updLeave(data).then((value) => {
            ctx.body = { code: status.suc, message: "回复成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 根据id删除留言 */
router.delete("/del/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id
        }
        await leaveDao.delLeave(data).then((value) => {
            ctx.body = { code: status.suc, message: "删除成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

module.exports = router;