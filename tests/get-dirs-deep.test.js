const getDirsDeep = require("../src/get-dirs-deep.js")
const config = require("./setup-and-teardown.js")
const { sort, set } = require("@jrc03c/js-math-tools")

test("tests that directories can be gotten deeply and asynchronously", async () => {
  // const results = [config.root].concat(await getDirsDeep(config.root))
  // expect(results).toStrictEqual(sort(set(config.dirs)))
})

test("tests that directories can be gotten shallowly and asynchronously", async () => {
  // const depth = 3
  // const results = [config.root].concat(await getDirsDeep(config.root, depth))
  //
  // results.forEach(result => {
  //   const parts = result
  //     .replaceAll(config.root, "")
  //     .split("/")
  //     .filter(p => p.length > 0)
  //
  //   expect(parts.length).toBeLessThanOrEqual(depth)
  // })
})
