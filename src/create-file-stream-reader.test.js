const { random } = require("@jrc03c/js-math-tools")
const createFileStreamReader = require("./create-file-stream-reader")
const fs = require("node:fs")
const makeKey = require("@jrc03c/make-key")

const files = []

test("tests that the file stream reader works as expected", async () => {
  const numbers = random(1000)
  const file = makeKey(8) + ".txt"
  fs.writeFileSync(file, numbers.join("\n"), "utf8")
  files.push(file)

  const reader = await createFileStreamReader(file)
  let i = 0

  for await (const line of reader.read()) {
    expect(parseFloat(line)).toBe(numbers[i])
    i++
  }

  reader.close()
  expect(i).toBe(numbers.length)
})

afterAll(() => {
  files.forEach(file => {
    fs.unlinkSync(file)
  })
})
