const fs = require("fs")
const getDirsRecursiveSync = require("./get-dirs-recursive-sync.js")
const getFilesRecursiveSync = require("./get-files-recursive-sync.js")

function rmDirSync(dir) {
  getFilesRecursiveSync(dir).forEach(file => {
    fs.unlinkSync(file)
  })

  getDirsRecursiveSync(dir).forEach(subdir => {
    fs.rmdirSync(subdir)
  })

  fs.rmdirSync(dir)
}
