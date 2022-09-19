let DB_MYSQL = require('mysql');
let DB_CONFIG = require('./dbConfig');
/**
 * 数据库连接池
 * @type {Pool}
 */
let pool = DB_MYSQL.createPool({
    database: DB_CONFIG.database.DATABASE,
    user: DB_CONFIG.database.USERNAME,
    password: DB_CONFIG.database.PASSWORD,
    host: DB_CONFIG.database.HOST,
    port: DB_CONFIG.database.PORT
});
/**
 * 通用方法
 * @param sql
 * @param options
 * @param callback
 */
let query = function (sql, options) {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                reject(error)
            } else {
                connection.query(sql, options, (error, results) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(results)
                    }
                });
            }
            pool.releaseConnection(connection);
        });
    })
};


module.exports = query;
