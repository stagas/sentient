function Entities () {
  this.entities = {}
}

module.exports = Entities

Entities.prototype.add = function (entity) {
  this.entities[entity.id] = entity
}

Entities.prototype.remove = function (entity) {
  delete this.entities[entity.id]
}

Entities.prototype.forEach = function (fn) {
  var entity
  for (var id in this.entities) {
    entity = this.entities[id]
    fn(entity)
  }
}
