const router = require('koa-router')()
const status = require('../../enum')
const moment = require('moment');
const redis = require('../../conf/DBredis');

const blogDao = require("../../controller/blog");

/** 添加博客 */
router.post("/add", async ctx => {
    try {
        // 字符串有多长
        let _bloglen = ctx.request.body.content.length;
        let _readTime = 0;
        // 根据内容的长度判断有几分钟
        for (let i = 0; i < _bloglen; i++) {
            if (i * 500 < _bloglen < (i + 1) * 500) {
                _readTime = (i + 1);
                break;
            }
        }
        const data = {
            blog_sort_id: ctx.request.body.blogSortId, // 分类id
            tag_id: ctx.request.body.tabId, // 标签id
            title: ctx.request.body.title, // 博客标题
            summary: ctx.request.body.summary || null, // 博客简介
            content: ctx.request.body.content, // 博客内容
            click_count: 0, // 博客点击数
            collect_count: 0, // 博客收藏数
            create_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
            update_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 更新时间
            is_original: ctx.request.body.isOriginal, // 是否原创（0:是 1：不是）
            top_blogs: ctx.request.body.topBlogs, // 是否置顶（0:置顶 1:不置顶）
            bloglen: _bloglen,
            read_time: _readTime
        }
        await blogDao.addBlog(data).then((value) => {
            ctx.body = { code: status.suc, message: "添加成功" }
        })
        await redis.del("blogNum");
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 根据id来查询博客 */
router.get("/get/:id", async ctx => {
    try {
        const data = {
            id: ctx.params.id
        }
        await blogDao.getBlog(data).then((value) => {
            ctx.body = { code: status.suc, data: value };
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 获取博客列表 */
router.get("/list", async ctx => {
    try {
        let blogList;
        await redis.get("blogList").then((value) => {
            blogList = value;
        })
        if (blogList == null) {
            await blogDao.listBlog().then((value) => {
                ctx.body = { code: status.suc, data: value };
                redis.set("blogList", JSON.stringify(value));
                redis.expire("blogList", 60 * 60 * 24);
            })
        } else {
            ctx.body = { code: status.suc, data: JSON.parse(blogList) };
        }
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 根据id来删除博客  */
router.delete("/del/:id", async ctx => {
    try {
        const data = {
            id: ctx.params.id
        };

        await blogDao.delBlog(data).then((value) => {
            ctx.body = { code: status.suc, message: "删除成功" };
        })
        await redis.del("blogNum");
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 根据id修改博客 */
router.put("/upd/:id", async ctx => {
    try {
        const data = {
            id: ctx.params.id,  //博客id
            blog_sort_id: ctx.request.body.blogSortId, // 分类id
            // tag_id: ctx.request.body.tabId, // 标签id
            title: ctx.request.body.title, // 博客标题
            summary: ctx.request.body.summary || null, // 博客简介
            content: ctx.request.body.content, // 博客内容
            update_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 更新时间
            is_original: ctx.request.body.isOriginal, // 是否原创（0:不是 1：是）
            top_blogs: ctx.request.body.topBlogs, // 是否置顶（0:置顶 1:不置顶）
        }
        await blogDao.updBlog(data).then((value) => {
            ctx.body = { code: status.suc, message: "修改成功" };
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 根据id添加点击数 */
router.get("/cli/count/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id
        }
        await blogDao.countCliBlog(data).then((value) => {
            ctx.body = { code: status.suc };
        });
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 根据id添加收藏数 */
router.get("/coll/count/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id
        }
        await blogDao.countCollBlog(data).then((value) => {
            ctx.body = { code: status.suc };
        });
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 获取总的博客数 */
router.get("/count", async ctx => {
    try {
        let blogNum;
        await redis.get("blogNum").then((value) => {
            blogNum = value;
        });
        if (blogNum == null) {
            await blogDao.getCont().then((value) => {
                ctx.body = { code: status.suc, data: value[0].count };
                redis.set("blogNum", value[0].count);
                redis.expire("blogNum", 60 * 60 * 24);
            })
        } else {
            ctx.body = { code: status.suc, data: parseInt(blogNum) }
        }

    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 根据标题和简介来模糊查询 */
router.get("/like/:cont", async ctx => {
    try {
        let data = {
            cont: ctx.params.cont
        }
        await blogDao.linkBlog(data).then((value) => {
            ctx.body = { code: status.suc, data: value };
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

module.exports = router;