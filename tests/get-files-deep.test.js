const { set, sort } = require("@jrc03c/js-math-tools")
const config = require("./setup-and-teardown.js")
const getFilesDeep = require("../src/get-files-deep.js")

test("tests that files can be gotten deeply and asynchronously", async () => {
  config.setup()
  const results = sort(set(await getFilesDeep(config.root)))

  expect(results).toStrictEqual(
    sort(
      set(config.files.concat(config.fileSymlinks).concat(config.dirSymlinks))
    )
  )

  config.teardown()
})

test("tests that files can be gotten shallowly and asynchronously", async () => {
  config.setup()
  const depth = 3
  const resultsPred = await getFilesDeep(config.root, depth)

  const resultsTrue = config.files
    .concat(config.fileSymlinks)
    .concat(config.dirSymlinks)
    .filter(file => {
      const parts = file
        .replaceAll(config.root, "")
        .split("/")
        .filter(p => p.length > 0)

      return parts.length <= depth
    })

  expect(sort(set(resultsPred))).toStrictEqual(sort(set(resultsTrue)))
  config.teardown()
})
