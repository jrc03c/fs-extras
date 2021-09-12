const fs = require("fs")
const path = require("path")

function getAllDirsRecursiveSync(dir, depth) {
  try {
    if (typeof depth === "number" && depth <= 0) {
      return []
    }

    dir = path.resolve(dir)

    const children = fs.readdirSync(dir)
    const out = []

    children.forEach(child => {
      const childPath = dir + "/" + child

      if (!fs.lstatSync(childPath).isFile()) {
        out.push(childPath)
        getAllDirsRecursiveSync(childPath, depth - 1).forEach(d => out.push(d))
      }
    })

    return out
  } catch (e) {
    return []
  }
}

module.exports = getAllDirsRecursiveSync
