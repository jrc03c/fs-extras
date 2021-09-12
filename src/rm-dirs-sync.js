const fs = require("fs")
const rmDirSync = require("./rm-dir-sync.js")

function rmDirsSync(dirs) {
  dirs.forEach(dir => {
    rmDirSync(dir)
  })
}

module.exports = rmDirsSync
