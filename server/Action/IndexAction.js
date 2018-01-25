const fs = require("fs")
const koaRouter = require("koa-router")()

const IndexModel = require("../Model/IndexModel")
const RemoveJsonModel = require("../Model/RemoveJsonModel")

const Index = async ctx => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('../web/index.html')
}

const AjaxMock = async ctx => {
    let result = await IndexModel(ctx.query)
    ctx.response.body = result
}

const RemoveJson = async ctx => {
    let result = await RemoveJsonModel(ctx.query)
    ctx.response.body = result    
}


koaRouter
    .get(["", "index"], Index)
    .get("ajaxMock", AjaxMock)
    .get("ajaxRemoveHistory", RemoveJson)

module.exports = koaRouter
