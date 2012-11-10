var merge = require('./utils').merge
var Timer = require('./timer')
var animframe = require('./animframe')

module.exports = function (opts) {
  return function (game) {
    var loop = game.loop = {}

    loop.running = false

    loop.timer = new Timer(opts)
    loop.frame = 0

    loop.start = function () {
      loop.running = true

      // allow entities to fire their .on('start', fn) before ticking
      setTimeout(loop.tick, 0)
    }

    loop.stop = function () {
      loop.running = false
    }

    loop.tick = function () {
      if (loop.running) animframe(loop.tick)
      loop.timer.tick()
      game.frame = ++loop.frame
      game.emit('update', loop.frame, loop.timer.dt, loop.timer.t)
      while (loop.timer.overflow()) {
        game.frame = ++loop.frame
        game.emit('update', loop.frame, loop.timer.dt, loop.timer.t)
      }
      game.emit('render', loop.timer.alpha())
    }

    game.on('start', loop.start)
    game.on('stop', loop.stop)

    merge(loop, opts)
  }
}
