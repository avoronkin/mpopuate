var mpopulate = require('../../lib/populate')
var assert = require('assert')

describe('mpopulate', function () {
  it('should return promise', function (done) {
    mpopulate({})({
      'somepath': function (ids) {
        return []
      }
    })
      .then(function () {
        done()
      }, done)
  })

  it('should support node callback style', function (done) {
    mpopulate({})({
      'somepath': function (ids) {
        return []
      }
    }, done)
  })

  it('should return array if array passed', function () {
    return mpopulate([{}])({
      'somepath': function (ids) {
        return []
      }
    })
      .then(function (docs) {
        assert.deepEqual([{somepath: undefined}], docs)
      })
  })

  it('should return object if object passed', function () {
    return mpopulate({})({
      'somepath': function (ids) {
        return []
      }
    })
      .then(function (doc) {
        assert.deepEqual({somepath: undefined}, doc)
      })
  })
})
