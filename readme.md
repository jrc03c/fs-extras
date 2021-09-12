# Introduction

**fs-extras** is a little package of tools to supplement Node's `fs` module.

# Installation

```bash
npm install --save https://github.com/jrc03c/fs-extras.js
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

// delete a bunch of files
fsx.rmFilesSync(allFiles)

// delete a single directory (and everything inside it, of course)
fsx.rmDirSync(someDir)

// delete a bunch of directories (and everything inside them, of course)
fsx.rmDirsSync(allDirs)

// find a file or directory
// (e.g., find *.txt files in "/some/directory", and look no deeper than 3 levels down)
// (also, note that in the `findSync` function, the second argument can be a regular expression, a string, or a function!)
fsx.findSync("/some/directory", /\.txt/g, 3)
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

# API

**`findSync(dir : string, matcher : RegExp | string | function, depth? : int)`**

synchronously returns an array of directories and files matched by `matcher`

**`find(dir : string, matcher : RegExp | string | function, depth? : int, callback? : function)`**

asynchronously returns an array of directories and files matched by `matcher`
