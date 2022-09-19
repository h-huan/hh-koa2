const router = require('koa-router')()
const status = require('../../enum')
const moment = require('moment');
const getClientIP = require('../../util/util');

const pictureBlogDao = require("../../controller/pictureBlog");

// 添加博客的图片链接··
router.post("/add", async ctx => {
    try {
        let data = {
            urls: ctx.request.body.urls,                    // 图片链接列表
            blog_id: ctx.request.body.blogId,               // 博客id
            picture_sort_id: getClientIP(req),      //修改的IP
            create_time: moment().format('YYYY-MM-DD HH:mm:ss'),    //创建时间
            update_time: moment().format('YYYY-MM-DD HH:mm:ss')    //更新时间
        }
        await pictureBlogDao.addPictureBlog(data).then((value) => {
            ctx.body = { code: status.suc, message: "添加成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

// 根据博客id,修改列表图片链接
router.put("/upd/:blogId", async ctx => {
    try {
        let data = {
            urls: ctx.request.body.urls,                    // 图片链接列表
            blog_id: ctx.params.blogId,               // 博客id
            picture_sort_id: getClientIP(req),      //修改的IP
            update_time: moment().format('YYYY-MM-DD HH:mm:ss')    //更新时间
        }
        await pictureBlogDao.updPicrureBlog(data).then((value) => {
            ctx.body = { code: status.suc, message: "修改成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

// 删除博客id来图片链接
router.delete("/del/:blogId", async ctx => {
    try {
        let data = {
            blog_id: ctx.params.blogId,               // 博客id
        }
        await pictureBlogDao.delPicrureBlog(data).then((value) => {
            ctx.body = { code: status.suc, message: "删除成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

// 根据博客的id来查询链接
router.get("/get/:blogId", async ctx => {
    try {
        let data = {
            blog_id: ctx.params.blogId,               // 博客id
            picture_sort_id: getClientIP(req),      //修改的IP
            update_time: moment().format('YYYY-MM-DD HH:mm:ss')    //更新时间
        }
        await pictureBlogDao.getPicrureBlog(data).then((value) => {
            ctx.body = { code: status.suc, data: value }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

module.exports = router; 