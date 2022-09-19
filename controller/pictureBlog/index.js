let pool = require('../../conf/DBHelp');
let common = require("../common");

module.exports = {
    // 添加博客的图片链接
    addPictureBlog: function (data) {
        let sql = common.insert("hh_picture_blog", data);
        return pool(sql);
    },
    // 修改博客图片链接
    updPicrureBlog: function (data) {
        let sql = common.update("hh_picture_blog", data, "blog_id");
        return pool(sql);
    },
    // 删除博客id来图片链接
    delPicrureBlog: function (data) {
        let sql = `DELETE FROM hh_picture_blog where blog_id = ${data.blog_id}`;
        return pool(sql);
    },
    // 根据博客的id来查询
    getPicrureBlog: function (data) {
        let sql = `select * FROM hh_picture_blog where blog_id=${data.blog_id}`;
        return pool(sql);
    }
}