
module.exports = {
    insert: function (table, data) {
        let _key = "", _val = "";
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                _key += key + ",";
                _val += `"${data[key]}"` + ",";
            }
        }
        _key = _key.substring(0, _key.length - 1);
        _val = _val.substring(0, _val.length - 1);
        return `INSERT INTO ${table}(${_key}) VALUES (${_val})`;
    },
    update: function (table, data, omitPara) {
        let sql = `UPDATE ${table} set `;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (key != omitPara) {
                    sql += `${key} = '${data[key]}',`
                }
            }
        }
        sql = sql.substring(0, sql.length - 1);
        return sql + ` WHERE ${data.uuid} = ` + `'${data.uuid}'`;
    }

}




