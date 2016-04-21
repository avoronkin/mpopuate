var mpopulate = require('../')
var assert = require('assert')

describe('populate', function () {
  it('should work', function () {
    var msg = mpopulate()
    assert.equal(msg, 'hello world')
  })
})
