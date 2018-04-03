const Promise = require('bluebird')
const getValues = require('./util/getValues')
const setValues = require('./util/setValues')
const sortPaths = require('./util/sortPaths')

module.exports = function (docs) {
    return async function (config) {
        const deps = sortPaths(Object.keys(config))

        return Promise.mapSeries(deps, async paths => {
            const ids = getValues(docs, paths)

            const values = await config[paths](ids)

            setValues(docs, paths, values, '_id')
        })

    }
}
