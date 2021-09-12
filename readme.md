# Introduction

**fs-extras** is a little package of extra tools to supplement Node's `fs` module.

# Installation

```bash
npm install --save https://github.com/jrc03c/fs-extras.js
```

# Usage

```js
const fsx = require("@jrc03c/fs-extras")

// get all files in a directory and its subdirectories
const allFiles = fsx.getAllFilesRecursiveSync("/some/directory")

// get all subdirectories of a directory
const allDirs = fsx.getAllDirsRecursiveSync("/some/directory")

// delete a bunch of files
fsx.rmFilesSync(allFiles)

// delete a single directory (and everything inside it, of course)
fsx.rmDirSync(someDir)

// delete a bunch of directories (and everything inside them, of course)
fsx.rmDirsSync(allDirs)
```

All of the above functions have asynchronous versions. Simply omit the "Sync" at the end of the function name. For example, the asynchronous version of `getAllFilesRecursiveSync` would be `getAllFilesRecursive`.

The async functions return a Promise, but you can also pass a callback to them. Either style is fine! For example, both of these styles work just fine:

```js
const fsx = require("@jrc03c/fs-extras")

// version 1: using a callback
fsx.getAllFilesRecursive("/some/directory", files => {
  console.log(files)
})

// version2: using a Promise
fsx.getAllFilesRecursive("/some/directory").then(files => {
  console.log(files)
})
```
