const fs = require("fs")
const rmDirSync = require("./rm-dir-sync.js")

function rmDirsSync(dir) {
  const children = fs.readdirSync(dir)

  children.forEach(child => {
    rmDirSync(dir + "/" + child)
  })
}
