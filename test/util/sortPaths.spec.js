const assert = require('assert')
const sortPaths = require('../../lib/util/sortPaths')

describe('sortPaths', function () {
    it('should sort paths', function () {
        const sorted = sortPaths([
            'author.posts',
            'comments',
            'author comments.user'
        ])

        assert.deepEqual(sorted, [
            'comments',
            'author comments.user',
            'author.posts',
        ])
    })
})
