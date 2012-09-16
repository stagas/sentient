var Timer = require('./timer')
var animframe = require('./animframe')

module.exports = function (opts) {
  opts = opts || {}
  if ('number' == typeof opts) opts = { fps: opts }
  return function (game) {
    var loop = {}

    loop.running = false

    loop.timer = new Timer()

    loop.frame = 0

    loop.start = function () {
      loop.running = true

      // allow entities to "start" before ticking
      setTimeout(loop.tick, 0)
    }

    loop.stop = function () {
      loop.running = false
    }

    loop.tick = function () {
      if (loop.running) window.requestAnimationFrame(loop.tick)
      loop.frame++
      loop.timer.tick()
      while (loop.timer.overflow()) {
        loop.frame++
        game.emit('update', 1, loop.frame, true)
      }
      game.emit('update', loop.timer.alpha(), loop.frame)
    }

    if (opts.fps) loop.timer.fps(opts.fps)

    game.on('start', loop.start)
    game.on('stop', loop.stop)
  }
}
