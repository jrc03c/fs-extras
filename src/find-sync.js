const getFilesDeepSync = require("./get-files-deep-sync.js")
const getDirsDeepSync = require("./get-dirs-deep-sync.js")
const { sort, set } = require("@jrc03c/js-math-tools")

function findSync(dir, matcher, depth) {
  if (matcher instanceof RegExp || typeof matcher === "string") {
    const originalMatcher = matcher
    matcher = file => file.match(originalMatcher)
  }

  const files = getFilesDeepSync(dir, depth)
  const dirs = getDirsDeepSync(dir, depth)
  const all = files.concat(dirs)
  const out = all.filter(f => matcher(f))
  return sort(set(out))
}

module.exports = findSync
