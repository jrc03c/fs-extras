const copySync = require("./copy-sync.js")
const fs = require("fs")

function moveSync(src, dest) {
  copySync(src, dest)

  if (fs.lstatSync(src).isDirectory()) {
    fs.rmSync(src, { recursive: true, force: true })
  } else {
    fs.unlinkSync(src)
  }

  return true
}

module.exports = moveSync
