# mpopuate
Minimalistic population for node-mongodb-native

[![Build Status](https://travis-ci.org/avoronkin/mpopuate.svg?branch=master)](https://travis-ci.org/avoronkin/mpopuate)
[![Coverage Status](https://coveralls.io/repos/github/avoronkin/mpopuate/badge.svg?branch=master)](https://coveralls.io/github/avoronkin/mpopuate?branch=master)

```javascript
var mc = require('mongodb').MongoClient
var mpopulate = require('mpopulate')

mc.connect('mongodb://localhost:27017/mpopulate').then(function (db) {
  return db.collection('posts').find().toArray().then(function (posts) {
    console.log(posts)
    // [{
    //   _id: 1,
    //   title: 'title',
    //   author: 1
    // }]
    return mpopulate(posts)({
      author: function (ids) {
        return db.collection('users').find({
          _id: {
            $in: ids
          }
        })
        .toArray()
      }
    })
  })
  .then(function (posts) {
    console.log(posts)
    // [{
    //   _id: 1,
    //   title: 'title',
    //   author: {
    //     _id: 1
    //     name: 'name'
    //   }
    // }]
  })
})


```
