var mongoose = require('mongoose')
var config = require('../Config/index')

const DB_URL = config.mongodb.host + ":" + config.mongodb.port + "/" + config.mongodb.db

mongoose.connect(DB_URL, { "user": config.mongodb.username, "pass": config.mongodb.password})

mongoose.connection
    .on('connected', function () {
        console.log('Mongoose 成功连接到 ' + DB_URL)
    })
    .on('error', function (err) {
        console.log('Mongoose 连接错误： ' + err)
    })
    .on('disconnected', function () {
        console.log('Mongoose 连接被拒绝')
    })

var mockSchema = new mongoose.Schema({
        mockId: {
            type: String,
            unique: true
        },
        createTime: Date,
        lastVisitTime: Date,
        des: String,
        jsonText: String,
        protocol: String,
        url: String,
        sessionid: String
    }, {
        collection: "mock",
        timestamps: { createdAt: "createTime"}
    })

var Mock = mongoose.model('mock', mockSchema)

module.exports = Mock

