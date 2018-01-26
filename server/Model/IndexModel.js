const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

const baseUrl = "://api.eshengeshu.com/mock/"

const Mock = require('../DB/mock')
const DB = require('./CommonMongodbModel')

function ajaxReturn(status = 1, info = "success", data = {}) {
    return {
        status: status,
        info: info,
        data: data
    }
}

const IndexModel = async function (data, sessionid) {
    let mockId = data.mockId || crypto.randomBytes(8).toString("hex")
    var result

    let exsits = await DB.find({ mockId: mockId}, Mock)

    if (exsits.code === 4001){
        console.log(data.protocol)
        result = await DB.add({
            mockId: mockId,
            createTime: new Date().getTime(),
            lastVisitTime: new Date().getTime(),
            des: data.des,
            protocol: data.protocol,
            jsonText: data.jsonText,
            url: `${data.protocol}${baseUrl}${mockId}.json`,
            sessionid: sessionid
        }, Mock)
    }else{
        result = await DB.update({
            mockId: mockId,
            newValue: {
                createTime: new Date().getTime(),
                lastVisitTime: new Date().getTime(),
                des: data.des,
                protocol: data.protocol,
                jsonText: data.jsonText,
                url: `${data.protocol}${baseUrl}${mockId}.json`,
                sessionid: sessionid
            }
        }, Mock)
    }

    if(result !== 3001 && result !== 5001){
        return ajaxReturn(0, `Mock出错：${result}`)
    }

    return ajaxReturn(1, "success", { mockUrl: `${data.protocol}${baseUrl}${mockId}.json`, mockId: mockId })

}

module.exports = IndexModel
