# Gulp Template

This is a complete gulp template for use on your websites or web apps.  Works with BrowserSync for local development.

## Dependencies

* [Node.js](https://nodejs.org/)
* [NPM](https://www.npmjs.com/)
* [Gulp](http://gulpjs.com/)
* [SASS](http://sass-lang.com/)

## How to Use

### Get Started

Open the root directory of the repo in your terminal and run `npm install` this will automatically grab all the grunt dependancies required for the tasks to run properly.

##### Tasks included in this grunt process:

* **imagemin** - minifies and prepares images for the web
* **minifyHTML** - minfies your HTML removing comments and condensing code.
* **sass** - compiles your sass files into a single lib and app file.  App for custom CSS and Lib for libraries you add in.
* **minifycss** - minifies your css post sass compiling
* **autoprefixer** - auto prefixes elements in your css the require backwards compatibility.  Goes back 2 versions
* **eslint** - validates your JS against ES6 standards
* **babel** - transpiles your JS code written in ES6 down to compatible levels
* **uglify** - minifies and obfuscates your JS
* **concat** - merges all your code into single library and application files
* **jsonminify** - minifies your JSON data if you have any
* **browserSync** - spins up a localhost server on port 3000 with live reloading
* **reload** - performs the live reloading
* **watch** - watches for changes to your files
* **rename** - renaming plugin used in tasks
* **notify** - used to notify of complete tasks
* **del** - cleans up before performing builds

### Watching Task
```
gulp
```
To run a watching task that live updates your dist files while working you will want to run the command above. This allows you to view the pages out of your dist folder while editing the source files. Any changes made in the src directory will compile into dist and appear in your webserver

###### Optional Task

```
gulp clean
```
Cleans the current working directory before running gulp.  It is built into the standard processes already though.

### Distribution Task
```
gulp dist
```

This will run a one time compile of your src files and output them into your dist folder.  This is the command you run when getting ready to publish your page.
