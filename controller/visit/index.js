const pool = require('../../conf/DBHelp');
const common = require("../common");

module.exports = {
    // 增加访问量
    addVisit: function (data) {
        let sql = `INSERT INTO hh_visit(ip,create_time) VALUES ('${data.ip}','${data.create_time}')`;
        return pool(sql);
    },
    // 查询访问量
    countVisit: function () {
        let sql = `select  count(*) 'count' from hh_visit`;
        return pool(sql);
    },
    // 查询访问人数
    countPerVisit: function () {
        let sql = "SELECT count(*) 'count' FROM (SELECT date_format(create_time,'%Y-%m-%d'),ip from hh_visit GROUP BY ip,date_format(create_time,'%Y-%m-%d')) a";
        return pool(sql);
    }
}