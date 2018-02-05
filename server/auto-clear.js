const schedule = require('node-schedule')

const Mock = require('./DB/mock')
const DB = require('./Model/CommonMongodbModel')


let rule = new schedule.RecurrenceRule()
rule.hour = [0, 6, 12, 18]

let j = schedule.scheduleJob(rule, async function () {

    try{
        var timer = new Date()

        let mocks = await DB.find({}, Mock)

        if (mocks.code === 4001){
            return
        }

        if (mocks.code === 4002) {
            throw "error: 数据库删除出错"
            return
        }

        mocks.result.forEach(v => {
            if (timer - v.lastVisitTime > 1000 * 60 * 60 * 24 * 30) {
                DB.delete({mockId: v.mockId}, Mock)
            }
        })
    }catch(e){
        const nodemailer = require('nodemailer')

        let transporter = nodemailer.createTransport({
            service: "qq",
            auth: {
                user: "407907175@qq.com",
                pass: "fwrtffaoplembiei"
            }
        })

        let mailOptions = {
            from: '"来自老李的邮件👻" <407907175@qq.com>',
            to: 'ly@fanli.com',
            subject: '',
            text: 'api.eshengeshu.com',
            html: `过期mock接口清理脚本出错，请尽快处理<br>错误信息：${e}`
        }

        transporter.sendMail(mailOptions)

    }

})

