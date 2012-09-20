module.exports = function (game) {
  game.state = { previous: {}, current: {} }
  game.on('update', function (a, frame, overrun) {
    if (overrun) return
    game.state.previous = game.state.current
    game.state.current = {}
    game.entitiesOf('state').forEach(function (e) {
      game.state.current[e.id] = e.state()
    })
  })
}
