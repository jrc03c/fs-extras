const copySync = require("./copy-sync.js")

function copy(src, dest, callback) {
  return new Promise((resolve, reject) => {
    try {
      const out = copySync(src, dest)
      if (callback) callback(out)
      return resolve(out)
    } catch (e) {
      return reject(e)
    }
  })
}

module.exports = copy
