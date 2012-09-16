var EventEmitter = require('events').EventEmitter
var Entities = require('./entities')
var inherits = require('util').inherits

function Entity (id, components, parent) {
  this.id = id
  parent = parent || {}
  this.parent = parent
  this.registry = parent.registry || {}
  this.components = parent.registry ? components && parent.components.concat(components) || [] : components || []
  this.children = new Entities
}

inherits(Entity, EventEmitter)

module.exports = Entity

Entity.prototype.use = function (name, components, fn) {
  if (arguments.length == 1) {
    if ('function' == typeof name) {
      fn = name
      fn.call(this, this)
    }
    else {
      this.registry[name] = { components: [], fn: noop }
    }
  }
  else {
    if ('function' == typeof components) {
      fn = components
      components = []
    }
    this.registry[name] = {
      components: components
    , fn: fn || noop
    }
  }
}

function noop () {}

Entity.prototype.create = function (name, opts) {
  var entity = this

  var c = entity.registry[name]
  var e = new Entity((Math.random() * Date.now() | 0).toString(36), [ name ], entity)

  function add (components) {
    components.slice().reverse().forEach(function (n) {
      c = entity.registry[n]
      if (!c) throw new Error('no such component "'+n+'"')
      if (!~e.components.indexOf(n)) {
        e.components.push(n)
      }
      if (c.components.length) add(c.components)
    })
  }

  add(c.components)

  entity.children.add(e)

  e.components.slice().reverse().forEach(function (n) {
    entity.registry[n].inherited = entity.registry[n].inherited || []
    entity.registry[n].inherited.push(e)
    entity.registry[n].fn.call(entity, e)
  })

  return e
}

Entity.prototype.entitiesOf = function (names, fn) {
  if (!Array.isArray(names)) names = [ names ]
  else names = names.slice()

  var entities = []
  var name
  while (name = names.shift()) {
    entities = entities.concat(this.registry[name].inherited || [])
  }
  entities.forEach(fn)
}

Entity.prototype.start = function () {
  this.emit('start')
  this.children.forEach(function (e) {
    e.emit('start')
  })
}

Entity.prototype.end = function () {
  this.emit('end')
  this.children.forEach(function (e) {
    e.emit('end')
  })
}
