'use strict';

var fs = require("fs"),
	gutil = require('gulp-util'),
	mkdirp = require('mkdirp'),
	through = require('through2');


/* Original boilerplate by @sindresorhus
/* url: https://github.com/sindresorhus/gulp-plugin-boilerplate */

module.exports = function (opts) {
	opts = opts || {};

	var readDir = opts.read || './assets/',
		cssDir = opts.dir || './src/css/scss/',
		jsDir = opts.dir || './src/js/',
		builtDirName = opts.destination || 'drafted';

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		var sourcemap_file = file;

			// var sourceMaps = fs.readdirSync(readDir).filter(function(curr, index){
			// 		return curr.indexOf('.css.map') > 0 ;
		 // 		});
			//console.log(sourcemap.sources);

		if (file.indexOf('.css.map') > 0){

			/* **********************************************************
			/* This block is for compiling .scss files from SASS sourcemaps 
			/* @output: a .scss file named after the primary map file name and includes via `@import` all built files from that map
			/* ********************************************************** */

			if (!fs.existsSync(cssDir + builtDirName)){
			    fs.mkdirSync(cssDir + builtDirName);
			}
			console.log(sourceMaps);
			// sourceMaps.forEach(function(sourcemap_file, index){
				var sourcemap = JSON.parse(fs.readFileSync(readDir + sourcemap_file, 'utf8')),
					includes = '/* Auto Generated File from Draftsman */ \n';

				includes += '// ' + sourcemap.file.split('.')[0] + '.scss \r\n';
				for (var i = 0; i < sourcemap.sources.length; i++){
					if (sourcemap.sources[i] !== sourcemap.file){
						if ((sourcemap.sources[i].split('/_').length > 1) && !fs.existsSync(cssDir + builtDirName + sourcemap.sources[i].split('/_')[0])){
						    mkdirp.sync(cssDir + builtDirName + sourcemap.sources[i].split('/_')[0]);
						}
						fs.writeFile(cssDir + builtDirName + sourcemap.sources[i], sourcemap.sourcesContent[i], (err) => {
						  if (err) throw err;
						});
						console.log('file written: ' + cssDir + builtDirName + sourcemap.sources[i]);
						includes += '\t @import: \'' + sourcemap.sources[i] + '\'; \n';
					}
				}
				fs.writeFileSync(cssDir + builtDirName + sourcemap.file.split('.')[0] + '.scss', includes);
				console.log("~~~~~ file and includes drafting complete ~~~~~");
			// });

		}else if (file.indexOf('.js.map') >0){

			/* **********************************************************
			/* This block is for compiling .js files from JS sourcemaps 
			/* @output: a .json file named after the primary map file name and includes a list of the JS files built from it; yes I know that isn't a real JSON file but 
			/* TODO: change output to either an accurate JSON representation of the included JS files for the original parent file or a built file with the file names in order, commented out, at the top
			/* ********************************************************** */

			//console.log(sourcemap.sources);
			if (!fs.existsSync(jsDir + builtDirName)){
			    fs.mkdirSync(jsDir + builtDirName);
			}
			console.log(sourceMaps);
			// sourceMaps.forEach(function(sourcemap_file, index){
				var sourcemap = JSON.parse(fs.readFileSync(readDir + sourcemap_file, 'utf8')),
					includes = '/* Auto Generated File from Draftsman */ \n';

				includes += '// FOR: ' + sourcemap.file.split('.')[0] + '.js \r\n\r\n';
				for (var i = 0; i < sourcemap.sources.length; i++){
					if (sourcemap.sources[i] !== sourcemap.file){
						if ((sourcemap.sources[i].split('/').length > 1) && !fs.existsSync(jsDir + builtDirName + sourcemap.sources[i].split('/')[0])){
						    mkdirp.sync(jsDir + builtDirName + sourcemap.sources[i].split('/')[0]);
						}
						fs.writeFile(jsDir + builtDirName + sourcemap.sources[i], sourcemap.sourcesContent[i], (err) => {
						  if (err) throw err;
						});
						console.log('file written: ' + jsDir + builtDirName + sourcemap.sources[i]);
						includes += '// '+ sourcemap.sources[i] + '\n';
					}
				}
				fs.writeFileSync(jsDir + builtDirName + sourcemap.file.split('.')[0] + '.json', includes);
			// });

		}else{
			this.emit('error', new gutil.PluginError('gulp-draftsman', 'Unsupported map file: ' + file));
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-<%= pluginName %>', 'Streaming not supported'));
			return;
		}

		// try {
		// 	file.contents = new Buffer(someModule(file.contents.toString(), opts));
		// 	this.push(file);
		// } catch (err) {
		// 	this.emit('error', new gutil.PluginError('gulp-<%= pluginName %>', err));
		// }

		cb();
	});
};

