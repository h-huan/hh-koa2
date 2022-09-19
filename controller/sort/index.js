let pool = require('../../conf/DBHelp');
let common = require("../common");

module.exports = {
    // 判断是否存在
    exitSort: function (data) {
        let sql = `SELECT * from hh_blog_sort WHERE sort_name = "${data.sort_name}"`;
        return pool(sql);
    },
    /** 添加分类 */
    addSort: function (data) {
        let sql = common.insert("hh_blog_sort", data);
        return pool(sql);
    },
    /** 查询分类列表 */
    listSort: function () {
        let sql = `SELECT * from hh_blog_sort WHERE state = 0`;
        return pool(sql);
    },
    /** 获取分类列表和对应的博客数 */
    getListCount: function () {
        let sql = "select a.id,a.sort_name,count(b.blog_sort_id) as count from hh_blog_sort as a LEFT JOIN hh_blog as b  on a.id = b.blog_sort_id GROUP BY sort_name,id";
        return pool(sql);
    },
    /** 根据分类id来删除分类 */
    delSort: function (data) {
        let sql = `DELETE FROM hh_blog_sort where id =  ${data.id}`;
        return pool(sql);
    },
    /** 根据分类id修改分类名称 */
    updNameSort: function (data) {
        let sql = `UPDATE hh_blog_sort SET sort_name = '${data.sort_name}',update_time = '${data.update_time}'  WHERE id =  ${data.id}`;
        return pool(sql);
    },
    /** 根据分类id修改分类状态 */
    updstateSort: function (data) {
        let sql = `UPDATE hh_blog_sort SET state = '${data.state}' WHERE id = ${data.id}`;
        return pool(sql);
    },
    /** 添加分类的点击数 */
    countSort: function (data) {
        let sql = `UPDATE hh_blog_sort SET click_count  = click_count+1 WHERE id=${data.id}`;
        return pool(sql);
    },
    /** 获取分类的总数量 */
    getCont: function () {
        let sql = `SELECT count(*) count from  hh_blog_sort`;
        return pool(sql);
    },
    /** 根据id获取对应的博客 */
    getBlog: function (data) {
        let sql = `select a.*,b.sort_name from hh_blog a,hh_blog_sort b where a.blog_sort_id=b.id and blog_sort_id = ${data.id}`;
        return pool(sql);
    }
}