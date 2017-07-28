var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var webserver = require('gulp-webserver');

/*La primera tarea que configuraremos se llamara script la cual concatenara nuestros archivos js,
convirtiendolo en script.js el que guardara en una carpeta llamada dist*/
gulp.task('script', function(){
	gulp.src(['node_modules/jquery/dist/jquery.js','node_modules/materialize-css/dist/js/materialize.js','assets/js/*.js'])
	.pipe(concat('script.js'))
	//carpeta dist
	.pipe(gulp.dest('dist/js/'));
});

/*La segunda tarea se llamara style la cual concatenara y minificara nuestro archivo main.scss,
convirtiendolo en style.min.css el que guardara en una carpeta llamada dist*/
gulp.task('style', function(){
	gulp.src(['node_modules/materialize-css/dist/css/materialize.css','assets/sass/main.scss'])
	.pipe(sass().on('error', sass.logError))
	.pipe(minifyCSS())
	.pipe(concat('style.min.css'))
	.pipe(gulp.dest('dist/css/'));
});

/*La tercera tarea se llamara webserver la cual nos crea un servidor web de desarrollo
que se ejecuta en el localhost puerto 8000*/
gulp.task('webserver', function(){
	gulp.src('../gulpie/')
	.pipe(webserver({
		fallback: 'index.html',
		livereload: true,
		directoryListing: false,
		open: true
	}));
});

/* Para terminar debemos indicarle a gulp cuales son las tareas que deberá ejecutar
al hacer correr el comando gulp en nuestro terminal*/
gulp.task('default',['script','style','webserver']);