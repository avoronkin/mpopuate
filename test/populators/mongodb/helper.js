const ObjectId = require('mongodb').ObjectID
const _ = require('lodash')

const helpers = module.exports = {
    makeId: function (id) {
        return _.padStart(id + '', 24, '0')
    },
    makeObjectId: function (id) {
        id = helpers.makeId(id)

        return ObjectId(id)
    },
    makeObjectIds: function (ids) {
        return ids.map(function (id) {
            return helpers.makeObjectId(id)
        })
    }
}
