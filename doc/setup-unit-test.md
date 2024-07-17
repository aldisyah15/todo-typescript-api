 # set up babel
 * In your package.json file, add the following script
    
```
{
   "scripts": {
    "test": "jest"
  },
  "jest": {
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  }
}
````
* Create babel.config.json configuration file
```
{
  "presets": ["@babel/preset-env"],
   @babel/preset-typescript
}
```

* Then add @babel/preset-typescript to the list of presets in your babel.config.js



