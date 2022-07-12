const { copySync, getFilesDeepSync } = require("..")
const { exec, execSync } = require("child_process")
const config = require("./setup-and-teardown.js")
const fs = require("fs")
const makeKey = require("./make-key.js")
const path = require("path")

test("tests that files can be copied synchronously", () => {
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

  const srcParts = src.split("/")
  const srcName = srcParts[srcParts.length - 1]
  dest = path.join(dest, srcName)

  const destFiles = getFilesDeepSync(dest)
    .filter(f => originalDestFiles.indexOf(f) < 0)
    .map(f => f.replace(dest, ""))
    .sort()

  expect(destFiles).toStrictEqual(srcFiles)
  config.teardown()
})

test("tests that the `copySync` behavior matches the behavior of `cp`", () => {
  config.setup()

  // make a copy of the root directory for `cp` to work in
  const altRoot = path.resolve("temp/alt")
  execSync(`cp -r "${config.root}" "${altRoot}"`)

  expect(
    getFilesDeepSync(config.root)
      .map(f => f.replace(config.root, ""))
      .sort()
  ).toStrictEqual(
    getFilesDeepSync(altRoot)
      .map(f => f.replace(altRoot, ""))
      .sort()
  )

  // copy file to file
  ;(() => {
    const src = config.files.random()
    const dest = path.join(config.dirs.random(), makeKey(8))
    copySync(src, dest)

    const altSrc = src.replace(config.root, altRoot)
    const altDest = dest.replace(config.root, altRoot)
    const altDestParts = altDest.split("/")
    const altDestDir = altDestParts.slice(0, altDestParts.length - 1).join("/")
    execSync(`mkdir -p "${altDestDir}"`)
    execSync(`touch "${altDest}"`)
    execSync(`cp "${altSrc}" "${altDest}"`)

    expect(fs.existsSync(altDest)).toBe(true)
    expect(fs.readFileSync(altDest, "utf8")).toBe(fs.readFileSync(dest, "utf8"))
  })()

  // copy directory to directory
  ;(() => {
    const src = config.dirs.slice(1).random()
    let dest

    while (!dest || dest.includes(src) || src.includes(dest)) {
      dest = config.dirs.slice(1).random()
    }

    copySync(src, dest)

    const altSrc = src.replace(config.root, altRoot)
    const altDest = dest.replace(config.root, altRoot)
    execSync(`cp -r "${altSrc}" "${altDest}"`)

    const destFiles = getFilesDeepSync(dest)
      .map(f => f.replace(config.root, ""))
      .sort()

    const altDestFiles = getFilesDeepSync(altDest)
      .map(f => f.replace(altRoot, ""))
      .sort()

    expect(altDestFiles).toStrictEqual(destFiles)
  })()

  // copy file to directory
  ;(() => {
    const src = config.files.random()
    let dest

    while (!dest || src.includes(dest)) {
      dest = config.dirs.random()
    }

    copySync(src, dest)

    const altSrc = src.replace(config.root, altRoot)
    const altDest = dest.replace(config.root, altRoot)
    execSync(`cp "${altSrc}" "${altDest}"`)

    const srcParts = src.split("/")
    const srcName = srcParts[srcParts.length - 1]
    const destFile = path.join(dest, srcName)
    const altDestFile = path.join(altDest, srcName)

    expect(fs.existsSync(altDestFile)).toBe(true)

    expect(fs.readFileSync(altDestFile, "utf8")).toBe(
      fs.readFileSync(destFile, "utf8")
    )
  })()

  // copy directory to file
  ;(() => {
    const src = config.dirs.random()
    const dest = config.files.random()
    expect(() => copySync(src, dest)).toThrow()

    const altSrc = src.replace(config.root, altRoot)
    const altDest = dest.replace(config.root, altRoot)

    exec(`cp -r "${altSrc}" "${altDest}"`, (error, stdout, stderr) => {
      if (error) {
        expect(true).toBe(true)
      } else {
        const output = stdout + "\n" + stderr
        expect(output.trim().length).toBeGreaterThan(0)
      }
    })
  })()

  // clean up the alternate root copy
  execSync(`rm -rf "${altRoot}"`)
  config.teardown()
})

test("tests that symlink targets are preserved when copied synchronously", () => {
  config.setup()

  // file symlink
  ;(() => {
    for (let i = 0; i < 100; i++) {
      const src = config.fileSymlinks.random()
      const dest = path.join(config.dirs.random(), makeKey(8))

      copySync(src, dest)

      const srcTarget = fs.readlinkSync(src)
      const destTarget = fs.readlinkSync(dest)
      expect(destTarget).toBe(srcTarget)
    }
  })()

  // directory symlink
  ;(() => {
    for (let i = 0; i < 100; i++) {
      const src = config.dirSymlinks.random()
      const dest = path.join(config.dirs.random(), makeKey(8))

      copySync(src, dest)

      const srcTarget = fs.readlinkSync(src)
      const destTarget = fs.readlinkSync(dest)
      expect(destTarget).toBe(srcTarget)
    }
  })()

  config.teardown()
})

test("tests that preexisting files are overwritten during a synchronous copy", () => {
  // console.warn("Remember to build this test!")
})

test("tests that empty directories can be copied synchronously", () => {
  // console.warn("Remember to build this test!")
})
