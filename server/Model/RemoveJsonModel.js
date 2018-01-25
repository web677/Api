const Mock = require('../DB/mock')
const DB = require('./CommonMongodbModel')

function ajaxReturn(status = 1, info = "success", data = {}) {
    return {
        status: status,
        info: info,
        data: data
    }
}

const RemoveJsonModel = async function (data) {
    let _mockId = data.mockId

    if (!_mockId){
        return ajaxReturn(0, "接口不存在！")
    }

    let _result = await DB.find({ mockId: _mockId }, Mock)

    if(_result.code !== 2001){
        return ajaxReturn(0, "接口不存在！")
    }

    let result = await DB.delete({ mockId: _mockId }, Mock)

    if(result === 3001){
        return ajaxReturn(1, "success")
    }

    return ajaxReturn(0, "未知错误")

}

module.exports = RemoveJsonModel
