var utils = module.exports = {}

utils.merge = function (a, b) {
  for (var k in b || {}) a[k] = b[k]
  return a
}
