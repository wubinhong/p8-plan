# Show how Modules .d.ts works

## Run lib

```bash
# Link custom module "my-lib" to node_modules to simulate how a module works
$ mkdir -p node_modules
$ (cd node_modules && ln -s ../src/my-lib myLib)
# Run app.ts with ts-node.
$ ts-node src/app.ts
```

## Reference

[module-d-ts]{https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html}
[Generate .d.ts file automatically](https://www.typescriptlang.org/play/)