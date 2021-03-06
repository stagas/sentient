// vector constructor

function Vector (x, y) {
  if (!(this instanceof Vector)) return new Vector(x, y)
  this.set(x, y)
  return this
}

Vector._precision = 2
Vector._dt = 1

Vector.precision = function (n) {
  Vector._precision = n
}

Vector.dt = function (n) {
  if (n) Vector._dt = n
}

Vector.prototype.dt = function () {
  return this.copy().mul(Vector._dt)
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

Vector.prototype.copyTo = function (vec) {
  vec.x = this.x
  vec.y = this.y
  return vec
}

Vector.prototype.get = function () {
  return this
}

Vector.prototype.rand = function (x, y) {
  this.x = Math.random() * (x || 1)
  this.y = Math.random() * (y || x || 1)
  return this
}

Vector.prototype.keepCircleInBox = function (radius, box) {
  radius = radius[0]

  var nw = box.nw
  var se = box.se

  if (this.x < nw.x + radius)
      this.x = nw.x + radius
  else
  if (this.x > se.x - radius) 
      this.x = se.x - radius
  
  if (this.y < nw.y + radius)
      this.y = nw.y + radius
  else
  if (this.y > se.y - radius)
      this.y = se.y - radius

  return this
}

Vector.prototype.interpolate = function (b, f) {
  this.plus(b.minus(this).mul(f))
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

V.sub = V.minus = function (x, y) {
  this.x -= x
  this.y -= y
  return this
}

V.add = V.plus = function (x, y) {
  this.x += x
  this.y += y
  return this
}

V.mul = V.times = function (x, y) {
  this.x *= x
  this.y *= y
  return this
}

V.div = V.divide = function (x, y) {
  this.x /= x
  this.y /= y
  return this
}

V.abs = V.absolute = function () {
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

V.neg = V.negate = function () {
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

V.half = function () {
  return this.div(2)
}

V.round = function () {
  this.x = Math.round(this.x)
  this.y = Math.round(this.y)
  return this
}

V.sqrt = function () {
  this.x = Math.sqrt(this.x)
  this.y = Math.sqrt(this.y)
  return this
}

Object.keys(V).forEach(function (k) {
  var fn = V[k]
  Vector.prototype[k] = function (x, y) {
    var o = san(x, y)
    var ret = fn.call(this, o.x, o.y)
    this[0] = this.x
    this[1] = this.y
    return ret
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
  return { x: x, y: y, 0: x, 1: y }
}
