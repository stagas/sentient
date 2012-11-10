function display (a, e) {
  if (!a.pos.equals(e.oldPos)) {
    e.el.css({ left: (a.pos.x - (a.pos.z / 4)) + 'px', top: (a.pos.y - (a.pos.z / 2)) + 'px' })
    if (e.shadow) {
      e.shadow.el.css({ left: (a.pos.x + (a.pos.z / 4)) + 'px', top: (a.pos.y + (a.pos.z / 2)) + 'px' })
    }
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
