
var readDir = './assets/',
	cssDir = './src/css/scss/',
	jsDir = './src/js/'
	builtDirName = 'drafted';

gulp.task('draftsman:css', function(){

	var sourceMaps = fs.readdirSync(readDir).filter(function(curr, index){
			return curr.indexOf('.css.map') > 0 ;
 		});
	//console.log(sourcemap.sources);
	if (!fs.existsSync(cssDir + builtDirName)){
	    fs.mkdirSync(cssDir + builtDirName);
	}
	console.log(sourceMaps);
	sourceMaps.forEach(function(sourcemap_file, index){
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
		console.log("~~~~~ section complete ~~~~~");
	});
//	console.log(includes);
});

gulp.task('draftsman:js', function(){

	var sourceMaps = fs.readdirSync(readDir).filter(function(curr, index){
			return curr.indexOf('.js.map') > 0 ;
 		});

	//console.log(sourcemap.sources);
	if (!fs.existsSync(jsDir + builtDirName)){
	    fs.mkdirSync(jsDir + builtDirName);
	}
	console.log(sourceMaps);
	sourceMaps.forEach(function(sourcemap_file, index){
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
	});
});

gulp.task('draftsman', ['draftsman:css', 'draftsman:js'], function(){
	console.log('Draftsman Complete!');
	notify({title: 'Draftsman Complete', message: 'Maps drafted out.'})
});