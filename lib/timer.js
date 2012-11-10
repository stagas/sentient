var merge = require('./utils').merge

/**
 * Timer constructor
 */

function Timer (opts) {
  this.t = 0
  this.dt = 0

  this.now = Date.now()
  this.before = this.now
  this.ft = 0

  this.accumulator = 0

  merge(this, opts)
}

/**
 * Tick timer
 */

Timer.prototype.tick = function() {
  this.now = Date.now()
  this.ft = this.now - this.before
  this.t += this.ft
  this.accumulator += this.ft
  this.before = this.now
}

/**
 * Overflow timer
 * 
 * @return {Boolean} Whether this is an underrun
 */

Timer.prototype.overflow = function () {
  if (this.accumulator >= this.dt) {
    this.accumulator -= this.dt
    return true
  }
  return false
}

/**
 * Calculate alpha
 * 
 * @return {Number} alpha value
 */

Timer.prototype.alpha = function () {
  return this.accumulator / this.dt
}

module.exports = Timer
