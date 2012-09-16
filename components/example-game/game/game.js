var $ = require('jquery')
var sentient = require('sentient')
var V = require('./v')

var game = sentient()

game.use(sentient.loop(60))
game.use(require('./renderer'))
game.use(require('./keyboard'))
game.use(require('./motion'))
game.use(require('./control'))
game.use(require('./shoot'))
game.use(require('./dom'))

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
})

game.use('position', function (e) {
  e.pos = V(0,0)
})

game.use('motion', ['position'], function (e) {
  e.vel = V(0,0)
})

game.use('inputs', function (e) {
  e.dir = V(0,0)
  e.shoot = V(0)
})

game.use('spaceship', ['motion','dom'])
game.use('player', ['spaceship','inputs'])
game.use('master', ['player','control'])

var world = game.world = game.create('world')

world.master = world.create('master')

module.exports = game
