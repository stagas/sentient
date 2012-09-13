module.exports = function (game) {
  function display (e) {
    e.el.css({ left: e.pos.x + 'px', top: e.pos.y + 'px' })
  }
  game.use('render')
  game.on('update', function (a, frame, overrun) {
    if (overrun) return
    game.entitiesOf('render', display)
  })
}
