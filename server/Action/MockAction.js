const fs = require("fs")
const koaRouter = require("koa-router")()

const GetJsonModel = require("../Model/GetJsonModel")

const Index = async ctx => {
    let result = await GetJsonModel(ctx.params.file)

    if(result == 404){
        ctx.response.status = 404
        ctx.response.body = "<h4>您当前访问的接口不存在</h4>"
        return
    }

    if (result == 500) {
        ctx.response.status = 500
        ctx.response.body = "<h4>服务器遇到了点问题，无法读取您当前访问的接口，请联系管理员处理</h4>"
        return
    }

    ctx.response.type = "json"
    ctx.response.body = result
}

koaRouter
    .get("/:file", Index)

module.exports = koaRouter
