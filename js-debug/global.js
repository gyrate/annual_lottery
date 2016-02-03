(function(){

    var module = {

        _dpr:null,

        url:{
            //根目录
            //host:'http://localhost/canudiloAu/',
            host:'/canudiloAu/',

            //登录接口，登录参数有四个
            login:'login.ca?type=login',
        },

        //保存用户相关信息
        user:{
            name: '', //用户名
            lotteryResult: null//抽奖结果
        },

        //缓存用户信息
        setUserInfo:function(obj){

            //username department password  mobile awardtime awardrank loginstatus
            for(var x  in obj){
                window.localStorage[x] = obj[x];
            }
        },

        //获取用户信息
        getUserInfo:function(){

            if(!window.localStorage){
                return {};
            }

            return {
                username: window.localStorage.username,
                department: window.localStorage.department,
                password: window.localStorage.password,
                mobile: window.localStorage.mobile,
                awardrank: window.localStorage.awardrank
            }
        },
        //将一个对象字符串化
        stringfObj: function (obj) {

            var arr = [];
            for (var x in obj) {
                arr.push(x + '=' + obj[x]);
            }
            return arr.join('&');
        },

        //设备像素比适配
        fitScreen: function () {
            var dpr, scale;
            var metaEl = $('meta[name="viewport"]')[0];

            if (/iPhone/ig.test(window.navigator.userAgent)) {
                dpr = window.devicePixelRatio || 1;
            } else {
                dpr = 1;
            }

            scale = 1 / dpr;
            this._dpr = dpr;
            metaEl.setAttribute('content', 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
        },

        //使页面高度自适应屏幕
        fitPage: function () {

            //目前 -64是针对IOS微信的做法，可视区域的高度计算仍有待优化
            //window.screen.availHeight
            var _h = window.screen.availHeight /*- 64*/;

            if (/iPhone/ig.test(window.navigator.userAgent)) {
                $('div.page').css('height', _h * this._dpr);
            } else {
                $('div.page').css('minHeight',600);
            }

        },

        //加载中遮罩层
        loadingMask: {
            dom: null,
            render: function () {
                this.dom = $('<div></div>').appendTo('body');
                this.dom.addClass('mask').html('<div class="loading"><div class="double-bounce1"></div> <div class="double-bounce2"></div></div>');
            },
            open: function () {

                if (!this.dom || this.dom.length <= 0) {
                    this.render();
                }
                this.dom.show();
            },
            close: function () {
                this.dom.hide();
            }
        },

        //检测是否登录
        //发送请求，获得用户数据
        //姓名，手机号码，刮奖状态，刮奖结果，是否已登录
        checkLogin:function(successCallback, failCallback){

            this.loadingMask.open();

            var _this = this;

            var userinfo = this.getUserInfo();
            if(userinfo['awardrank']){
                delete userinfo['awardrank'];
            }

            var params = this.stringfObj(userinfo);

            //用户信息不够4个参数
            if (params.match(/username|department|password|mobile/g).length < 4) {
                failCallback.call();
                return;
            }

            $.ajax({
                url: this.url.host + this.url.login + '&' + params + '&t='+new Date().getTime(),
                type: 'GET',
                cache:false,
                success: function (res) {

                    res = JSON.parse(res);
                    _this.loadingMask.close();

                    if (res.result == true && res.data['loginstatus'] > 0) {
                        //用户已经登录
                        _this.setUserInfo(res.data)
                        successCallback.call();
                    }else{
                        failCallback.call();
                    }
                },
                error:function(err){
                    if(err.statusText == 'timeout'){
                        alert('服务器请求超时无响应，请刷新页面');
                        document.location.reload();
                    }else{
                        alert('服务器发生了意料之外的错误，请稍后重新登录。');
                        document.location.href = 'login.html';
                    }
                    _this.loadingMask.close();
                }
            });
        }

    };

    window.g = module;

    module.fitScreen();

    $.ajaxSetup({
        timeout: 10000 //超过10秒无响应则返回超时错误
    });

})(window);

