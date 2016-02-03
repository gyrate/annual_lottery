/**----压缩js和css采用r.js方式 压缩命令：node r.js -o build_js.js ---*/

({
    appDir: './js-debug',
    // 模块根目录。默认情况下所有模块资源都相对此目录。
    // 若该值未指定，模块则相对build文件所在目录。
    // 若appDir值已指定，模块根目录baseUrl则相对appDir。
    baseUrl: ".",

    // 指定输出目录，若值未指定，则相对 build 文件所在目录
    dir: "./js",


    modules: [
        {
            name: './login'

        }
       /* ,
        {
            name: 'portal/mall/mdetail-cloth'
        },
        {
            name: 'portal/designers/index'
        },
        {
            name: 'portal/lifestyle/mod_man'
        },/*
    /*  -- 对于合并有存在一些被合并的css样式无法生效的现象，以此种方式合并，不打包对应的css文件，插件的依赖的css文件改由页面直接引入
       {
            name: 'portal/beauty/index',
            exclude: ['css!plugin/jrange/jquery.range.css']
        },*/
      /*  {
            name: 'portal/magazine/index'
        },
        {
            name: 'portal/mall/mdetail-clothes'
        }
*/

    ],
    // 使用 UglifyJS 时的可配置参数
    // See https://github.com/mishoo/UglifyJS for the possible values.
   /* uglify: {
        toplevel: true,
        ascii_only: true,
        beautify: true

    },*/
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: false,
   /* mainConfigFile: "./config.js",*/
    wrap:false

})
