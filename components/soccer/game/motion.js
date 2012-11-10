var V = require('./v')

module.exports = function (game) {
  game.on('update', function () {
    game.entitiesOf('motion').forEach(function (e) {
      e.vel.add(e.dir.copy().mul(e.accel))
      e.pos.add(e.vel)
      e.vel.mul(e.world.friction)
    })
  })
}
