function makeKey(n) {
  const alpha = "abcdefghijklmnopqrstuvwxyz"
  let out = ""
  for (let i = 0; i < n; i++)
    out += alpha[parseInt(Math.random() * alpha.length)]
  return out
}

module.exports = makeKey
