let pool = require('../../conf/DBHelp');
let common = require("../common");

module.exports = {
    addComment: function (data) {
        let sql = common.insert("hh_comment", data);
        return pool(sql)
    },
    delComment: function (data) {
        let sql = `DELETE FROM hh_comment WHERE id=${data.id} `;
        return pool(sql)
    },
    updComment: function (data) {
        let sql = `UPDATE hh_comment SET reply = '${data.reply}' WHERE id = ${data.id}`;
        return pool(sql)
    },
    listAllComment: (success) => {
        let sql = `SELECT * from hh_comment ORDER BY create_time desc`;
        return pool(sql)
    },
    getComment: (data, success) => {
        let sql = `SELECT * from hh_comment WHERE blog_id='${data.blog_id}'`;
        DBHelp(sql, (error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success", data: result });
        })
    }
}