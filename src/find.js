const findSync = require("./find-sync.js")

function find(dir, pattern, depth, callback) {
  return new Promise((resolve, reject) => {
    try {
      const out = findSync(dir, pattern, depth)
      if (callback) callback(out)
      resolve(out)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = find
