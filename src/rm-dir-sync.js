const fs = require("fs")
const getDirsDeepSync = require("./get-dirs-deep-sync.js")
const getFilesDeepSync = require("./get-files-deep-sync.js")

function rmDirSync(dir) {
  getFilesDeepSync(dir).forEach(file => {
    fs.unlinkSync(file)
  })

  getDirsDeepSync(dir).forEach(subdir => {
    fs.rmdirSync(subdir)
  })

  fs.rmdirSync(dir)
}
