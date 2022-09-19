let pool = require('../../conf/DBHelp');
let common = require("../common");

module.exports = {
    /** 添加留言 */
    addleave: function (data) {
        let sql = common.insert("hh_leave", data)
        return pool(sql)
    },
    /** 查询所有的留言 */
    listLeave: function () {
        let sql = `SELECT  * from hh_leave ORDER BY create_time desc`;
        return pool(sql)
    },
    /** 对留言进行回复 */
    updLeave: function (data) {
        let sql = `UPDATE hh_leave SET reply='${data.reply}' WHERE id=${data.id}`;
        return pool(sql)
    },

    // 根据id删除内容
    delLeave: function (data) {
        let sql = `DELETE FROM hh_leave WHERE id= ${data.id}`;
        return pool(sql)
    }

}