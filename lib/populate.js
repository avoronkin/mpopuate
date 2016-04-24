var Promise = require('bluebird')
var _ = require('lodash')
var wrapped = require('wrapped')
var util = require('./util')

module.exports = function (docs) {
  var isArray = _.isArray(docs)
  docs = _.isArray(docs) ? docs : [docs]

  return function (options, cb) {
    var promise = new Promise(function (resolve, reject) {
      var paths = _.keys(options)
      var ids = util.zipObjectWith(paths, function (path) {
        return util.getIds(docs, path)
      })

      var promises = _.map(options, function (handler, path) {
        return Promise.fromCallback(function (callback) {
          wrapped(handler)(ids[path], callback)
        })
          .then(function (results) {
            var index = _.keyBy(results, '_id')

            _.each(docs, function (obj) {
              var id = _.get(obj, path)

              if (_.isArray(id)) {
                _.set(obj, path, _.map(id, function (id) {
                  return index[id]
                }))
              } else {
                _.set(obj, path, index[id])
              }
            })
          })
      })

      Promise.all(promises)
        .then(function () {
          var results = isArray ? docs : docs[0]
          resolve(results)
        })
    })

    return promise.asCallback(cb)
  }
}
