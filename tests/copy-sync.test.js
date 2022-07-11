const { copySync } = require("..")
const { isEqual } = require("@jrc03c/js-math-tools")
const config = require("./setup-and-teardown.js")
const FileDB = require("@jrc03c/filedb")
const fs = require("fs")
const makeKey = require("./make-key.js")
const path = require("path")

test("tests that files can be copied synchronously", () => {
  for (let i = 0; i < 25; i++) {
    const src = config.files.random()
    const srcParts = src.split("/")
    const srcDir = srcParts.slice(0, srcParts.length - 1).join("/")
    const srcName = src.replace(srcDir, "")
    const srcRaw = fs.readFileSync(src, "utf8")

    let destDir

    while (!destDir || destDir === srcDir) {
      destDir = config.dirs.random()
    }

    const dest = path.join(destDir, srcName)
    expect(fs.existsSync(src)).toBe(true)
    expect(fs.existsSync(dest)).toBe(false)

    copySync(src, dest)

    expect(fs.existsSync(src)).toBe(true)
    expect(fs.existsSync(dest)).toBe(true)

    const destRaw = fs.readFileSync(dest, "utf8")
    expect(destRaw).toBe(srcRaw)
  }
})

test("tests that directories can be copied synchronously", () => {
  const src = config.dirs.random()

  const dest = path.join(
    config.root,
    [makeKey(8), makeKey(8), makeKey(8)].join("/")
  )

  expect(fs.existsSync(src)).toBe(true)
  expect(fs.existsSync(dest)).toBe(false)

  copySync(src, dest)

  expect(fs.existsSync(src)).toBe(true)
  expect(fs.existsSync(dest)).toBe(true)

  const srcObj = new FileDB(src).readSync("/")
  const destObj = new FileDB(dest).readSync("/")
  expect(isEqual(srcObj, destObj)).toBe(true)
})

test("tests that symlink targets are preserved when copied synchronously", () => {})
