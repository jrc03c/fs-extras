const getDirsRecursiveSync = require("./get-dirs-recursive-sync.js")

function getDirsRecursive() {
  const args = Object.values(arguments)
  const dir = args.filter(a => typeof a === "string")[0]
  const depth = args.filter(a => typeof a === "number")[0]
  const callback = args.filter(a => typeof a === "function")[0]

  return new Promise((resolve, reject) => {
    try {
      const dirs = getDirsRecursiveSync(dir, depth)
      if (callback) callback(dirs)
      resolve(dirs)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = getDirsRecursive
