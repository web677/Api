const fs = require("fs")
const crypto = require("crypto")
const koaRouter = require("koa-router")()

const IndexModel = require("../Model/IndexModel")
const RemoveJsonModel = require("../Model/RemoveJsonModel")
const GetHistoryModel = require("../Model/GetHistoryModel")

const Index = async ctx => {
    ctx.response.type = 'html'
    if(!ctx.cookies.get('SESSIONID')){
        ctx.cookies.set('SESSIONID', crypto.randomBytes(8).toString("hex"), { maxAge: 1000 * 60 * 60 * 24 * 365})
    }
    ctx.response.body = fs.createReadStream('../web/index.html')
}

const AjaxMock = async ctx => {
    let result = await IndexModel(ctx.query, ctx.cookies.get('SESSIONID'))
    ctx.response.body = result
}

const RemoveJson = async ctx => {
    let result = await RemoveJsonModel(ctx.query)
    ctx.response.body = result    
}

const GetHistory = async ctx => {
    let result = await GetHistoryModel(ctx.cookies.get('SESSIONID'))
    ctx.response.body = result  
}

koaRouter
    .get(["", "index"], Index)
    .get("ajaxMock", AjaxMock)
    .get("ajaxRemoveHistory", RemoveJson)
    .get("ajaxGetHistory", GetHistory)

module.exports = koaRouter
