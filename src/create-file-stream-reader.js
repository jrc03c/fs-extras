const fs = require("fs")
const readline = require("readline")

function createFileStreamReader(file, progress) {
  const stream = fs.createReadStream(file)
  const fileSize = progress ? fs.statSync(file).size : undefined

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  })

  stream.on("error", error => {
    throw error
  })

  stream.on("end", () => {
    stream.destroy()
    rl.close()
  })

  return {
    read: async function* () {
      for await (const line of rl) {
        if (progress) {
          progress(stream.bytesRead / fileSize)
        }

        yield line
      }
    },

    close() {
      stream.destroy()
      rl.close()
    },
  }
}

module.exports = createFileStreamReader
