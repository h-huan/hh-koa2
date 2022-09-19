let pool = require('../../conf/DBHelp');
let common = require("../common");

module.exports = {
    /** 添加链接 */
    addLink: function (data) {
        let sql = common.insert("hh_link", data);
        return pool(sql);
    },
    /** 查询所有 */
    listAllLink: function () {
        let sql = `select * FROM hh_link where link_state = 0`;
        return pool(sql);
    },
    /** 查询申请成功的链接 */
    listSuc: function () {
        let sql = `select * from hh_link where  link_state = 1`;
        return pool(sql);
    },
    /** 更加id修改留言的状态 */
    updLink: function (data) {
        let sql = `UPDATE hh_link set  link_state = 1 WHERE id= ${data.id}`;
        return pool(sql);
    },
    /** 更加id修改内容 */
    updContLink: function (data) {
        let sql = common.update("hh_link", data, "id")
        return pool(sql);
    },
    /** 根据id查询内容 */
    getLink: function (data) {
        let sql = `select * FROM hh_link where id= ${data.id}`;
        return pool(sql);
    },
    /** 根据id删除链接 */
    delLink: function (data) {
        let sql = `DELETE from hh_link WHERE id=${data.id}`;
        return pool(sql);
    },
    /** 添加点击数 */
    countLink: function (data) {
        let sql = `UPDATE hh_link SET click_count  = click_count+1 WHERE id= ${data.id}`;
        return pool(sql);
    }
}