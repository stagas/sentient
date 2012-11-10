var $ = require('jquery')
var sentient = require('sentient')
var V = require('./v')

var game = sentient()

game.use(sentient.loop({ dt: 60 }))

game.use(require('./keyboard'))
game.use(require('./control'))
game.use(require('./mouse'))

game.use(function (game) {
  game.on('update', function () {
    game.entitiesOf('ball-motion').forEach(function (e) {
      var diff = e.target.copy().minus(e.pos).mul(0.19).mul(0.13)
      var z = e.vel.z
      e.vel.interpolate(diff, 0.2)
      e.vel.z = z - e.world.gravity

      if (e.pos.z < 0) {
        e.vel.z = -e.vel.z * e.world.bounce
        e.pos.z = 0
      }
      e.pos.add(e.vel)
      e.vel.mul(e.world.friction, e.world.friction, 1)
    })
  })
})

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
  e.friction = V(0.979)
  e.accel = V(0.16)
  e.gravity = 0.14
  e.bounce = 0.76
})

game.use('world', ['defaults'], function (e) {
  e.world = e.parent
  e.players = []
})

game.use('match', ['world'])

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
  e.pos = V(0,0,0).rand(500,500,0)
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
  e.vel = V(0,0,0)
})

game.use('inputs', function (e) {
  e.dir = V(0,0)
  e.shoot = V(0)
})

game.use('ball-motion', function (e) {
  e.target = V(0,0)
  e.vel = V(0,0,0)
})

game.use('shadow', ['position','dom'], function (e) {
  e.setSize(10)
  e.el.addClass('shadow')
})

game.use('ball-shadow', function (e) {
  e.shadow = game.create('shadow')
  e.shadow.pos.renderable = false
})

game.use('ball', ['state','mouse','ball-shadow','ball-motion','position','dom'], function (e) {
  e.setSize(10)

  function set (mouse, z, mul) {
    e.target.set(mouse.pos)
    if (z) {
      var diff = e.target.copy().minus(e.pos).abs().mul(mul || 0.07).pow(2)
      e.vel.z = Math.sqrt(diff.x + diff.y) * 0.062
    }
  }

  var downInterval
  e.on('mousedown', function (mouse) {
    set(mouse, true, 0.12)
    downInterval = setInterval(function () {
      set(mouse, true)
    }, 100)
  })
  e.on('mouseup', function () {
    clearInterval(downInterval)
  })
  e.on('mousemove', function (mouse) {
    set(mouse)
  })
})

//
// entities
//
var match = game.match = game.create('match')

var ball = match.create('ball')

module.exports = game
