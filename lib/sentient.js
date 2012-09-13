var Entity = require('./entity')

exports = module.exports = function (options) {
  return new Entity(options)
}

exports.loop = require('./loop')
