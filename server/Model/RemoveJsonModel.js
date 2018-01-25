const fs = require("fs")
const path = require("path")

function ajaxReturn(status = 1, info = "success", data = {}) {
    return {
        status: status,
        info: info,
        data: data
    }
}

const RemoveJsonModel = async function (data) {
    let fileName = data.mockId

    if (!fileName){
        return ajaxReturn(0, "接口不存在！")
    }

    if (!fs.existsSync(path.resolve(__dirname, `../JSON/${fileName}.json`))){
        return ajaxReturn(0, "接口不存在！")
    }

    try {
        fs.unlinkSync(path.resolve(__dirname, `../JSON/${fileName}.json`))
        return ajaxReturn(1, "删除成功！")
    } catch (e) {
        return ajaxReturn(0, `未知错误，请重试`)
    }

}

module.exports = RemoveJsonModel
