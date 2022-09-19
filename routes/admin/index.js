
const router = require('koa-router')()
const status = require('../../enum')
const moment = require('moment');
const getClientIP = require('../../util/util');
const token = require('../../util/token');


const adminDao = require("../../controller/admin");

// 登录
router.post("/login", async ctx => {
    try {
        let data = {
            uuid: ctx.request.body.uuid,
            pass_word: ctx.request.body.passWord,
            last_login_ip: getClientIP(ctx.req),
            last_login_time: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        await adminDao.getLogin(data).then((value) => {
            if (value.length != 0) {
                token.setToken(data.uuid).then((token) => {
                    ctx.body = { code: status.suc, data: token }
                });
            } else {
                return ctx.body = { code: status.noUse, message: "请输入正确的信息" }
            }
        });
        await adminDao.updUserInfo(data)
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

// 添加管理员
router.post("/add", async ctx => {
    try {
        const data = {
            uuid: ctx.request.body.uuid,    // 账号uuid
            pass_word: ctx.request.body.passWord,   // 密码
            last_login_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 最后登录时间
            last_login_ip: getClientIP(ctx.req),            // 最后登录IP
            create_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
        }

        // 判断用户是否存在
        await adminDao.existUser(data).then((value) => {
            if (value.length != 0) {
                ctx.body = { code: status.err, message: "该用户已存在" };
            }
        })
        await adminDao.addUser(data).then((value) => {
            ctx.body = { code: status.suc, message: "添加成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

//  根据uuid修改管理员信息
router.put("/upd/:uuid", async ctx => {
    try {
        const data = {
            user_name: ctx.request.body.userName || null,   // 管理员名
            uuid: ctx.params.uuid || null,    // 账号uuid
            gender: ctx.request.body.gender || 0,  // 性别(0:男1:女)
            email: ctx.request.body.email || null,   // 邮箱
            birthday: ctx.request.body.birthday || null,    // 出生年月日
            mobile: ctx.request.body.mobile || null,  // 手机
            summary: ctx.request.body.summary || null, // 个性签名
            github: ctx.request.body.github || null,   // github
            gitee: ctx.request.body.gitee || null,     // gitee
            gitlab: ctx.request.body.gitlab || null,   // gitlab
        }

        await adminDao.updUser(data).then((value) => {
            ctx.body = { code: status.suc, message: "修改成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 根据uuid修改管理员密码 */
router.put("/upd/pass/:uuid", async ctx => {
    try {
        let data = {
            uuid: ctx.params.uuid,
            oldPassWord: ctx.request.body.oldPassWord,
            pass_word: ctx.request.body.passWord,
        }
        await adminDao.updPass(data).then((value) => {
            ctx.body = { code: status.suc, message: "修改成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

// 根据uuid查询管理员信息
router.get("/set/:uuid", async ctx => {
    try {
        let data = {
            uuid: ctx.params.uuid,
        }
        await adminDao.setUser(data).then((value) => {
            ctx.body = { code: status.suc, data: value }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

// 根据id删除管理员信息
router.delete("/del/:id", async ctx => {
    try {
        let data = {
            id: ctx.params.id,
        }

        await adminDao.delUser(data).then((value) => {
            ctx.body = { code: status.suc, message: "删除成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

module.exports = router