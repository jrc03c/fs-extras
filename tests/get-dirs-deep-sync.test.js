const getDirsDeepSync = require("../src/get-dirs-deep-sync.js")
const config = require("./setup-and-teardown.js")
const { sort, set } = require("@jrc03c/js-math-tools")

test("tests that directories can be gotten deeply and synchronously", () => {
  const results = [config.root].concat(getDirsDeepSync(config.root))
  expect(results).toStrictEqual(sort(set(config.dirs)))
})

test("tests that directories can be gotten shallowly and synchronously", () => {
  const depth = 3
  const results = [config.root].concat(getDirsDeepSync(config.root, depth))

  results.forEach(result => {
    const parts = result
      .replaceAll(config.root, "")
      .split("/")
      .filter(p => p.length > 0)

    expect(parts.length).toBeLessThanOrEqual(depth)
  })
})
