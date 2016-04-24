var _ = require('lodash')

/**
 * [getIds description]
 * @param  {Array|Object} doc - an object or array of objects
 * @param  {string} path - path from which collect ids
 * @return {array} - list of ids
 */
exports.getIds = function getIds (doc, path) {
  var docs = _.isArray(doc) ? doc : [doc]

  return _(docs)
    .map(function (doc) {
      return _.get(doc, path)
    })
    .flattenDeep()
    .compact()
    .uniqBy(function (_id) {
      return _id.toString()
    })
    .value()
}

/**
 * Creates an object composed of passed keys and values generated from the results of running each key thru iteratee.
 * @param  {Array} keys
 * @param  {Function} iterator
 * @return {Object}
 */
exports.zipObjectWith = function zipObjectWith (keys, iterator) {
  var values = _.map(keys, function (key) {
    return iterator(key)
  })

  return _.zipObject(keys, values)
}
