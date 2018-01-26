const Mock = require('../DB/mock')
const DB = require('./CommonMongodbModel')

function ajaxReturn(status = 1, info = "success", data = {}) {
    return {
        status: status,
        info: info,
        data: data
    }
}

const GetHistoryModel = async function (sessionid) {

    let exsits = await DB.find({ sessionid: sessionid}, Mock)

    if (exsits.code !== 2001){
        return ajaxReturn(0, "暂无访问记录")
    }

    let _result = []

    exsits.result.forEach( v => {
        _result.push({
            mockId: v.mockId,
            des: v.des,
            jsonText: JSON.stringify(v.jsonText),
            protocol: v.protocol,
            url: v.url,
            goingInvalid: (new Date() - v.lastVisitTime) > 1000 * 60 * 60 * 24 * 6 ? 1 : 0
        })
    })

    return ajaxReturn(1, "success" , { history: _result})

}

module.exports = GetHistoryModel
