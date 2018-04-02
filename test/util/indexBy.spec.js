const assert = require('assert')
const indexBy = require('../../lib/util/indexBy')
const { makeObjectId } = require('../helper')


describe('indexBy', function () {

    it('should create index object', function () {
        const obj = [
            {id: makeObjectId(1)},
            {id: makeObjectId(2)},
            {id: makeObjectId(2)},
            {ids: makeObjectId(3)}
        ]

        const index = indexBy(obj, 'id')

        assert.deepEqual(index, {
            '000000000000000000000001': {id: makeObjectId(1)},
            '000000000000000000000002': {id: makeObjectId(2)}
        })
    })
})
