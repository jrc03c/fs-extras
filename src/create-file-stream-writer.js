const fs = require("fs")

function createFileStreamWriter(file) {
  const stream = fs.createWriteStream(file)
  let canWrite = true

  stream.on("error", error => {
    throw error
  })

  stream.on("drain", () => {
    canWrite = true
  })

  stream.on("end", () => {
    stream.destroy()
  })

  return {
    write(data) {
      return new Promise((resolve, reject) => {
        try {
          canWrite = stream.write(data)
          if (canWrite) return resolve()

          const interval = setInterval(() => {
            if (!canWrite) return
            clearInterval(interval)
            resolve()
          }, 1)
        } catch(e) {
          reject(e)
        }
      })
    },

    close() {
      stream.destroy()
    },
  }
}

module.exports = createFileStreamWriter
