module.exports = function (game) {
  game.on('update', function (a) {
    game.entitiesOf('motion', function (e) {
      //var r = e.angle.copy().mul(Math.PI / 180)
      //e.vel.add(V(r.cos(), r.sin()).mul(e.accel).mul(a))
      e.vel.add(e.dir.copy().mul(e.accel))
      e.pos.add(e.vel)
      e.vel.mul(e.world.friction)
    })
  })
}
