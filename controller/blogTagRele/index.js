
let pool = require('../../conf/DBHelp')
let common = require("../common")
// 添加关系表

module.exports = {
    // 增加
    addBlogTagRele: function (data) {
        let sql = `insert into hh_blogTag_rele(blog_id,tag_id) VALUES (${data.blog_id},${data.tag_id});`
        return pool(sql)
    },
    // 修改
    updBlogTagRele: function (data) {
        let sql = `UPDATE hh_blogTag_rele set tag_id =${data.tag_id} WHERE id=${data.id}`
        return pool(sql)
    },
    // 根据博客id删除
    delBlogTagRele: function (data) {
        let sql = `DELETE FROM hh_blogTag_rele WHERE blog_id= ${data.blog_id}`
        return pool(sql)
    },
    // 添加博客
    getBlogTagRele: function (data) {
        let sql = `SELECT * from hh_blogTag_rele WHERE blog_id = ${data.blog_id};`;
        return pool(sql);
    }
}