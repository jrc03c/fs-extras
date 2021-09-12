const fs = require("fs")
const findSync = require("../src/find-sync.js")
const makeKey = require("./make-key.js")
const config = require("./setup-and-teardown.js")
const { sort, set } = require("@jrc03c/js-math-tools")

test("tests that arbitrary files can be found synchronously", () => {
  const fileTrue = config.files.random()
  const name = fileTrue.split("/").last
  const results = findSync(config.root, name)
  expect(results.length).toBe(1)
  expect(results[0]).toBe(fileTrue)
})

test("tests that arbitrary directories can be found synchronously", () => {
  const dirTrue = config.dirs.random()
  const name = dirTrue.split("/").last
  const resultsTrue = sort(set(config.dirs.filter(d => d.match(name))))
  const resultsPred = sort(
    set(
      findSync(config.root, name).filter(f => {
        return !fs.lstatSync(f).isFile()
      })
    )
  )

  expect(resultsPred.length).toBe(resultsTrue.length)
  expect(resultsPred).toStrictEqual(resultsTrue)
})
