var $ = require('jquery')
var sentient = require('sentient')
var V = require('./v')

var game = sentient()

game.use(sentient.loop({ dt: 60 }))

game.use(require('./keyboard'))
game.use(require('./control'))

game.use(require('./shoot'))

game.use(require('./alien-movement'))
game.use(require('./motion'))
game.use(require('./borders'))
game.use(require('./collision'))

game.use(require('./state'))
game.use(require('./interpolate'))
game.use(require('./display'))

/*game.use(function (game) {
  var stateSeq = []
  game.on('update', function (a, frame) {
    game.entitiesOf('control').forEach(function (e) {

    stateSeq.push()
  })
})*/

//
// components
// 
game.use('settings', function (e) {
  e.get = function (k) { return e[k] }
  e.set = function (k, v) { return (e[k] = v) }
})

game.use('defaults', ['settings'], function (e) {
  e.set('friction', V(0.974))
  e.set('accel', V(0.16))
})

game.use('world', ['defaults'], function (e) {
  e.world = e.parent
  e.players = []
})

function Sprite (el) {
  this.el = el
}

Sprite.prototype.setSize = function (width, height) {
  if (!height) height = width
  width = V(width)
  height = V(height)
  this.el.css({
    width: width[0] + 'px'
  , height: height[0] + 'px'
  , marginLeft: -(width[0]/2) + 'px'
  , marginTop: -(height[0]/2) + 'px'
  })
  return this
}

game.use('dom', function (e) {
  Sprite.call(e, $('<div class="entity"></div>'))
  for (var k in Sprite.prototype) {
    e[k] = Sprite.prototype[k]
  }

  e.on('start', function () {
    $('body').append(e.el)
  })

  e.on('end', function () {
    e.el.remove()
  })
})

game.use('position', function (e) {
  e.pos = V(0,0).rand(500,500)
  e.pos.renderable = true
})

game.use('randomizer', function (e) {
  e.width = V(10).add(V(0).rand(20)).round()
  e.radius = V(e.width).div(2)
  e.setSize(e.width)
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

game.use('spaceship', ['state','randomizer','motion','dom'], function (e) {
  e.size = V(e.el.width(),e.el.height())
})

game.use('player', ['spaceship','inputs'])

game.use('alien', ['player'])

game.use('master', ['player','control'], function (e) {
  //e.el.css({ boxShadow: '0px 0px 0px 3px #aaa' })
})

//
// entities
//
var world = game.world = game.create('world')

world.master = world.create('master')

for (var i = 20; i--;) {
  world.players.push(world.create('alien'))
}

module.exports = game
