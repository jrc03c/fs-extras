const { copySync } = require("..")
const config = require("./setup-and-teardown.js")
const fs = require("fs")
const makeKey = require("./make-key.js")
const path = require("path")

test("tests that files can be copied asynchronously", async () => {
  config.setup()

  for (let i = 0; i < 100; i++) {
    const src = config.files.random()
    let destDir

    while (!destDir || src.includes(destDir)) {
      destDir = config.dirs.random()
    }

    const dest = path.join(destDir, makeKey(8))
    expect(fs.existsSync(src)).toBe(true)
    expect(fs.existsSync(dest)).toBe(false)

    copySync(src, dest)

    expect(fs.existsSync(src)).toBe(true)
    expect(fs.existsSync(dest)).toBe(true)
    expect(fs.readFileSync(dest, "utf8")).toBe(fs.readFileSync(src, "utf8"))

    fs.unlinkSync(dest)
  }

  config.teardown()
})

test("tests that folders can be copied asynchronously", async () => {
  config.setup()
  config.teardown()
})
