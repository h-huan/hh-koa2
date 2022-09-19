const router = require('koa-router')()
const status = require('../../enum')
const blogTagReleDao = require("../../controller/blogTagRele")

// 增加
router.post("/add", async ctx => {
    try {
        let data = {
            blog_id: ctx.request.body.blogId,    // 文章id
            tag_id: ctx.request.body.tabId       // 标签id
        }
        await blogTagReleDao.addBlogTagRele(data).then((value) => {
            ctx.body = { code: status.suc, message: "添加成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

// 根据id修改
router.put("/upd/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id,
            tag_id: ctx.request.body.tabId
        }
        await blogTagReleDao.updBlogTagRele(data).then((value) => {
            ctx.body = { code: status.suc, message: "修改成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

// 根据博客id删除 
router.delete("/del/:blogId", async ctx => {
    try {
        let data = {
            blog_id: ctx.params.blogId
        }
        await blogTagReleDao.delBlogTagRele(data).then(value => {
            ctx.body = { code: status.suc, message: "删除成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

// 查询博客id查询
router.get("/get/:blogId", async ctx => {
    try {
        let data = {
            blog_id: ctx.params.blogId
        }
        await blogTagReleDao.getBlogTagRele(data).then(value => {
            let arr = [];
            value.forEach((item) => {
                arr.push(item.tag_id);
            });
            ctx.body = { code: status.suc, message: arr };
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

module.exports = router;