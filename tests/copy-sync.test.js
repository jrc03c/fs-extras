const { copySync, getFilesDeepSync } = require("..")
const config = require("./setup-and-teardown.js")
const fs = require("fs")
const path = require("path")

test("tests that files can be copied synchronously", () => {
  config.setup()

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
    fs.unlinkSync(dest)
  }

  config.teardown()
})

test("tests that directories can be copied synchronously", () => {
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

  const originalDestFiles = getFilesDeepSync(dest)

  copySync(src, dest)

  const srcFiles = getFilesDeepSync(src)
    .map(f => f.replace(src, ""))
    .sort()

  const destFiles = getFilesDeepSync(dest)
    .filter(f => originalDestFiles.indexOf(f) < 0)
    .map(f => f.replace(dest, ""))
    .sort()

  expect(srcFiles).toStrictEqual(destFiles)
  config.teardown()
})

test("tests that symlink targets are preserved when copied synchronously", () => {})
