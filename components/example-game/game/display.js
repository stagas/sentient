function display (a, e) {
  if (!a.pos.equals(e.oldPos)) {
    e.el.css({ left: a.pos.x + 'px', top: a.pos.y + 'px' })
    e.oldPos = a.pos
  }
}

module.exports = function (game) {
  game.on('render', function () {
    for (var id in game.alpha) {
      display(game.alpha[id], game.alpha[id].__self__)
    }
  })
}
