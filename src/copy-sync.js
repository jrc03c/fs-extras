const fs = require("fs")
const getFilesDeepSync = require("./get-files-deep-sync.js")

function copySync(src, dest) {
  const stat = fs.lstatSync(src)

  // NOTE: Does directly copying a file using `fs.copyFileSync` work on
  // symbolic links? In other words, is the target of the symlink preserved?
  if (stat.isFile() || stat.isSymbolicLink()) {
    const destParts = dest.split("/")
    const destDir = destParts.slice(0, destParts.length - 1).join("/")

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }

    fs.copyFileSync(src, dest)
    return true
  } else {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }

    const children = getFilesDeepSync(src)

    children.forEach(child => {
      copySync(child, child.replace(src, dest))
    })

    return true
  }
}

module.exports = copySync
