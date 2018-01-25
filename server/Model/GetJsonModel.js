const fs = require("fs")
const path = require("path")

function ajaxReturn(status = 1, info = "success", data = {}) {
    return {
        status: status,
        info: info,
        data: data
    }
}

const GetJsonModel = async function (fileName) {

    if (!fileName) {
        return 404
    }

    if (!fs.existsSync(path.resolve(__dirname, `../JSON/${fileName}`))) {
        return 404
    }

    try {
        return JSON.parse(JSON.stringify(fs.readFileSync(path.resolve(__dirname, `../JSON/${fileName}`)).toString()))
    } catch (e) {
        return 500
    }

}

module.exports = GetJsonModel
