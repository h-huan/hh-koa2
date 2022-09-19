const router = require('koa-router')()
const status = require('../../enum')
const moment = require('moment');

const linkDao = require("../../controller/link");

/** 添加友情链接 */
router.post("/add", async ctx => {
    try {
        let data = {
            title: ctx.request.body.title,               // 标题
            summary: ctx.request.body.summary || null,   // 简介
            email: ctx.request.body.email,              // 邮箱
            url: ctx.request.body.url,                   //url
            ico: ctx.request.body.ico,                   //ico
            create_time: moment().format('YYYY-MM-DD HH:mm:ss'),    //创建时间
            update_time: moment().format('YYYY-MM-DD HH:mm:ss'),    //更新时间
            link_state: 0,   //友链状态： 0 申请中， 1：已上线，  2：已下架',
        }
        await linkDao.addLink(data).then((value) => {
            ctx.body = { code: status.suc, message: "添加成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
});

/** 查询所有的链接 */
router.get("/list/All", async ctx => {
    try {
        await linkDao.listAllLink().then((value) => {
            ctx.body = { code: status.suc, data: value }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 更改id修改留言的状态 */
router.put("/upd/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id,
        }
        await linkDao.updLink(data).then((value) => {
            ctx.body = { code: status.suc, message: "修改成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 更改id修改内容 */
router.put("/upd/cont/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id,
            title: ctx.request.body.title,
            email: ctx.request.body.email,
            url: ctx.request.body.url,
            ico: ctx.request.body.ico,
            update_time: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        await linkDao.updContLink(data).then((value) => {
            ctx.body = { code: status.suc, message: "修改成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 查询申请成功的链接 */
router.get("/list/suc", async ctx => {
    try {
        await linkDao.listSuc().then((value) => {
            ctx.body = { code: status.suc, data: value }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})


/** 根据id查询内容 */
router.get("/get/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id
        };
        await linkDao.getLink(data).then((value) => {
            ctx.body = { code: status.suc, data: value }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 根据id删除 */
router.delete("/del/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id
        }
        await linkDao.delLink(data).then((value) => {
            ctx.body = { code: status.suc, message: "删除成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 添加点击数 */
router.get("/cli/count/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id
        }
        await linkDao.countLink(data).then((value) => {
            ctx.body = { code: status.suc }
        })
    } catch (err) {
    ctx.body = { code: status.err, message: err }
}
})

module.exports = router;   