const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')     // 对返回的json处理
const onerror = require('koa-onerror')   //错误处理机制
const bodyparser = require('koa-bodyparser')   // 用来解析body
// const logger = require('koa-logger')    //日志
const moment = require('moment');
const status = require('./enum')
const path = require('path')
const fs = require('fs')
const token = require('./util/token')   //token验证

// 错误处理程序
onerror(app)

// 跨域设置
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Credentials", true)
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set("Access-Control-Allow-Headers", "X-Requested-With")
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  ctx.set("Content-Type", "application/json;charset=utf-8")
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});

// token验证
app.use(async (ctx, next) => {
  if (ctx.method != 'GET' &&
    ctx.path != '/api/admin/login' &&
    ctx.path != '/api/admin/register' &&
    ctx.path != '/api/leave/add' &&
    ctx.path != '/api/comment/add' &&
    ctx.path != '/api/link/add') {
    let _token = req.headers.authorization;
    if (_token == undefined) {
      ctx.body({ code: status.err, message: "请先登录" });
    } else {
      token.verToken(_token).then((data) => {
      }).catch((error) => {
        return ctx.body({ code: status.err, message: error });
      })
      await next();
    }
  } else {
    await next();
  }
})

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(json())
// app.use(logger())

// 设置公共目录
app.use(require('koa-static')(__dirname + '/public'))

// logger 日志
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
  let str = `${ctx.method} ${ctx.url} - ${ms}ms ${currentTime} \r\n`
  fs.appendFileSync(path.join(__dirname, "access.log"), str, "utf8")
})

// routes 路由
app.use(require('./routes').routes(), require('./routes').allowedMethods())

// error-handling  错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
