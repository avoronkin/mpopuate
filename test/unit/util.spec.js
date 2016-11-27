var assert = require('assert')
var util = require('../../lib/util')
var getIds = util.getIds
var get = util.get
var set = util.set
var zipObjectWith = util.zipObjectWith

describe('util', function () {
  describe('get', function () {
    it("should return empty array if path doesn't found", function () {
      var value = get({}, 'test test2')
      assert.deepEqual([], value)
    })

    it('should support several paths', function () {
      var value = get({
        test: false,
        test2: true
      }, 'test test2')
      assert.deepEqual([false, true], value)
    })

    it('should support deep path', function () {
      var value = get({
        test: {
          test2: 2
        }
      }, 'test.test2')
      assert.deepEqual([2], value)
    })

    it('should support several deep paths', function () {
      var value = get({
        test: {
          test2: 2
        },
        foo: {
          bar: 0
        }
      }, 'test.test2 foo.bar')
      assert.deepEqual([2, 0], value)
    })

    it('should support arrays', function () {
      var value = get({
        test: [{
          test2: 2
        }, {
          test2: 2
        }, {
          test2: 4
        }]
      }, 'test.test2 foo.bar')
      assert.deepEqual([2, 2, 4], value)
    })

    it('should support arrays', function () {
      var value = get({
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
      assert.deepEqual([2, 2, 4], value)
    })
  })

  describe.only('set', function () {
    it('set deep path', function () {
      var obj = {
        a: 1,
        d: {
          e: {
            f: 5
          }
        }
      }

      set(obj, 'd.e.f', 19)
      set(obj, 'a.b.c', 44)

      assert.deepEqual(obj, {
        a: {
          b: {
            c: 44
          }
        },
        d: {
          e: {
            f: 19
          }
        }
      })
    })

    it('create object if not exists', function () {
      var obj = {}
      set(obj, 'x.y.z', 10)

      assert.deepEqual(obj, {
        x: {
          y: {
            z: 10
          }
        }
      })
    })

    it('set value for all items in array', function () {
      var obj = {
        b: [
          {
            c: {
              a: 9
            }
          },
          {
            c: {
              d: 0
            }
          }
        ]
      }
      set(obj, 'b.c.d', 9)

      assert.deepEqual(obj, {
        b: [
          {
            c: {
              a: 9,
              d: 9
            }
          },
          {
            c: {
              d: 9
            }
          }
        ]
      })
    })

    it('set property in array by index', function () {
      var obj = {
        b: [
          {
            c: {
              a: 9
            }
          },
          {
            c: {
              h: 0
            }
          }
        ]
      }
      set(obj, 'b.0.c.d', 55)

      assert.deepEqual(obj, {
        b: [
          {
            c: {
              a: 9,
              d: 55
            }
          },
          {
            c: {
              h: 0
            }
          }
        ]
      })
    })
  })

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
