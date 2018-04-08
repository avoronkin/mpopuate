const Promise = require('bluebird')
const getValues = require('./util/getValues')
const setValues = require('./util/setValues')
const sortPaths = require('./util/sortPaths')
const { ObjectId } = require('mongodb')

module.exports = function (configs, populators) {
    return async function (docs) {
        const groupedByFrom = configs.reduce((grouped, config) => {
            grouped[config.from] = grouped[config.from] || []
            grouped[config.from].push(config.localField)

            return grouped
        }, {})

        const paths = Object.values(groupedByFrom).map(a => a.join(' '))
        const deps = sortPaths(paths)

        return Promise.mapSeries(deps, async paths => {
            const config = configs.find(config => {
                return config.localField === paths
            })

            const type = config.type || 'mongodb'
            const ids = getValues(docs, paths)

            if (type === 'mongodb') {
                const foreignField = config.foreignField || '_id'
                const values = await populators.mongodb.db.collection(config.from).find({
                    _id: {
                        $in: foreignField === '_id' ? ids.map(ObjectId) : ids
                    }
                }).toArray()

                setValues(docs, paths, values, '_id')
            }

        })

    }
}
