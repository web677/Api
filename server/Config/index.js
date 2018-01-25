var ENV = require("./ENV")

module.exports = {
    mongodb: {
        host: "mongodb://127.0.0.1",
        port: ENV == "DEVELOP" ? "27017" : "19911",
        db: "Api",
        username: "laoli",
        password: "laoli"
    }
}
