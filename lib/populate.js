var Promise = require('bluebird')
var _ = require('lodash')
var wrapped = require('wrapped')
var util = require('./util')

module.exports = function (docs) {
  var isArray = _.isArray(docs)
  docs = _.isArray(docs) ? docs : [docs]

  return function (options, cb) {
    var paths = _.keys(options)

    return Promise.reduce(paths, function (acc, path) {
      var handler = options[path]
      return Promise.fromCallback(function (callback) {
        var ids = util.getIds(docs, path)
        wrapped(handler)(ids, callback)
      })
        .then(function (results) {
          var index = _.keyBy(results, '_id')

          _.each(docs, function (obj) {
            var id = _.get(obj, path)
            id = util.get(obj, path)

            if (_.isArray(id)) {
              util.set(obj, path, _.map(_.flattenDeep(id), function (id) {
                return index[id]
              }))
            } else {
              util.set(obj, path, index[id])
            }
          })
        })
    }, 0)
      .then(function () {
        var results = isArray ? docs : docs[0]
        return results
      })
      .asCallback(cb)
  }
}
