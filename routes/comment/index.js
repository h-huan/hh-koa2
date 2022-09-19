const router = require('koa-router')()
const status = require('../../enum')
const moment = require('moment');

const commentDao = require("../../controller/comment");

// 添加评论
router.post("/add", async ctx => {
    try {
        let data = {
            user_name: ctx.request.body.user_name, // 标签内容
            email: ctx.request.body.email, // 邮箱
            content: ctx.request.body.content, // 评论
            blog_id: ctx.request.body.blog_id, // 博客id
            create_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
            update_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 修改时间
        }
        await commentDao.addComment(data).then((value) => {
            ctx.body = { code: status.suc, message: "添加成功" };
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

// 删除评论
router.delete("/del/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id
        }
        await commentDao.delComment(data).then((value) => {
            ctx.body = { code: status.suc, message: "删除成功" };
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})
// 对评论进行回复
router.put("/upd/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id,
            reply: ctx.request.body.reply
        }
        await commentDao.updComment(data).then((value) => {
            ctx.body = { code: status.suc, message: "回复成功" };
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})
// 查询所有评论
router.get("/list/all", async ctx => {
    try {
        await commentDao.listAllComment().then((value) => {
            ctx.body = { code: status.suc, data: value };
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

// 根据博客id获取对应的所有评论
router.get("/get/:blog_id", async ctx => {
    try {
        let data = {
            blog_id: ctx.params.blog_id
        }
        await commentDao.getComment(data).then((value) => {
            ctx.body = { code: status.suc, data: value };
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

module.exports = router;