const Mock = require('../DB/mock')
const DB = require('./CommonMongodbModel')

function ajaxReturn(status = 1, info = "success", data = {}) {
    return {
        status: status,
        info: info,
        data: data
    }
}

const GetJsonModel = async function (mockId) {

    if (!mockId) {
        return 404
    }

    if (!/(\.json){1}$/.test(mockId)){
        return 404
    }

    let _mockId = mockId.replace(/(\.json){1}$/, "")

    let exsits = await DB.find({ mockId: _mockId}, Mock)

    if (exsits.code === 4001) {
        return 404
    }

    if (exsits.code === 4002) {
        return 500
    }

    DB.update({
        mockId: mockId,
        newValue: {
            lastVisitTime: new Date().getTime()
        }
    }, Mock)

    return exsits.result[0].jsonText

}

module.exports = GetJsonModel
