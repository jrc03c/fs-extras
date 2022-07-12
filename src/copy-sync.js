const fs = require("fs")
const getFilesDeepSync = require("./get-files-deep-sync.js")
const path = require("path")

function copySync(src, dest) {
  const stat = fs.lstatSync(src)
  const isSymbolicLink = stat.isSymbolicLink()

  // files
  if (stat.isFile() || isSymbolicLink) {
    const destParts = dest.split("/")
    const destDir = destParts.slice(0, destParts.length - 1).join("/")

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }

    if (isSymbolicLink) {
      const target = fs.readlinkSync(src)
      fs.symlinkSync(target, dest)
    } else {
      if (fs.existsSync(dest) && fs.lstatSync(dest).isDirectory()) {
        const srcParts = src.split("/")
        const srcName = srcParts[srcParts.length - 1]
        dest = path.join(dest, srcName)
      }

      fs.copyFileSync(src, dest)
    }
  }

  // folders
  else {
    const srcParts = src.split("/")
    const srcName = srcParts[srcParts.length - 1]
    dest = path.join(dest, srcName)
    const destExists = fs.existsSync(dest)

    if (destExists && !fs.lstatSync(dest).isDirectory()) {
      throw new Error(
        `Cannot copy a directory into a file! ("${src}" → "${dest}")`
      )
    }

    if (!destExists) {
      fs.mkdirSync(dest, { recursive: true })
    }

    const children = getFilesDeepSync(src)

    children.forEach(child => {
      copySync(child, child.replace(src, dest))
    })
  }

  return true
}

module.exports = copySync
