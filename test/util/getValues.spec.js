const assert = require('assert')
const getValues = require('../../lib/util/getValues')
const { makeObjectId } = require('../helper')

describe('getValues', function () {
    it('should return empty array if path doesn\'t found', function () {
        const value = getValues({}, 'test test2')

        assert.deepEqual(value, [])
    })

    it('should support several paths', function () {
        const value = getValues({
            test: false,
            test2: true
        }, 'test test2')

        assert.deepEqual(value, [false, true])
    })

    it('should support deep path', function () {
        const value = getValues({
            test: {
                test2: 2
            }
        }, 'test.test2')

        assert.deepEqual(value, [2])
    })

    it('should support several deep paths', function () {
        const value = getValues({
            test: {
                test2: 2
            },
            foo: {
                bar: 0
            }
        }, 'test.test2 foo.bar')

        assert.deepEqual(value, [2, 0])
    })

    it('should support arrays', function () {
        const value = getValues({
            test: [{
                test2: 2
            }, {
                test2: 2
            }, {
                test2: 4
            }]
        }, 'test.test2 foo.bar')

        assert.deepEqual(value, [2, 4])
    })

    it('should support arrays', function () {
        const value = getValues({
            test: [{
                test2: {
                    foo: [
                        {
                            bar: makeObjectId(2)
                        }
                    ]
                }
            }, {
                test2: {
                    foo: [
                        {
                            bar: makeObjectId(2)
                        }
                    ]
                }
            }, {
                test2: {
                    foo: [
                        {
                            bar: makeObjectId(4)
                        }
                    ]
                }
            }]
        }, 'test.test2.foo.bar')

        assert.deepEqual(value, [
            '000000000000000000000002',
            '000000000000000000000004'
        ])
    })
})
