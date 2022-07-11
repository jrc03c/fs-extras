const fs = require("fs")
const getFilesDeepSync = require("./get-files-deep-sync.js")

function moveSync(src, dest) {
  const stat = fs.lstatSync(src)

  if (stat.isFile() || stat.isSymbolicLink()) {
    const destParts = dest.split("/")
    const destDir = destParts.slice(0, destParts.length - 1).join("/")

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }

    fs.renameSync(src, dest)
    return true
  } else {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }

    const children = getFilesDeepSync(src)

    children.forEach(child => {
      moveSync(child, child.replace(src, dest))
    })

    return true
  }
}

module.exports = moveSync
