const fs = require("fs")
const path = require("path")
const { sort, set } = require("@jrc03c/js-math-tools")

function getAllDirsDeepSync(dir, depth) {
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

      if (stat.isDirectory()) {
        out.push(childPath)
        getAllDirsDeepSync(childPath, depth - 1).forEach(d => out.push(d))
      } else if (stat.isSymbolicLink()) {
        const target = fs.readlinkSync(childPath)

        if (fs.lstatSync(target).isDirectory()) {
          out.push(childPath)
        }
      }
    })

    return sort(set(out))
  } catch (e) {
    return []
  }
}

module.exports = getAllDirsDeepSync
