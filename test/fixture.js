const id = require('./helper').makeObjectId

exports.posts = [
    {
        _id: id(1),
        title: 'title1',
        author: id(1),
        comments: [
            id(1),
            id(2),
            id(3),
            id(4)
        ]
    },
    {
        _id: id(2),
        title: 'title2',
        author: id(2),
        comments: [
            id(3),
            id(2),
            id(4),
            id(1)
        ]
    }
]

exports.users = [
    {
        _id: id(1),
        name: 'user1'
    },
    {
        _id: id(2),
        name: 'user2'
    },
    {
        _id: id(3),
        name: 'user3'
    },
    {
        _id: id(4),
        name: 'user4'
    }
]

exports.comments = [
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
