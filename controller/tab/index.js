let pool = require('../../conf/DBHelp');
let common = require("../common");

module.exports = {
    exitTab: function (data) {
        let sql = `SELECT * from hh_blog_tag WHERE tab_name = '${data.tanName}'`;
        return pool(sql);
    },
    /** 添加标签 */
    addTab: function (data) {
        let sql = common.insert("hh_blog_tag", data);
        return pool(sql);
    },
    /** 获取分类标签 */
    listTab: function () {
        let sql = `SELECT * from hh_blog_tag WHERE state = 0`;
        return pool(sql);
    },
    /** 获取分类列表和对应的博客数 */
    getListCount: function () {
        // let sql = "select a.id,a.tab_name,count(b.tag_id) as count from hh_blog_tag as a LEFT JOIN hh_blog as b  on a.id = b.tag_id GROUP BY tab_name,id";
        let sql = "SELECT * from hh_blog_tag WHERE state = 0";
        return pool(sql);
    },
    /** 根据分类id来删除分类 */
    delTab: function (data) {
        let sql = `DELETE FROM hh_blog_tag where id =${data.id}`;
        return pool(sql);
    },
    /** 根据分类id修改分类名称 */
    updNameTab: function (data) {
        let sql = `UPDATE hh_blog_tag SET tab_name = '${data.tab_name}',update_time = '${data.update_time}' WHERE id =${data.id} `;
        return pool(sql);
    },
    /** 根据分类id修改分类状态 */
    updstateTab: function (data) {
        let sql = `UPDATE hh_blog_tag SET state = '${data.state}'  WHERE id = ${data.id} `;
        return pool(sql);
    },
    /** 添加分类的点击数 */
    countTab: function (data) {
        let sql = `UPDATE hh_blog_tag SET click_count  = click_count+1 WHERE id= ${data.id}`;
        return pool(sql);
    },
    /** 获取分类的总数量 */
    getCont: function () {
        let sql = `SELECT count(*) count from  hh_blog_tag`;
        return pool(sql);
    },
    /** 根据id获取对应的博客 */
    getBlog: (data, success) => {
        let sql = `select a.*,b.tab_name from hh_blog a,hh_blog_tag b where a.tag_id=b.id and a.tag_id like "%${data.id}%";`
        return pool(sql);
    }
}