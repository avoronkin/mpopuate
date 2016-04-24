# mpopuate
Minimalistic population for node-mongodb-native

[![Build Status](https://travis-ci.org/avoronkin/mpopuate.svg?branch=master)](https://travis-ci.org/avoronkin/mpopuate)
[![Coverage Status](https://coveralls.io/repos/github/avoronkin/mpopuate/badge.svg?branch=master)](https://coveralls.io/github/avoronkin/mpopuate?branch=master)

```javascript
var mc = require('mongodb').MongoClient
var mpopulate = require('mpopulate')

mc.connect('mongodb://localhost:27017/mpopulate')
  .then(function (db) {
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
          }
        })
      })
  })

```
