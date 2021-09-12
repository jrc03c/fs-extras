const getDirsDeepSync = require("../src/get-dirs-deep-sync.js")
const config = require("./setup-and-teardown.js")
const { sort, set } = require("@jrc03c/js-math-tools")

test("tests that directories can be gotten deeply", () => {
  const results = sort(set(getDirsDeepSync(config.root).concat([config.root])))
  expect(results).toStrictEqual(sort(set(config.dirs)))
})
