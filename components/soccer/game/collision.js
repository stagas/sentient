var V = require('./v')

module.exports = function (game) {
  game.on('update', function () {
    var ships = game.entitiesOf('spaceship')
    ships.forEach(function (a) {
      ships.forEach(function (b) {
        if (a === b) return
        if (a.width[0] <= 0 || b.width[0] <= 0) return
        var coll = circleToCircle(a.pos, b.pos, a.radius, b.radius)
        if (!coll) return
        if (a.width[0] > b.width[0]) a.width.add(0.2), b.width.sub(0.2)
        else if (b.width[0] > a.width[0]) b.width.add(0.2), a.width.sub(0.2)

        a.radius = V(a.width).half()
        b.radius = V(b.width).half()
        
        a.collided = true
        b.collided = true
      })
    })
  })

  game.on('render', function () {
    var ships = game.entitiesOf('spaceship')
    ships.forEach(function (e) {
      if (e.collided) {
        e.setSize(e.width)
        e.collided = false
      }
    })
  })
}

function circleToCircle (a, b, ra, rb) {
  var d = b.copy().minus(a)
  var dist = V(Math.sqrt(d.x*d.x + d.y*d.y))
  var minDist = V(0).add(ra).add(rb)
  //console.log(dist[0], minDist[0])
  if (dist.lt(minDist)) {
    var angle = Math.atan2(d.y, d.x) * 180 / Math.PI
    var n = V(Math.cos(angle[0]) * (minDist[0] - dist[0]))
    var s = n.copy().minus(b)
    var na = V(Math.atan2(s.y, s.x) * 180 / Math.PI)
    return [n,s,na]
  }
}
