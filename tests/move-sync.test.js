const { moveSync, getFilesDeepSync } = require("..")
const config = require("./setup-and-teardown.js")
const fs = require("fs")
const makeKey = require("./make-key.js")
const path = require("path")

test("tests that files can be moved synchronously", () => {
  config.setup()

  for (let i = 0; i < 100; i++) {
    const src = config.files.random()
    const dest = path.join(config.dirs.random(), makeKey(8))

    expect(fs.existsSync(src)).toBe(true)
    expect(fs.existsSync(dest)).toBe(false)

    moveSync(src, dest)

    expect(fs.existsSync(src)).toBe(false)
    expect(fs.existsSync(dest)).toBe(true)

    config.files.splice(config.files.indexOf(src), 1)
    config.files.push(dest)
  }

  config.teardown()
})

test("tests that directories can be moved synchronously", () => {
  config.setup()
  config.dirs.sort((a, b) => b.length - a.length)

  const src = config.dirs[0]
  let index = 0
  let dest

  while (
    !dest ||
    src.includes(dest) ||
    dest.includes(src) ||
    dest === config.root
  ) {
    dest = config.dirs[index]
    index++
  }

  const originalSrcFiles = getFilesDeepSync(src)
  const originalDestFiles = getFilesDeepSync(dest)

  moveSync(src, dest)

  const srcFiles = originalSrcFiles.map(f => f.replace(src, "")).sort()
  const srcParts = src.split("/")
  const srcName = srcParts[srcParts.length - 1]
  dest = path.join(dest, srcName)

  const destFiles = getFilesDeepSync(dest)
    .filter(f => originalDestFiles.indexOf(f) < 0)
    .map(f => f.replace(dest, ""))
    .sort()

  expect(srcFiles).toStrictEqual(destFiles)
  expect(fs.existsSync(src)).toBe(false)
  config.teardown()
})

test("tests that symlink targets are preserved when moved synchronously", () => {
  // console.warn("Remember to build this test!")
})

test("tests that preexisting files are overwritten during a synchronous move", () => {
  // console.warn("Remember to build this test!")
})

test("tests that empty directories can be moved synchronously", () => {
  // console.warn("Remember to build this test!")
})

test("tests that an error is thrown when trying to synchronously move a directory into itself", () => {
  // console.warn("Remember to build this test!")
})
