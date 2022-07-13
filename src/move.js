const moveSync = require("./move-sync.js")

function move(src, dest, callback) {
  return new Promise((resolve, reject) => {
    try {
      const out = moveSync(src, dest)
      if (callback) callback(out)
      return resolve(out)
    } catch (e) {
      return reject(e)
    }
  })
}

module.exports = move
