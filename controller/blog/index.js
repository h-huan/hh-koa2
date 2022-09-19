
let pool = require('../../conf/DBHelp');
let common = require("../common");


module.exports = {
    /** 添加博客 */
    addBlog: function (data) {
        let sql = common.insert("hh_blog", data);
        return pool(sql);
    },
    /** 根据id获取博客 */
    getBlog: function (data) {
        let sql = `select a.*,b.sort_name,c.tab_name from hh_blog a,hh_blog_sort b,hh_blog_tag c where a.blog_sort_id=b.id and a.tag_id =c.id and a.id = '${data.id}'`;
        return pool(sql);
    },
    /** 查询博客列表 */
    listBlog: function () {
        let sql = `SELECT * from hh_blog ORDER BY  create_time desc`;
        return pool(sql);
    },
    /** 根据id来删除博客 */
    delBlog: function (data) {
        let sql = `DELETE FROM hh_blog where id = '${data.id}'`;
        return pool(sql);
    },
    /** 根据id修改博客 */
    updBlog: function (data) {
        let sql = common.update("hh_blog", data, "id");
        return pool(sql);
    },
    /** 添加博客的点击数 */
    countCliBlog: function (data) {
        let sql = `UPDATE hh_blog SET click_count = click_count + 1 WHERE id ='${data.id}'`;
        return pool(sql);
    },
    /** 添加博客的收藏数 */
    countCollBlog: function (data) {
        let sql = `UPDATE hh_blog SET collect_count = collect_count + 1 WHERE id = '${data.id}'`;
        return pool(sql);
    },
    /** 获取博客的总数量 */
    getCont: function () {
        let sql = `SELECT count(*) count from  hh_blog`;
        return pool(sql);
    },
    /** 根据标题和简介来模糊查询 */
    linkBlog: function () {
        let sql = `SELECT * from hh_blog WHERE title Like '%${data.cont}%' or summary Like '%${data.cont}%'`;
        return pool(sql);
    }
}