module.exports = function (game) {
  game.use('control')
  var shoot = { 90: 1, 16: 1, 17: 1, 18: 1 }
  game.on('keys', function (keys) {
    game.entitiesOf('control').forEach(function (e) {
      e.shoot.set(0)
      e.dir.set(0,0)
      for (var i = keys.length, key; i--;) {
        key = keys[i]
        if (key == 37) e.dir.x = -1
        if (key == 38) e.dir.y = -1
        if (key == 39) e.dir.x = 1
        if (key == 40) e.dir.y = 1
        if (e.dir.x && e.dir.y) e.dir.half()
        if (shoot[key]) e.shoot.set(1)
      }
    })
  })
}
