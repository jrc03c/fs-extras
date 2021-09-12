const rmFilesSync = require("./rm-files-sync.js")

function rmFiles(files, callback) {
  return new Promise((resolve, reject) => {
    try {
      rmFilesSync(files)
      if (callback) callback()
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = rmFiles
