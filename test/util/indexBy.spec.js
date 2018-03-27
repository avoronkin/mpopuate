const assert = require('assert')
const indexBy = require('../../lib/util/indexBy')

describe('indexBy', function () {

    it('should create index object', function () {
        const obj = [
            {id: 1},
            {id: 2},
            {ids: 3}
        ]

        const index = indexBy(obj, 'id')

        assert.deepEqual(index, {
            1: {id: 1},
            2: {id: 2}
        })
    })
})
