var $ = require('jquery')

module.exports = function (game) {
  game.use('dom', ['render'], function (e) {
    e.el = $('<div class="entity"></div>')

    game.on('start', function () {
      $('body').append(e.el)
    })

    game.on('stop', function () {
      e.el.remove()
    })
  })
}
