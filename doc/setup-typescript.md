# Setup typescript project

* Create a tsconfig.json file in your project directory
    * npx tsc --init
        ```
        tsc --init
        ```
    * All configurations will be created in the tsconfig.json file

* Change “module” to “commonjs” in tsconfig.json file

* Change "moduleResolution" to "Node"

* Add include src/**/*
    ```

     "include": [
        src/**/*
    ]
       
    ```

* Change outDir to “./dist”

* Make folder src

* To compile typescript to javascript using the tsc command
    ```
    tsc
    ```