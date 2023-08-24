const fs = require("fs")
const readline = require("readline")

function createFileStreamReader(file, progress) {
  if (typeof file !== "string") {
    throw new Error(
      "The first argument passed into the `createFileStreamReader` function must be a string representing a file path!"
    )
  }

  if (typeof progress !== "undefined" && typeof progress !== "function") {
    throw new Error(
      "The second argument passed into the `createFileStreamReader` function must be a function (used for progress update callbacks)!"
    )
  }

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
