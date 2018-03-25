var assert = require('assert')
var setValues = require('../../lib/util/setValues')

describe('setValues', function () {

    it('should support several paths', function () {
        const obj = {
            test: 1,
            test2: 2
        }

        setValues(obj,
            'test test2',
            {
                1: {id: 1},
                2: {id: 2}
            }
        )

        assert.deepEqual(obj, {
            test: {id: 1},
            test2: {id: 2}
        })
    })

    it('should support deep path', function () {
        const obj = {
            test: {
                test2: 2
            }
        }

        setValues(obj,
            'test.test2',
            {2: {id: 2}}
        )

        assert.deepEqual(obj, {
            test: {
                test2: {
                    id: 2
                }
            }
        })
    })

    it('should support several deep paths', function () {
        const obj = {
            test: { test2: 1 },
            foo: { bar: 2 }
        }

        setValues(obj,
            'test.test2 foo.bar',
            {
                1: {id: 1},
                2: {id: 2}
            }
        )

        assert.deepEqual(obj, {
            test: { test2: {id: 1} },
            foo: { bar: {id: 2} }
        })
    })

    it('should support arrays', function () {
        const obj = [
            { test2: 2 },
            { test2: 2 },
            { test2: 4 }
        ]

        setValues(obj,
            'test2 foo.bar',
            {
                2: {id: 2},
                4: {id: 4}
            }
        )

        assert.deepEqual(obj, [
            { test2: {id: 2} },
            { test2: {id: 2} },
            { test2: {id: 4} }
        ])
    })

    it('should support nested arrays', function () {
        const obj = { test: [
            { test2: { foo: [ { bar: 2 } ] } },
            { test2: { foo: [ { bar: 2 } ] } },
            { test2: { foo: [ { bar: 4 } ] } }
        ]}

        setValues(obj,
            'test.test2.foo.bar',
            {
                2: {id: 2},
                4: {id: 4}
            }
        )

        assert.deepEqual(obj, { test: [
            { test2: { foo: [ { bar: {id: 2} } ] } },
            { test2: { foo: [ { bar: {id: 2} } ] } },
            { test2: { foo: [ { bar: {id: 4} } ] } }
        ]})
    })
})
