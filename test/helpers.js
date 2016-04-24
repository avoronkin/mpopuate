var Promise = require('bluebird')
var ObjectId = require('mongodb').ObjectID
var _ = require('lodash')

var helpers = module.exports = {
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
  },
  dropDb: function (db) {
    return db.dropDatabase()
  },
  fillDb: function (db) {
    return Promise.all([
      db.collection('posts').insertMany(require('./fixtures').posts),
      db.collection('users').insertMany(require('./fixtures').users),
      db.collection('comments').insertMany(require('./fixtures').comments)
    ])
  }
}
