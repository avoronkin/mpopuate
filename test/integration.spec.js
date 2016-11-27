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
          },
          'comments.user': function (ids) {
            return db.collection('users')
              .find({
                _id: {
                  $in: ids
                }
              })
              .toArray()
          }
        })
          .then(function (posts) {
            console.dir(posts[0].comments, {
              depth: 10
            })

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
                  text: 'comments1 text',
                  user: {
                    _id: id(2),
                    name: 'user2'
                  }
                },
                {
                  _id: id(2),
                  text: 'comments2 text',
                  user: {
                    _id: id(1),
                    name: 'user1'
                  }
                },
                {
                  _id: id(3),
                  text: 'comments3 text',
                  user: {
                    _id: id(3),
                    name: 'user3'
                  }
                },
                {
                  _id: id(4),
                  text: 'comments4 text',
                  user: {
                    _id: id(4),
                    name: 'user4'
                  }
                }
              ]
            })
          })
      })
  })
})
