const fs = require("fs")
const getDirsDeepSync = require("./get-dirs-deep-sync.js")
const getFilesDeepSync = require("./get-files-deep-sync.js")
const path = require("path")

function copySync(src, dest) {
  function helper(src, dest) {
    const stat = fs.lstatSync(src)
    const isSymbolicLink = stat.isSymbolicLink()

    // files
    if (stat.isFile() || isSymbolicLink) {
      if (fs.existsSync(dest)) {
        if (fs.lstatSync(dest).isDirectory()) {
          const srcParts = src.split("/")
          const srcName = srcParts[srcParts.length - 1]

          if (fs.lstatSync(src).isSymbolicLink()) {
            const target = fs.readlinkSync(src)
            fs.symlinkSync(target, path.join(dest, srcName))
          } else {
            fs.copyFileSync(src, path.join(dest, srcName))
          }
        } else {
          fs.unlinkSync(dest)

          if (fs.lstatSync(src).isSymbolicLink()) {
            const target = fs.readlinkSync(src)
            fs.symlinkSync(target, dest)
          } else {
            fs.copyFileSync(src, dest)
          }
        }
      } else {
        const destParts = dest.split("/")
        const destDir = destParts.slice(0, destParts.length - 1).join("/")
        fs.mkdirSync(destDir, { recursive: true })

        if (fs.lstatSync(src).isSymbolicLink()) {
          const target = fs.readlinkSync(src)
          fs.symlinkSync(target, dest)
        } else {
          fs.copyFileSync(src, dest)
        }
      }
    }

    // folders
    else {
      if (fs.existsSync(dest)) {
        if (fs.lstatSync(dest).isDirectory()) {
          const srcParts = src.split("/")
          const srcName = srcParts[srcParts.length - 1]
          helper(src, path.join(dest, srcName))
        } else {
          throw new Error(
            `Cannot copy a directory into a file! ("${src}" → "${dest}")`
          )
        }
      } else {
        fs.mkdirSync(dest, { recursive: true })

        const children = getFilesDeepSync(src)
          .concat(getDirsDeepSync(src))
          .filter(f => !hasAlreadyCopied[f])

        children.forEach(child => {
          helper(child, child.replace(src, dest))
          hasAlreadyCopied[child] = true
        })
      }
    }

    return true
  }

  const hasAlreadyCopied = {}
  return helper(src, dest)
}

module.exports = copySync
