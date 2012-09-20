module.exports = function (game) {
  function display (a, e) {
    if (!a.pos.equals(e.oldPos)) {
      e.el.css({ left: a.pos.x + 'px', top: a.pos.y + 'px' })
      e.oldPos = a.pos
    }
  }
  game.on('update', function (a, frame, overrun) {
    if (overrun) return
    for (var id in game.alpha) {
      display(game.alpha[id], game.alpha[id].__self__)
    }
  })
}
