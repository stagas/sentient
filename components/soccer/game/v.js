// vector constructor

function Vector (x, y, z) {
  if (!(this instanceof Vector)) return new Vector(x, y, z)
  this.set(x, y, z)
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
  + ','
  + this.z.toFixed(precision || Vector._precision)
  )
}

Vector.prototype.copy = function () {
  return new Vector(this)
}

Vector.prototype.copyTo = function (vec) {
  vec.x = this.x
  vec.y = this.y
  vec.z = this.z
  return vec
}

Vector.prototype.get = function () {
  return this
}

Vector.prototype.rand = function (x, y, z) {
  this.x = Math.random() * (x || 1)
  this.y = Math.random() * (y || x || 1)
  this.z = Math.random() * (z || y || x || 1)
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

V.set = function (x, y, z) {
  this.x = x
  this.y = y
  this.z = z
  return this
}

V.sub = V.minus = function (x, y, z) {
  this.x -= x
  this.y -= y
  this.z -= z
  return this
}

V.add = V.plus = function (x, y, z) {
  this.x += x
  this.y += y
  this.z += z
  return this
}

V.mul = V.times = function (x, y, z) {
  this.x *= x
  this.y *= y
  this.z *= z
  return this
}

V.div = V.divide = function (x, y, z) {
  this.x /= x
  this.y /= y
  this.z /= z
  return this
}

V.abs = V.absolute = function () {
  this.x = Math.abs(this.x)
  this.y = Math.abs(this.y)
  this.z = Math.abs(this.z)
  return this
}

V.range = function (min, max) {
  if (this.x < min) this.x = min
  if (this.y < min) this.y = min
  if (this.z < min) this.z = min
  if (this.x > max) this.x = max
  if (this.y > max) this.y = max
  if (this.z > max) this.z = max
  return this
}

V.neg = V.negate = function () {
  this.x = -this.x
  this.y = -this.y
  this.z = -this.z
  return this
}

V.lt = function (x, y, z) {
  return (this.x < x && this.y < y && this.z < z)
}

V.gt = function (x, y, z) {
  return (this.x > x && this.y > y && this.z > z)
}

V.lte = function (x, y, z) {
  return (this.x <= x && this.y <= y && this.z <= z)
}

V.gte = function (x, y, z) {
  return (this.x >= x && this.y >= y && this.z >= z)
}

V.eq = V.equals = function (x, y, z) {
  return (this.x === x && this.y === y && this.z === z)
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
  this.z = Math.round(this.z)
  return this
}

V.pow = function (n) {
  this.x = Math.pow(this.x, n)
  this.y = Math.pow(this.y, n)
  this.z = Math.pow(this.z, n)
  return this
}

V.sqrt = function () {
  this.x = Math.sqrt(this.x)
  this.y = Math.sqrt(this.y)
  this.z = Math.sqrt(this.z)
  return this
}

Object.keys(V).forEach(function (k) {
  var fn = V[k]
  Vector.prototype[k] = function (x, y, z) {
    var o = san(x, y)
    var ret = fn.call(this, o.x, o.y, o.z)
    this[0] = this.x
    this[1] = this.y
    this[2] = this.z
    return ret
  }
})

// export vector

module.exports = Vector

// utils

// sanitize value

function san (x, y, z) {
  var xtype = typeof x

  if ('string' == xtype) x = x.split(',').map(Number)
  
  if ('object' == xtype) {
    if (Array.isArray(x)) z = x[2], y = x[1], x = x[0]
    else z = x.z, y = x.y, x = x.x
  }

  x = x || 0
  y = y || x || 0
  z = z || y || x || 0

  var ret = { x:x, y:y, z:z, 0:x, 1:y, 2:z }
  return ret
}
