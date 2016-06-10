# gulp-draftsman

Hello! You may be wondering what on earth this is. Basically it takes a sourcemap, currently only JS and CSS, and reconstructs the source files embedded with them and creates the parent file with the appropriate includes (except for JS, but you can see what is going on with that in [#1](https://github.com/chryton/gulp-draftsman/issues/1))

## Backstory

So this came about from needing to perform technical debt audits of sites that had a third party development team work on. In a few rare cases `.map` files had been left over in production and on a whim I thought I'd base64 decode one to see how they worked since trying to read `.min` files wasn't too appealing. 

Low and behold, it is kinda like JSON so it hit me: we have the technology, we could rebuild them! And so after some frustrations with Node/Gulp, I was able to create some tasks (that you can find in the `tasks/` directory) that would do what we needed.


# Usage

## Caveat

Sadly, my gulp plugin creation skills are virtually zero so until I get the actual plugin itself working, this is for the

Eventually you will just be able to do your normal

`npm install --save-dev gulp-draftsman`

and do a bit of config and boom you have source files!


## Tasks

Currently the JS and CSS tasks are separate tasks that are both run when you run `gulp draftsman` in your terminal of choice. If you want to run just CSS or JS then you can use `gulp draftsman:css` or `gulp draftsman:js`, respectively.

### Tasks Configuration

The tasks you see in `tasks/draftsman.js` should be fairly easy to configure. 

`readDir` is the folder you want the task to scan in for `.map` files.

`cssDir` is the parent folder that your existing CSS resides in.

`jsDir` is the parent folder that your existing JS resides in.

`builtDirName` is the folder name these reconstructed files will be nested under.

# Roadmap

To see what is on the books, take a look at [#1](https://github.com/chryton/gulp-draftsman/issues/1).
