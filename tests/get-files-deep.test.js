const getFilesDeep = require("../src/get-files-deep.js")
const config = require("./setup-and-teardown.js")
const { sort, set } = require("@jrc03c/js-math-tools")

test("tests that files can be gotten deeply and asynchronously", async () => {
  // const results = sort(set(await getFilesDeep(config.root)))
  // expect(results).toStrictEqual(sort(set(config.files)))
})

test("tests that files can be gotten shallowly and asynchronously", async () => {
  // const depth = 3
  // const resultsPred = await getFilesDeep(config.root, depth)
  //
  // const resultsTrue = config.files.filter(file => {
  //   const parts = file
  //     .replaceAll(config.root, "")
  //     .split("/")
  //     .filter(p => p.length > 0)
  //
  //   return parts.length <= depth
  // })
  //
  // expect(sort(set(resultsPred))).toStrictEqual(sort(set(resultsTrue)))
})
