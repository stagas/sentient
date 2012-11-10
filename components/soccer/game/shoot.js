module.exports = function (game) {
  game.on('render', function () {
    game.entitiesOf('control').forEach(function (e) {
      if (e.shoot.gt(0)) {
        if (!e.shooting) {
          e.shooting = true
          e.el.css({ backgroundColor: '#eee' })
        }
      }
      else {
        if (e.shooting) {
          e.shooting = false
          e.el.css({ backgroundColor: '#446677' })
        }
      }
    })
  })
}
