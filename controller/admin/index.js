
let pool = require('../../conf/DBHelp');
let common = require("../common");

module.exports = {
    // 更新用户信息
    updUserInfo: function (data) {
        let sql = `UPDATE hh_admin set last_login_ip='${data.last_login_ip}',last_login_time ='${data.last_login_time}'  where  uuid= '${data.uuid}'`;
        return pool(sql);
    },
    /** 登录 */
    getLogin: function (data) {
        let sql = `SELECT * FROM hh_admin where uuid='${data.uuid}'  AND  pass_word='${data.pass_word}'`;
        return pool(sql);
    },
    // 判断管理员是否存在
    existUser: function (data) {
        let sql = "select * from hh_admin where uuid=" + `'${data.uuid}'`;
        return pool(sql);
    },
    /** 添加管理员  */
    addUser: function (data) {
        let sql = common.insert("hh_admin", data);
        return pool(sql);
    },
    /** 根据uuid修改用户信息 */
    updUser: function (data) {
        /**
         * @param 表名
         * @param 参数值
         * @param 不用匹配的值
         */
        let sql = common.update("hh_admin", data, "uuid");
        return pool(sql);
    },
    /** 更加id修改用户密码 */
    updPass: function (data) {
        let sql = `UPDATE hh_admin set pass_word='${data.pass_word}' WHERE uuid ='${data.uuid}'`;
        return pool(sql);
    },
    /** 根据uuid查询用户信息 */
    setUser: function (data) {
        let sql = `SELECT * from hh_admin where uuid ='${data.uuid}'`;
        return pool(sql);
    },
    /** 更加id删除用户 */
    delUser: function (data) {
        let sql = `DELETE FROM hh_admin WHERE id= ${data.id}`;
        return pool(sql);
    }
}
