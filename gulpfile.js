//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    imagemin = require('gulp-imagemin'), //图片压缩
    autoprefixer = require('gulp-autoprefixer'), //使用gulp-autoprefixer根据设置浏览器版本自动处理浏览器前缀
    postcss = require('gulp-postcss'), //单位转化px--rem
    px2rem = require('postcss-px2rem'), //单位转化px--rem
    less = require('gulp-less');//引入less

var filePath = {
    lessSrc: './src/less/**/*.less',
    imgSrc: './src/img/*.*',
    jsSrc: './src/js/**/*',

    cssDist: './dist/css',
    imgDist: './dist/img',
    jsDist: './dist/js',
};





// gulp.task('less2css', function() {
//     var processors = [px2rem({ remUnit: 37.5 })];
//     gulp.src(filePath.lessSrc)
//         .pipe(less({ style: 'expanded' }))
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions', 'Android >= 4.0', 'last 2 Explorer versions', 'last 3 Safari versions', 'Firefox >= 20', '> 5%'],
//             cascade: true, //是否美化属性值 默认：true 像这样：//-webkit-transform: rotate(45deg);transform: rotate(45deg);
//             remove: true //是否去掉不必要的前缀 默认：true
//         }))
//         .pipe(postcss(processors)) //--变得有点小
//         .pipe(gulp.dest(filePath.cssDist)) //本地目录
// });

// 定义一个less任务（自定义任务名称）
gulp.task('less2css', function() {
    gulp.src(filePath.lessSrc)
        .pipe(less({ style: 'expanded' }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0', 'last 2 Explorer versions', 'last 3 Safari versions', 'Firefox >= 20', '> 5%'],
            cascade: true, //是否美化属性值 默认：true 像这样：//-webkit-transform: rotate(45deg);transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest(filePath.cssDist));
});




// 图片处理
gulp.task('compress_img', function() {
    gulp.src(filePath.imgSrc)
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest(filePath.imgDist)); //本地目录
});


//定义一个copy js 到dist目录的task
gulp.task('copy_js', function () {
    gulp.src(filePath.jsSrc)
        .pipe(gulp.dest(filePath.jsDist));//copy进dist目录
});

gulp.task('copy_common', function () {
    gulp.src(filePath.jsSrc)
        .pipe(gulp.dest(filePath.jsDist));//copy进dist目录
});


gulp.task('dist2qybdist', function () {
    gulp.src("./dist/**/*.*")
        .pipe(gulp.dest("/Users/mac/Documents/company_work/2016QF/qqqyyybbb/beijing_qyb/QYB_New_iOS/NearQYB/Register/qyb_web/dist"));
})

gulp.task('html2qybhtml', function () {
    gulp.src("./html/**/*.*")
        .pipe(gulp.dest("/Users/mac/Documents/company_work/2016QF/qqqyyybbb/beijing_qyb/QYB_New_iOS/NearQYB/Register/qyb_web/html"));
})

gulp.task('default', ['less2css', 'copy_js', 'compress_img', 'dist2qybdist', 'html2qybhtml']);

