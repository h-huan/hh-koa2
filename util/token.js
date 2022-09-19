const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const signkey = 'hh_blogs_knxw#$%0616';

module.exports = {
    //生成token
    setToken: function (username) {
        return new Promise((resolve, reject) => {
            const token = jwt.sign({
                username: username
            }, signkey, { expiresIn: 60 * 60 * 1 });
            resolve(token);
        })
    },
    //验证token
    verToken: function (token) {
        return new Promise((resolve, reject) => {
            var info = jwt.verify(token, signkey, (error, decoded) => {
                if (error) {
                    reject(error.message);
                }
            });
            resolve(info);
        })
    }
}