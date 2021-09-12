const rmDirsSync = require("./rm-dirs-sync.js")

function rmDirs(dir, callback) {
  return new Promise((resolve, reject) => {
    try {
      rmDirsSync(dir)
      if (callback) callback()
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = rmDirs
