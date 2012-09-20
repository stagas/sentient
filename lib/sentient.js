var Entity = require('./entity')

exports = module.exports = function (options) {
  var e = new Entity(options)
  e.setMaxListeners(1000)
  return e
}

exports.loop = require('./loop')
