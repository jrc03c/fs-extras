const fs = require("fs")
const path = require("path")

function getFilesDeepSync(dir, depth) {
  try {
    if (typeof depth !== "number") {
      depth = Infinity
    }

    if (depth <= 0) {
      return []
    }

    dir = path.resolve(dir)

    const children = fs.readdirSync(dir)
    const out = []

    children.forEach(child => {
      const childPath = dir + "/" + child

      if (fs.lstatSync(childPath).isFile()) {
        out.push(childPath)
      } else {
        getFilesDeepSync(childPath, depth - 1).forEach(d => out.push(d))
      }
    })

    return out
  } catch (e) {
    return []
  }
}

module.exports = getFilesDeepSync
