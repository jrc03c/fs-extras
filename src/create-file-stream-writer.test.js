const { random } = require("@jrc03c/js-math-tools")
const createFileStreamWriter = require("./create-file-stream-writer")
const fs = require("node:fs")
const makeKey = require("@jrc03c/make-key")

const files = []

test("tests that the file stream writer works as expected", async () => {
  const numbers = random(1000)
  const file = makeKey(8) + ".txt"
  files.push(file)

  const writer = createFileStreamWriter(file)

  for (const n of numbers) {
    await writer.write(n + "\n")
  }

  writer.close()

  const raw = fs.readFileSync(file, "utf8")

  raw.split("\n").forEach((line, i) => {
    line = line.trim()
    if (line.length === 0) return
    const n = parseFloat(line)
    expect(n).toBe(numbers[i])
  })
})

afterAll(() => {
  files.forEach(file => {
    fs.unlinkSync(file)
  })
})
