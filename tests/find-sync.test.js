const findSync = require("../src/find-sync.js")
const makeKey = require("./make-key.js")
const config = require("./setup-and-teardown.js")

test("tests that files or folders can be found synchronously", () => {
  const lastFile = config.files.last().split("/").last()
  const fileSearchResults = findSync(config.root, lastFile)
  expect(fileSearchResults.length).toBe(1)
  expect(fileSearchResults[0]).toBe(config.files.last())
})
