const fs = require("fs")
const makeKey = require("./make-key.js")
const path = require("path")

Array.prototype.random = function () {
  const self = this
  return self[parseInt(Math.random() * self.length)]
}

Object.defineProperty(Array.prototype, "last", {
  configurable: false,
  enumerable: true,

  get() {
    const self = this
    return self[self.length - 1]
  },
})

function setup() {
  fs.rmSync("temp", { recursive: true, force: true })
  fs.mkdirSync("temp", { recursive: true })

  files = []
  dirs = [root]
  fileSymlinks = []
  dirSymlinks = []

  // make directories
  for (let i = 0; i < Math.random() * 25 + 10; i++) {
    const dir = dirs.random()
    const child = path.join(dir, makeKey(8))
    fs.mkdirSync(child, { recursive: true })
    dirs.push(child)
  }

  // make files
  dirs.forEach(dir => {
    for (let i = 0; i < Math.random() * 5 + 3; i++) {
      const child = path.join(dir, makeKey(8))
      fs.writeFileSync(child, Math.random().toString(), "utf8")
      files.push(child)
    }
  })

  // make symlinks
  for (let i = 0; i < 10; i++) {
    const link = path.join(dirs.random(), makeKey(8))
    let target

    if (Math.random() < 0.5) {
      target = files.random()
      fileSymlinks.push(link)
    } else {
      target = dirs.random()
      dirSymlinks.push(link)
    }

    fs.symlinkSync(target, link)
  }

  // confirm that each this is what it says it is
  dirs.forEach(dir => {
    if (!fs.lstatSync(dir).isDirectory()) {
      throw new Error(`Is supposed to be a directory! (${dir})`)
    }
  })

  files.forEach(file => {
    if (!fs.lstatSync(file).isFile()) {
      throw new Error(`Is supposed to be a file! (${file})`)
    }
  })

  fileSymlinks.forEach(symlink => {
    if (!fs.lstatSync(symlink).isSymbolicLink()) {
      throw new Error(`Is supposed to be a symbolic link! (${symlink})`)
    }

    const target = fs.readlinkSync(symlink)

    if (!fs.lstatSync(target).isFile()) {
      throw new Error(
        `The target of the symlink is supposed to be a file! (${target})`
      )
    }
  })

  dirSymlinks.forEach(symlink => {
    if (!fs.lstatSync(symlink).isSymbolicLink()) {
      throw new Error(`Is supposed to be a symbolic link! (${symlink})`)
    }

    const target = fs.readlinkSync(symlink)

    if (!fs.lstatSync(target).isDirectory()) {
      throw new Error(
        `The target of the symlink is supposed to be a directory! (${target})`
      )
    }
  })
}

function teardown() {
  fs.rmSync(root, { recursive: true, force: true })
}

const root = path.resolve("temp/" + makeKey(8))
let files, dirs, fileSymlinks, dirSymlinks

module.exports = {
  get root() {
    return root
  },

  get files() {
    return files
  },

  get dirs() {
    return dirs
  },

  get fileSymlinks() {
    return fileSymlinks
  },

  get dirSymlinks() {
    return dirSymlinks
  },

  setup,
  teardown,
}
