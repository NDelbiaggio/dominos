#

## Set up 

### Add dependencies
```bash
npm i -D wepack-cli webpack typescript ts-loader declaration-bundler-webpack-plugin copy-webpack-plugin clean-webpack-plugin @types/node @types/webpack
```


### Add tsconfig
create `tsconfig.json`
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": true,
    "declaration": true,
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "."
  },
  "include": ["src"]
}
```

### Set up webpack

```bash
npm i webpack-cli @webpack-cli/generators -g
```

```bash
npx webpack-cli init
```