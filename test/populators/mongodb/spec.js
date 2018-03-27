const mpopulate = require('../../../lib/populators/mongodb')
const assert = require('assert')
const helper = require('./helper')
const fixtures = require('./fixture')
const MongoClient = require('mongodb').MongoClient
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

        // const populate = populator([
        //     {
        //         type: 'mongodb',
        //         from: 'users',
        //         localField: 'author',
        //         foreignField: '_id',
        //         db
        //     },
        //     {
        //         type: 'mongodb',
        //         from: 'comments',
        //         localField: 'comments',
        //         foreignField: '_id',
        //         db
        //     }
        // ])

        await mpopulate({
            docs: posts,
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            db
        })

        await mpopulate({
            docs: posts,
            from: 'comments',
            localField: 'comments',
            foreignField: '_id',
            db
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
