const getDirsDeepSync = require("../src/get-dirs-deep-sync.js")
const config = require("./setup-and-teardown.js")
const { sort, set } = require("@jrc03c/js-math-tools")

test("tests that directories can be gotten deeply and synchronously", () => {
  // const results = [config.root].concat(getDirsDeepSync(config.root))
  // expect(results).toStrictEqual(sort(set(config.dirs)))
})

test("tests that directories can be gotten shallowly and synchronously", () => {
  // const depth = 3
  // const resultsPred = [config.root].concat(getDirsDeepSync(config.root, depth))
  //
  // const resultsTrue = config.dirs.filter(dir => {
  //   const parts = dir
  //     .replaceAll(config.root, "")
  //     .split("/")
  //     .filter(p => p.length > 0)
  //
  //   return parts.length <= depth
  // })
  //
  // expect(sort(set(resultsPred))).toStrictEqual(sort(set(resultsTrue)))
})
