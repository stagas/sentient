module.exports = function (game) {
  game.on('update', function () {
    game.entitiesOf('control').forEach(function (e) {
      if (e.shoot.gt(0)) {
        if (!e.shooting) {
          e.shooting = true
          e.el.addClass('shooting')
        }
      }
      else {
        if (e.shooting) {
          e.shooting = false
          e.el.removeClass('shooting')
        }
      }
    })
  })
}
