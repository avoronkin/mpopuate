# mpopuate
Minimalistic population for node-mongodb-native

[![Build Status](https://travis-ci.org/avoronkin/mpopuate.svg?branch=master)](https://travis-ci.org/avoronkin/mpopuate)
[![Coverage Status](https://coveralls.io/repos/github/avoronkin/mpopuate/badge.svg?branch=master)](https://coveralls.io/github/avoronkin/mpopuate?branch=master)

```
npm install mpopulate
```


```javascript
const mc = require('mongodb').MongoClient
const mpopulate = require('mpopulate')

const db = await mc.connect('mongodb://localhost:27017/mpopulate')

const posts = await db.collection('posts').find().toArray()

await mpopulate([
    {
        localField: 'author comments.user',
        from: 'users',
        foreignField: '_id',
    },
    {
        localField: 'comments',
        from: 'comments',
        foreignField: '_id',
    }
],{
    mongodb: {
        db
    }
})(posts, {
    author: {name: 1}
})

assert.deepEqual(posts[0], {
    _id: id(1),
    title: 'title1',
    author: {
        _id: id(1),
        name: 'user1'
    },
    comments: [ id(1), id(2), id(3), id(4) ]
})


```
