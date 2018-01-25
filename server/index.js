const Koa = require("koa")
const app = new Koa()

const koaRouter = require("koa-router")()
const koaStatic = require("koa-static")("../web/")
const koaCors = require("koa2-cors")()
const koaBodyParser = require("koa-bodyparser")()

const IndexAction = require("./Action/IndexAction")

const MockAction = require("./Action/MockAction")


koaRouter
    .use("/", IndexAction.routes(), IndexAction.allowedMethods())
    .use("/mock", MockAction.routes(), MockAction.allowedMethods())

app
    .use(koaCors)
    .use(koaBodyParser)
    .use(koaRouter.routes())
    .use(koaRouter.allowedMethods())
    .use(koaStatic)
    .listen(5000)
