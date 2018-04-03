const mpopulate = require('../lib')
const assert = require('assert')
const helper = require('./helper')
const fixtures = require('./fixture')
const { MongoClient, ObjectId } = require('mongodb')
const id = helper.makeObjectId

describe('mpopulate', function () {
    let db

    beforeEach(async () => {
        const client = await MongoClient.connect('mongodb://localhost:27017/mpopulate-test')
        db = client.db('mpopulate-test')
        await db.dropDatabase()
        await Promise.all([
            db.collection('posts').insertMany(fixtures.posts),
            db.collection('users').insertMany(fixtures.users),
            db.collection('comments').insertMany(fixtures.comments)
        ])
    })

    it('should populate', async () => {
        const posts = await db.collection('posts').find().toArray()

        await mpopulate(posts)({
            'author comments.user': function (ids) {
                return db.collection('users').find({
                    _id: {
                        $in: ids.map(ObjectId)
                    }
                }).toArray()
            },
            comments: function (ids) {
                return db.collection('comments').find({ _id: {
                    $in: ids.map(ObjectId)
                }}).toArray()
            },
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
                    text: 'text1',
                    user: {
                        _id: id(2),
                        name: 'user2'
                    }
                },
                {
                    _id: id(2),
                    text: 'text2',
                    user: {
                        _id: id(1),
                        name: 'user1'
                    }
                },
                {
                    _id: id(3),
                    text: 'text3',
                    user: {
                        _id: id(3),
                        name: 'user3'
                    }
                },
                {
                    _id: id(4),
                    text: 'text4',
                    user: {
                        _id: id(4),
                        name: 'user4'
                    }
                }
            ]
        })
    })
})