const router = require('koa-router')()
const status = require('../../enum')
const moment = require('moment');

const menuDao = require("../../controller/menu");

/** 添加侧边栏 */
router.post("/add", async ctx => {
    try {
        const data = {
            menu_name: ctx.request.body.menuName, // 侧边栏
            menu_fid: ctx.request.body.menuFid || 0, // 父级id
            create_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
            update_time: moment().format('YYYY-MM-DD HH:mm:ss'), // 更新时间
            user_id: ctx.request.body.useId || "1", // 操作管理员id
        }
        await menuDao.addMenu(data).then((value) => {
            ctx.body = { code: status.suc, message: "添加成功" }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
});

/** 获取父节点的菜单 */
router.get("/getfm", async ctx => {
    try {
        menuDao.getFMenu().then((value) => {
            ctx.body = { code: status.suc, data: value }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
})

/** 获取后台所有的菜单 */
router.get("/All", async ctx => {
    try {
        await menuDao.listMenu().then((value) => {
            var arrJson = [];
            for (i = 0; i < value.length; i++) {
                // 获取根元素
                if (value[i].menu_fid == 0) {
                    let son = getAllChild(value, value[i].id);
                    if (son.length != 0) {
                        value[i].son = son;
                    }
                    arrJson.push(value[i]);
                }
            }
            function getAllChild(result, index) {
                let son = [];
                for (const i in result) {
                    if (result[i].menu_fid == index) {
                        son.push(result[i]);
                    }
                }
                return son;
            }
            ctx.body = { code: status.suc, data: arrJson }
        })
    } catch (err) {
        ctx.body = { code: status.err, message: err }
    }
});

module.exports = router;