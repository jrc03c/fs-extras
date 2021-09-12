const rmDirSync = require("./rm-dir-sync.js")

function rmDir(dir, callback) {
  return new Promise((resolve, reject) => {
    try {
      rmDirSync(dir)
      if (callback) callback()
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = rmDir
