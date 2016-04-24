var assert = require('assert')
var util = require('../../lib/util')
var getIds = util.getIds
var zipObjectWith = util.zipObjectWith

describe('util', function () {
  describe('getIds', function () {
    it("should return empty array if path doesn't found", function () {
      var ids = getIds({}, 'test')

      assert.deepEqual([], ids)
    })

    it('should return array with id', function () {
      var ids = getIds({
        test: 1234
      }, 'test')

      assert.deepEqual([1234], ids)
    })

    it('should return array with ids', function () {
      var ids = getIds([{
        test: 1234
      }, {
        test: 2345
      }, {
        test: 3456
      }], 'test')

      assert.deepEqual([1234, 2345, 3456], ids)
    })

    it('should return array with id', function () {
      var ids = getIds({
        test: {
          foo: 1234
        }
      }, 'test.foo')

      assert.deepEqual([1234], ids)
    })
  })

  describe('zipObjectWith', function () {
    it('should return object created from passed keys', function () {
      var obj = zipObjectWith(['foo', 'bar'], function (key) {
        return key + 2
      })

      assert.deepEqual({
        foo: 'foo2',
        bar: 'bar2'
      }, obj)
    })
  })
})
