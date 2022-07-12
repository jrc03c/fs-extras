# Symlinks

Decide when and how to follow symlinks.

# Moving / copying behavior

Determine the expected behavior for copying and moving. For example, if I do this:

```js
copySync("/foo", "/bar/baz")
```

...then one of two behaviors might be expected:

**Behavior #1:** The contents of "/foo" could be copied into "/bar/baz" (such that "/foo/myfile" would end up at "/bar/baz/myfile").

**Behavior #2:** A new folder called "foo" could be created inside of "/bar/baz" and filled with the contents of "/foo" (such that "/foo/myfile" would end up at "/bar/baz/foo/myfile").

Which behavior should users expect? And how should the behavior change (if at all) in situations where one argument is a file and the other is a directory?

Presumably, users will expect whichever behavior matches the Bash `cp` behavior, so I probably need to incorporate that into the moving and copying tests!
