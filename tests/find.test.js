const { set, sort } = require("@jrc03c/js-math-tools")
const config = require("./setup-and-teardown.js")
const find = require("../src/find.js")
const fs = require("fs")

test("tests that arbitrary files can be found asynchronously", async () => {
  config.setup()
  const fileTrue = config.files.random()
  const name = fileTrue.split("/").last
  const results = await find(config.root, name)
  expect(results.length).toBe(1)
  expect(results[0]).toBe(fileTrue)
  config.teardown()
})

test("tests that arbitrary directories can be found asynchronously", async () => {
  config.setup()

  for (let i = 0; i < 100; i++) {
    const dirTrue = config.dirs.slice(1).random()
    const name = dirTrue.split("/").filter(p => p.length > 0).last
    const resultsTrue = sort(set(config.dirs.filter(d => d.includes(name))))

    const resultsPred = sort(
      set(
        await find(config.root, path => {
          const stat = fs.lstatSync(path)
          return path.includes(name) && stat.isDirectory()
        })
      )
    )

    expect(resultsPred).toStrictEqual(resultsTrue)
  }

  config.teardown()
})
