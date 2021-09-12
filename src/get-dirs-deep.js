const getDirsDeepSync = require("./get-dirs-deep-sync.js")

function getDirsDeep() {
  const args = Object.values(arguments)
  const dir = args.filter(a => typeof a === "string")[0]
  const depth = args.filter(a => typeof a === "number")[0]
  const callback = args.filter(a => typeof a === "function")[0]

  return new Promise((resolve, reject) => {
    try {
      const dirs = getDirsDeepSync(dir, depth)
      if (callback) callback(dirs)
      resolve(dirs)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = getDirsDeep
