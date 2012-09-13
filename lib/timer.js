/**
 * Timer constructor
 */

function Timer () {
  this.now = new Date()
  this.before = this.now
  this.delta = 0
  this.accumulator = 0
  this.fps(60)
}

/**
 * FPS getter/setter
 * @param  {Number} fps Frames per second
 * @return {Number} fps
 */
Timer.prototype.fps = function (fps) {
  this._fps = fps || this._fps
  this.ms = 1000 / this._fps
  return this._fps
}

/**
 * Tick timer
 */

Timer.prototype.tick = function() {
  this.now = new Date()
  this.delta = this.now - this.before
  this.accumulator += this.delta
  this.before = this.now
}

/**
 * Overflow timer
 * 
 * @return {Boolean} Whether this is an underrun
 */

Timer.prototype.overflow = function () {
  if (this.accumulator >= this.ms) {
    this.accumulator -= this.ms
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
  return this.accumulator / this.ms
}

module.exports = Timer
