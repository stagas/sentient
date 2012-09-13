// vector constructor

function Vector (x, y) {
  if (!(this instanceof Vector)) return new Vector(x, y)
  this.set(x, y)
  return this
}

Vector._precision = 2

Vector.prototype.precision = function (n) {
  Vector._precision = n
}

Vector.prototype.toString = function (precision) {
  return (
    this.x.toFixed(precision || Vector._precision)
  + ','
  + this.y.toFixed(precision || Vector._precision)
  )
}

Vector.prototype.copy = function () {
  return new Vector(this)
}

Vector.prototype.get = function () {
  return this
}

var V = {}

V.map = function (fn) {
  fn.call(this)
  return this
}

V.set = function (x, y) {
  this.x = x
  this.y = y
  return this
}

V.sub = function (x, y) {
  this.x -= x
  this.y -= y
  return this
}

V.add = function (x, y) {
  this.x += x
  this.y += y
  return this
}

V.mul = function (x, y) {
  this.x *= x
  this.y *= y
  return this
}

V.div = function (x, y) {
  this.x /= x
  this.y /= y
  return this
}

V.abs = function () {
  this.x = Math.abs(this.x)
  this.y = Math.abs(this.y)
  return this
}

V.range = function (min, max) {
  if (this.x < min) this.x = min
  if (this.y < min) this.y = min
  if (this.x > max) this.x = max
  if (this.y > max) this.y = max
  return this
}

V.neg = function () {
  this.x = -this.x
  this.y = -this.y
  return this
}

V.lt = function (x, y) {
  return (this.x < x && this.y < y)
}

V.gt = function (x, y) {
  return (this.x > x && this.y > y)
}

V.lte = function (x, y) {
  return (this.x <= x && this.y <= y)
}

V.gte = function (x, y) {
  return (this.x >= x && this.y >= y)
}

V.eq = V.equals = function (x, y) {
  return (this.x === x && this.y === y)
}

V.cos = function () {
  return Math.cos(this.x)
}

V.sin = function () {
  return Math.sin(this.x)
}

Object.keys(V).forEach(function (k) {
  var fn = V[k]
  Vector.prototype[k] = function (x, y) {
    var o = san(x, y)
    return fn.call(this, o.x, o.y)
  }
})

// export vector

module.exports = Vector

// utils

// sanitize value

function san (x, y) {
  var xtype = typeof x
  if ('object' === xtype) {
    if (Array.isArray(x)) y = x[1], x = x[0]
    else y = x.y, x = x.x
  }
  else if ('string' === xtype) {
    if ('undefined' === typeof y) y = x.split(','), x = y[0], y = y[1]
    x = parseFloat(x)
    y = parseFloat(y)
  }
  else if ('number' === xtype && 'undefined' === typeof y) y = x
  else if ('undefined' === xtype) x = 0, y = 0
  return { x: x, y: y }
}
