const Promise = require('bluebird')
const getValues = require('./util/getValues')
const setValues = require('./util/setValues')
const sortPaths = require('./util/sortPaths')
const { ObjectId } = require('mongodb')

module.exports = function (configs, populators) {
    return async function (docs, projections) {
        const filtered = []

        configs.forEach(config => {
            const localFields = config.localField.split(/\s+/).filter(localField => {
                return Object.keys(projections).some(projection => {
                    return projection.indexOf(localField) === 0
                })
            })

            if (localFields && localFields.length) {
                config.localField = localFields.join(' ')
                filtered.push(config)
            }
        })

        const groupedByFrom = filtered.reduce((grouped, config) => {
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
                const query = {
                    _id: {
                        $in: foreignField === '_id' ? ids.map(ObjectId) : ids
                    }
                }
                const projection =  getProjection(paths, projections)

                const values = await populators.mongodb.db.collection(config.from)
                    .find(query)
                    .project(projection)
                    .toArray()

                setValues(docs, paths, values, '_id')
            }

        })

    }
}

function getProjection (field, projections) {
    const select = {}

    Object.keys(projections)
        .filter(projection => {
            return field.indexOf(projection) === 0
        })
        .forEach(projection => {
            return Object.assign(select, projections[projection])
        })

    return select
}
