const fs = require("fs")

function rmFilesSync(files) {
  files.forEach(file => {
    fs.unlinkSync(file)
  })
}

module.exports = rmFilesSync
