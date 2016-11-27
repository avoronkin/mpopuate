var _ = require('lodash')

function get (obj, path) {
  var paths = path.split(' ')
  var values = []

  paths.forEach(function (path) {
    var parts = path.split('.')
    var pl = parts.length
    var value = obj

    for (var index = 0; index < parts.length; ++index) {
      var part = parts[index]
      if (value) {
        if (Array.isArray(value)) {
          value.forEach(function (item) {
            values = values.concat(get(item, parts.slice(index).join('.')))
          })
          break
        }

        value = value[part]
        if ((pl === index + 1) && typeof value !== 'undefined') {
          values.push(value)
        }
      }
    }
  })

  return values
}

exports.get = get

function set (object, path, value) {
  var paths = path.split(' ')

  paths.forEach(function (path) {
    var pathParts = path.split('.')
    var pl = pathParts.length
    var obj = object

    for (var index = 0; index < pl; index++) {
      var key = pathParts[index]
      if (_.isArray(obj) && typeof obj[key] === 'undefined') {
        obj = _.map(obj, function (item) {
          var _path = pathParts.slice(index).join('.')
          set(item, _path, value)
        })
        break
      } else {
        if (pl === index + 1) {
          obj[key] = value
        } else {
          obj[key] = _.isObject(obj[key]) ? obj[key] : {}
          obj = obj[key]
        }
      }
    }
  })
}

exports.set = set

/**
* getIds
* @param  {Array|Object} doc - an object or array of objects
* @param  {string} path - path from which collect ids
* @return {array} - list of ids
*/
exports.getIds = function getIds (doc, path) {
  var docs = _.isArray(doc) ? doc : [doc]

  return _(docs)
    .map(function (doc) {
      return get(doc, path)
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
