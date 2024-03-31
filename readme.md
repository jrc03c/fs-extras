# Introduction

**fs-extras** is a little package of tools to supplement Node's `fs` module.

# Installation

```bash
npm install --save @jrc03c/fs-extras
```

# Usage

```js
const fsx = require("@jrc03c/fs-extras")

// get all files in a directory and its subdirectories
const allFiles = fsx.getFilesDeepSync("/some/directory")

// get all subdirectories of a directory
const allDirs = fsx.getDirsDeepSync("/some/directory")

// add an optional depth argument
// (e.g., in this case, only go 3 levels down)
const shallowFiles = fs.getFilesDeepSync("/some/directory", 3)
const shallowDirs = fs.getDirsDeepSync("/some/directory", 3)
```

All of the above functions have asynchronous versions. Simply omit the "Sync" at the end of the function name. For example, the asynchronous version of `getFilesDeepSync` would be `getFilesDeep`.

The async functions return a Promise, but you can also pass a callback to them; either style is fine! For example, both of these styles work as expected:

```js
const fsx = require("@jrc03c/fs-extras")

// version 1: using a callback
fsx.getFilesDeep("/some/directory", files => {
  console.log(files)
})

// version 2: using a Promise
fsx.getFilesDeep("/some/directory").then(files => {
  console.log(files)
})
```

# Caveats

This has only been tested on Linux. I suspect it probably won't work on Windows unless you're using [WSL](https://docs.microsoft.com/en-us/windows/wsl/about) or similar.

# API

**`createFileStreamReader(file : string, progress : function)`**

returns an object that can read from a file one line at a time, which is useful for very large files; can optionally accept a `progress` callback function

for example:

```js
const { createFileStreamReader } = require("@jrc03c/fs-extras")

!(async () => {
  const reader = createFileStreamReader("path/to/my-big-file.txt")

  for await (const line of reader.read()) {
    // do something with `line`
  }

  reader.close()
})()
```

**`createFileStreamWriter(file : string)`**

returns an object that can write to a file one ~line~ chunk at a time, which may in some cases be preferable to writing an entire file to disk all at once

for example:

```js
const { createFileStreamWriter } = require("@jrc03c/fs-extras")

!(async () => {
  const writer = createFileStreamWriter("path/to/my-file.txt")

  for (let i = 0; i < 1e20; i++) {
    await writer.write(Math.random().toString() + "\n")
  }

  writer.close()
})()
```

note that the example above writes one _line_ at a time, but that's only because of the `"\n"` at the end

**`findSync(dir : string, matcher : RegExp | string | function, depth? : int)`**

synchronously returns an array of directories and files matched by `matcher` to an optional depth of `depth`

**`find(dir : string, matcher : RegExp | string | function, depth? : int, callback? : function)`**

asynchronously returns an array of directories and files matched by `matcher` to an optional depth of `depth`

**`getDirsDeepSync(dir : string, depth? : int)`**

synchronously returns all subdirectories of `dir` to an optional depth of `depth`

**`getDirsDeep(dir : string, depth? : int, callback? : function)`**

asynchronously returns all subdirectories of `dir` to an optional depth of `depth`

**`getFilesDeepSync(dir : string, depth? : int)`**

synchronously returns all files in `dir` and all its subdirectories to an optional depth of `depth`

**`getFilesDeep(dir : string, depth? : int, callback? : function)`**

asynchronously returns all files in `dir` and all its subdirectories to an optional depth of `depth`
