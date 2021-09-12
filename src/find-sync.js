const getFilesDeepSync = require("./get-files-deep-sync.js")
const getDirsDeepSync = require("./get-dirs-deep-sync.js")

function findSync(dir, matcher, depth) {
  if (matcher instanceof RegExp || typeof matcher === "string") {
    const originalMatcher = matcher
    matcher = file => file.match(originalMatcher)
  }

  const files = getFilesDeepSync(dir, depth)
  const dirs = getDirsDeepSync(dir, depth)
  const all = files.concat(dirs)
  const out = all.filter(f => matcher(f))
  out.sort()
  return out
}

module.exports = findSync
