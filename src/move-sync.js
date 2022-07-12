const copySync = require("./copy-sync.js")
const fs = require("fs")

function moveSync(src, dest) {
  const srcIsADirectory = fs.lstatSync(src).isDirectory()

  if (dest.includes(src) && srcIsADirectory) {
    throw new Error(
      `Cannot move a directory into itself! ("${src}" → "${dest}")`
    )
  }

  copySync(src, dest)

  if (srcIsADirectory) {
    fs.rmSync(src, { recursive: true, force: true })
  } else {
    fs.unlinkSync(src)
  }

  return true
}

module.exports = moveSync
