
const router = require('koa-router')()
const fs = require('fs')

let routes = []
// 读取文件下面的所有内容
const files = fs.readdirSync('./routes')
// 
files.forEach(function (item, index) {
    let stat = fs.lstatSync("./routes/" + item)
    if (stat.isDirectory() === true) {
        routes.push(item)
    }
})

routes.forEach((item) => {
    router.use(`/api/${item}`, require(`./${item}`).routes());
})

module.exports = router

