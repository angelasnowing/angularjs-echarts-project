//var gulp = require('gulp');
//var browserSync = require('browser-sync').create();
//var reload = browserSync.reload();
//gulp.task('default', ['browser-sync-test'], function(){

//});
//gulp.task('browser-sync-test', function(){
//	var files = ['*.html', 'js/**/*.html', 'js/**/*.js', 'css/*.css']
//	browserSync.init(files, {
//		server: {
//			baseDir: "./"
//		},
//		ghostMode: {
//			clicks: true,
//			scroll: true
//		}
//	})
//	gulp.watch('js/**/*.html').on('change');
//})
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('default', ['browser-sync']);
// Static server
gulp.task('browser-sync', function() {
	var files = ['*.html', '**/**/*.js', '**/*.js', '*/*.css', '**/**/*.html']
    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
    //gulp.watch('*.html').on('change', browserSync.reload);
    //gulp.watch('**/**/*.html').on('change', browserSync.reload);
    //gulp.watch('**/**/*.js').on('change', browserSync.reload);
    //gulp.watch('css/*.css').on('change', browserSync.reload);
});
