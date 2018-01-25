const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

const baseUrl = "://api.eshengeshu.com/mock/"

function ajaxReturn(status = 1, info = "success", data = {}) {
    return {
        status: status,
        info: info,
        data: data
    }
}

const IndexModel = async function (data) {
    let fileName = data.mockId || crypto.randomBytes(8).toString("hex")
    var result

    try{
        fs.writeFileSync(path.resolve(__dirname, `../JSON/${fileName}.json`), data.jsonText)
        return ajaxReturn(1, "success", { mockUrl: `${data.protocol}${baseUrl}${fileName}.json`, mockId: fileName })
    }catch(e){
        return ajaxReturn(0, `Mock出错，请重试`)
    }

}

module.exports = IndexModel
