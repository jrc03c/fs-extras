const getFilesDeepSync = require("../src/get-files-deep-sync.js")
const config = require("./setup-and-teardown.js")
const { sort, set } = require("@jrc03c/js-math-tools")
const fs = require("fs")

test("tests that files can be gotten deeply and synchronously", () => {
  const results = sort(set(getFilesDeepSync(config.root)))
  expect(results).toStrictEqual(sort(set(config.files)))
})

test("tests that files can be gotten shallowly and synchronously", () => {
  const depth = 3
  const resultsPred = getFilesDeepSync(config.root, depth)

  const resultsTrue = config.files.filter(file => {
    const parts = file
      .replaceAll(config.root, "")
      .split("/")
      .filter(p => p.length > 0)

    return parts.length <= depth
  })

  expect(sort(set(resultsPred))).toStrictEqual(sort(set(resultsTrue)))
})

test("tests that symlinks are included", () => {
  const files = sort(set(getFilesDeepSync(config.root)))
  expect(files.some(f => fs.lstatSync(f).isSymbolicLink())).toBe(true)
})
