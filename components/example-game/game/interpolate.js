module.exports = function (game) {
  game.on('update', function (a, frame, overrun) {
    if (overrun) return
    game.alpha = {}
    for (var id in game.state.current) {
      if (game.state.previous[id]) {
        game.alpha[id] = { __self__: game.state.current[id].__self__ }
        for (var vec in game.state.previous[id]) {
          if (vec != '__self__') {
            game.alpha[id][vec] = game.state.current[id][vec].copy().interpolate(game.state.previous[id][vec], a).round()
          }
        }
      }
    }
  })
}
