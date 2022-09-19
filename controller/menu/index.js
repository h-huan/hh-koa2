let pool = require('../../conf/DBHelp');
let common = require("../common");

module.exports = {
    /** 添加侧边栏 */
    addMenu: function (data) {
        let sql = common.insert("hh_menu", data);
        return pool(sql);
    },

    /** 查询父节点的菜单 */
    getFMenu: function () {
        let sql = `SELECT * FROM hh_menu where menu_fid = 0`;
        return pool(sql);
    },

    /** 查询所有菜单 */
    listMenu: function () {
        let sql = `select * from hh_menu`;
        return pool(sql);
    },

}