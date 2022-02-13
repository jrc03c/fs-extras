const fs = require("fs")
const path = require("path")
const { sort, set } = require("@jrc03c/js-math-tools")

function getFilesDeepSync(dir, depth) {
  if (typeof depth !== "number") {
    depth = Infinity
  }

  if (depth <= 0) {
    return []
  }

  dir = path.resolve(dir)

  const children = (() => {
    try {
      return fs.readdirSync(dir)
    } catch (e) {
      return []
    }
  })()

  const out = []

  children.forEach(child => {
    const childPath = dir + "/" + child

    const stat = (() => {
      try {
        return fs.lstatSync(childPath)
      } catch (e) {
        return null
      }
    })()

    if (!stat) return

    if (stat.isFile() || stat.isSymbolicLink()) {
      out.push(childPath)
    } else {
      getFilesDeepSync(childPath, depth - 1).forEach(d => out.push(d))
    }
  })

  return sort(set(out))
}

module.exports = getFilesDeepSync
