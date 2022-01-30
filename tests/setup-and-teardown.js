const fs = require("fs")
const path = require("path")
const makeKey = require("./make-key.js")
const root = path.resolve("temp/" + makeKey(8))
let files, dirs, fileSymlinks

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

beforeAll(() => {
  files = []
  fileSymlinks = []
  dirs = [root]

  for (let i = 0; i < 100; i++) {
    const name = makeKey(8)
    const dir = dirs.random()

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    // set up files
    if (Math.random() < 0.5) {
      const newFile = path.resolve(dir + "/" + name)

      if (Math.random() < 0.5 || files.length === 0) {
        // create a file
        files.push(newFile)
        fs.writeFileSync(newFile, Math.random().toString(), "utf8")
      } else {
        // symlink a file
        const currentFile = files.random()
        fileSymlinks.push(newFile)
        fs.symlinkSync(currentFile, newFile)
      }
    }

    // set up directories
    else {
      const newDir = path.resolve(dir + "/" + name)
      dirs.push(newDir)
      fs.mkdirSync(newDir, { recursive: true })
    }
  }
})

afterAll(() => {
  fs.rmSync(root, { recursive: true, force: true })
})

module.exports = {
  get root() {
    return root
  },

  get files() {
    return files.concat(fileSymlinks)
  },

  get dirs() {
    return dirs
  },
}
