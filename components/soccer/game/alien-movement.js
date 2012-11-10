var V = require('./v')

module.exports = function (game) {
  game.on('update', function () {
    if (0 == Date.now() % 10) {
      game.entitiesOf('alien').forEach(function (e) {
        e.dir = V().rand(2).round().minus(1)
      })
    }
  })
}
