var assert = require('assert')
var getValues = require('../../lib/util/getValues')

describe('getValues', function () {
    it('should return empty array if path doesn\'t found', function () {
        var value = getValues({}, 'test test2')

        assert.deepEqual(value, [])
    })

    it('should support several paths', function () {
        var value = getValues({
            test: false,
            test2: true
        }, 'test test2')

        assert.deepEqual(value, [false, true])
    })

    it('should support deep path', function () {
        var value = getValues({
            test: {
                test2: 2
            }
        }, 'test.test2')

        assert.deepEqual(value, [2])
    })

    it('should support several deep paths', function () {
        var value = getValues({
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
        var value = getValues({
            test: [{
                test2: 2
            }, {
                test2: 2
            }, {
                test2: 4
            }]
        }, 'test.test2 foo.bar')

        assert.deepEqual(value, [2, 2, 4])
    })

    it('should support arrays', function () {
        var value = getValues({
            test: [{
                test2: {
                    foo: [
                        {
                            bar: 2
                        }
                    ]
                }
            }, {
                test2: {
                    foo: [
                        {
                            bar: 2
                        }
                    ]
                }
            }, {
                test2: {
                    foo: [
                        {
                            bar: 4
                        }
                    ]
                }
            }]
        }, 'test.test2.foo.bar')

        assert.deepEqual(value, [2, 2, 4])
    })
})
