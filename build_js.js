/**----ѹ��js��css����r.js��ʽ ѹ�����node r.js -o build_js.js ---*/

({
    appDir: './js-debug',
    // ģ���Ŀ¼��Ĭ�����������ģ����Դ����Դ�Ŀ¼��
    // ����ֵδָ����ģ�������build�ļ�����Ŀ¼��
    // ��appDirֵ��ָ����ģ���Ŀ¼baseUrl�����appDir��
    baseUrl: ".",

    // ָ�����Ŀ¼����ֵδָ��������� build �ļ�����Ŀ¼
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
    /*  -- ���ںϲ��д���һЩ���ϲ���css��ʽ�޷���Ч�������Դ��ַ�ʽ�ϲ����������Ӧ��css�ļ��������������css�ļ�����ҳ��ֱ������
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
    // ʹ�� UglifyJS ʱ�Ŀ����ò���
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
