var mpopulate = require('../')
var assert = require('assert')
var helpers = require('./helpers')
var MongoClient = require('mongodb').MongoClient
var db
var url = 'mongodb://localhost:27017/mpopulate-test'
var id = helpers.makeObjectId

describe('mpopulate', function () {
  before(function () {
    return MongoClient.connect(url)
      .then(function (_db) {
        db = _db
      })
      .then(function () {
        return helpers.dropDb(db)
      })
      .then(function () {
        return helpers.fillDb(db)
      })
  })

  it('should populate', function () {
    return db.collection('posts').find().toArray()
      .then(function (posts) {
        return mpopulate(posts)({
          author: function (ids) {
            return db.collection('users')
              .find({
                _id: {
                  $in: ids
                }
              })
              .toArray()
          },
          comments: function (ids) {
            return db.collection('comments')
              .find({
                _id: {
                  $in: ids
                }
              })
              .toArray()
          }
        })
          .then(function (posts) {
            assert.deepEqual(posts[0], {
              _id: id(1),
              title: 'title1',
              author: {
                _id: id(1),
                name: 'user1'
              },
              comments: [
                {
                  _id: id(1),
                  text: 'text1',
                  user: id(2)
                },
                {
                  _id: id(2),
                  text: 'text2',
                  user: id(1)
                },
                {
                  _id: id(3),
                  text: 'text3',
                  user: id(3)
                },
                {
                  _id: id(4),
                  text: 'text4',
                  user: id(4)
                }
              ]
            })
          })
      })
  })
})
