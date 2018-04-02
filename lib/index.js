const Promise = require('bluebird')
const getValues = require('./util/getValues')
const setValues = require('./util/setValues')

module.exports = function (docs) {
    return async function (config) {
        return Promise.map(Object.keys(config), async paths => {
            const ids = getValues(docs, paths)

            const values = await config[paths](ids)

            setValues(docs, paths, values, '_id')
        })

    }
}
