const fs = require("fs")
const path = require("path")
const { sort, set } = require("@jrc03c/js-math-tools")

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
      const stat = fs.lstatSync(childPath)

      if (stat.isFile()) {
        out.push(childPath)
      } else if (stat.isSymbolicLink()) {
        const target = fs.readlinkSync(childPath)

        if (fs.lstatSync(target).isFile()) {
          out.push(childPath)
        }
      } else {
        getFilesDeepSync(childPath, depth - 1).forEach(d => out.push(d))
      }
    })

    return sort(set(out))
  } catch (e) {
    return []
  }
}

module.exports = getFilesDeepSync
