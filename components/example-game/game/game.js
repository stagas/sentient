var $ = require('jquery')
var sentient = require('sentient')
var V = require('./v')

var game = sentient()

game.use(sentient.loop(60))
game.use(require('./keyboard'))
game.use(require('./control'))
game.use(require('./alien-movement'))
game.use(require('./shoot'))
game.use(require('./motion'))
game.use(require('./borders'))
game.use(require('./state'))
game.use(require('./interpolate'))
game.use(require('./render'))

//
// components
// 
game.use('settings', function (e) {
  e.get = function (k) { return e[k] }
  e.set = function (k, v) { return (e[k] = v) }
})

game.use('defaults', ['settings'], function (e) {
  e.set('friction', V(0.995))
  e.set('accel', V(0.04))
})

game.use('world', ['defaults'], function (e) {
  e.world = e.parent
  e.players = []
})

game.use('dom', function (e) {
  e.el = $('<div class="entity"></div>')

  e.on('start', function () {
    $('body').append(e.el)
  })

  e.on('end', function () {
    e.el.remove()
  })
})

game.use('position', function (e) {
  e.pos = V(0,0)
  e.pos.renderable = true
})

game.use('state', function (e) {
  e.state = function () {
    var state = { __self__: e }
    for (var k in e) {
      if (e[k].renderable) state[k] = e[k].copy()
    }
    return state
  }
})

game.use('motion', ['position'], function (e) {
  e.vel = V(0,0)
})

game.use('inputs', function (e) {
  e.dir = V(0,0)
  e.shoot = V(0)
})

game.use('spaceship', ['state','motion','dom'], function (e) {
  e.size = V(e.el.width(),e.el.height())
})

game.use('player', ['spaceship','inputs'])

game.use('alien', ['player'])

game.use('master', ['player','control'])

//
// entities
//
var world = game.world = game.create('world')

world.master = world.create('master')

for (var i = 100; i--;) {
  world.players.push(world.create('alien'))
}

module.exports = game
