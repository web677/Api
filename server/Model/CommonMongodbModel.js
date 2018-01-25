/* code
    2001: 查询成功
    3001: 操作成功
    4001: 用户不存在
    4002: 查询出错
    5001: 更新成功
*/

module.exports = {
    add: async (data, Model) => {
        let _mock = new Model(data)
        let result = await _mock.save()
            .then(CommandResult => {
                return 3001
            })
            .catch(err => {
                return err
            })
        return result
    },
    update: async (data, Model) => {
        let result = await Model.update({mockId: data.mockId}, {$set: data.newValue})
            .then(CommandResult => {
                return 5001
            })
            .catch(err => {
                return `更新出错：${err}`
            })
        return result
    },
    delete: async (query, Model) => {
        let result = await Model.remove(query)
            .then(CommandResult => {

                if (CommandResult.n == 0) {
                    return 4001
                } else {
                    return 3001
                }
            })
            .catch(err => {
                return err
            })

        return result
    },
    find: async (query, Model) => {

        let result = await Model.find(query)
            .then(result => {
                if (result.length == 0) {
                    return {
                        code: 4001,
                        err: "查询无结果"
                    }
                }
                
                return {
                    code: 2001,
                    result: result
                }
            })
            .catch(err => {
                return {
                    code: 4002,
                    err: err
                }
            })

        return result
    }
}
