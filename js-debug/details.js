$(function(){

    var module ={

        url:{
            //获取奖券池
            getTicktes:'award.ca?type=getradata', //&mobile=123

            //通过奖券id得到对应的奖品信息
            getPrize:'award.ca?type=getadata', //&mobile=123&id=xcve

            //提交已经刮奖的状态
            changeAwardState:'award.ca?type=awrad' //&mobile=123&id=xcve
        },

        awardrank : null, //获得奖品等级

        hadAlert: false, //是否已经弹窗显示抽奖结果

        awardPull:[], //抽奖号码池

        ticketId:null,//用户抽取的刮奖券id

        SECOND: 5,//在*秒时间内选择奖券，否则重新获取奖券

        imgUrls:[
            'camera', //一等奖
            'iphone', //一等奖
            'ipad', //二等奖
            '2000', //三等奖
            '1000', //四等奖
            '800', //五等奖
            '500', //六等奖
            '300' //七等奖
        ], //奖品等级对应图片路径

        init:function(){

            var _this = this;

            //页面自适应屏幕尺寸
            //htc e9t 高度计算异常
            //g.fitPage();

            //鼠标事件
            this.initEnterActive();

            g.checkLogin(function(){

                _this.awardrank = g.getUserInfo()['awardrank'];

                //渲染刮奖层
                _this.render();

            },function(){
                //没有登录
                alert('请先登录');
                document.location.href = 'login.html';
            });
        },


        initEnterActive:function(){
            //隐藏活动规则
            $('#about_tigger').bind('click',function(){
                $('#page_about').fadeOut();
            });

            //显示活动规则
            $('#prelude_introduce , #scratch_introduce').bind('click',function(){
                $('#page_about').fadeIn();
            });
        },

        render:function(){

            var _this = this;

            //已经刮过奖
            if (_this.awardrank >= 0) {

                $('#page_prelude').hide();
                $('#page_scratch').show();

                var info = g.getUserInfo();
                $('#scratch_user').html(info['username'] + ' ' + info['mobile']);

                var img = new Image();
                img.addEventListener('load', function (e) {
                    _this.doRenderStatus(img);
                });
                img.src = '../images/lottery/' + _this.imgUrls[_this.awardrank] + '.jpg';
            } else {
                //还没有刮过奖

                //洗牌
                _this.doRenderShuffle(function(index){

                    //选择一张券，确定最终奖项
                    var index = parseInt(index / _this.awardPull.length, 10);
                    _this.ticketId = this.awardPull[index];

                    $('#prelude_downcount').hide();
                    $('#page_prelude').hide();
                    //得到奖品信息
                    _this.getMyAward();

                });

            }

        },

        //已刮过奖，渲染结果
        doRenderStatus:function(img){

            var con = $('#gua_border'),
                canvas = con.find('canvas');

            canvas.hide();
            con.find('.bg')[0].style.backgroundImage = 'url(' + img.src + ')';

            $('#scratch_result').show();
        },

        //出牌
        doRenderTickets:function(callback){

            var _this = this,
                contain =  $('#prelude_main');

            g.loadingMask.open();

            //获取所有奖券数据
            $.ajax({
                url: g.url.host + _this.url.getTicktes + '&mobile=' + g.getUserInfo()['mobile'],
                cache:false,
                success:function(res){

                    res = JSON.parse(res);
                    var data = res.data;

                    if (data.length <= 0) {
                        alert('你来晚了，没有票了');
                    }

                    _this.awardPull = data;

                    //打乱抽奖号码
                    _this.awardPull.sort(function () {
                        return 0.5 - Math.random();
                    });

                    $('#prelude_begin').show();
                    g.loadingMask.close();

                    //开启五秒时限
                    _this.initDownCount();

                    callback && callback.call();

                },
                error:function(err){
                    if(err.statusText == 'timeout'){
                        alert('服务器请求超时无响应，请刷新页面');
                        document.location.reload();
                    }else{
                        alert('出票失败，请刷新页面');
                    }
                    g.loadingMask.close();
                }
            })
        },

        //倒计时，如果在规定时限内没有选择任何一张刮奖券，系统将重新分配9张刮奖券
        initDownCount: function () {

            var _this = this,
                headline = $('#prelude_downcount'),
                em1 = headline.find('em').eq(0),
                em2 = headline.find('em').eq(1),
                count = _this.SECOND;

            //显示倒计时文字
            $('#prelude_downcount').show();

            em1.text(count);

            var inter = setInterval(function(){
                if (count >= 0) {
                    em2.text(count);
                    count--;
                } else {
                    //时间到，清除周期函数
                    clearInterval(inter);

                    if(_this.ticketId == null){
                        //仍没有选择任何奖券
                        alert('超过时限，系统将重新选择奖券');
                        document.location.reload();
                    }
                }
                //已抽奖，清除周期函数
                if(_this.ticketId !== null){
                    clearInterval(inter);
                }
            },1000);
        },

        //洗牌
        doRenderShuffle:function(callback){

            var _this = this;

            //监听[开始刮奖]按钮,开始获取待抽奖券
            $('#prelude_begin').bind('click',function(){
                mainHandler();
            });

            function mainHandler(){
                //出牌
                _this.doRenderTickets(function(){

                    var items = $('#prelude_main').children();

                    //渲染所有奖券背面
                    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    arr.sort(function () {
                        return 0.5 - Math.random();
                    });
                    for (var i = 0, len = arr.length; i < len; i++) {
                        items[i].src = '../images/pre_gua/back/' + arr[i] + '.png';
                    }

                    //洗牌动画
                    items.addClass('item_mi');

                    //隐藏[开始刮奖]按钮
                    $('#prelude_begin').hide();
                    //显示"请选择一张奖券"
                    $('#prelude_tip').show();

                    items.bind('click', function () {
                        console.log('click');
                        var index = $(this).index();
                        callback.call(_this, index);
                    });


                    //动画效果
                    items.bind('webkitTransitionEnd', function () {
                        items.removeClass('item_mi');
                    });

                });
            }

        },

        //通过我选择的id查找到对应的奖项
        getMyAward: function (id) {

            var _this =this;

            g.loadingMask.open();
            $.ajax({
                url: g.url.host + _this.url.getPrize +'&'+ g.getUserInfo()['mobile'] + '&id=' + _this.ticketId,
                cache:false,
                success:function(res){

                    //{"result":true,"error":"","data":{"id":"2F3FACA6A454222EB3811585B67B64BF","performance":"portal","version":"20160113","awardrank":1,"desc":"一等奖，佳能单反相机", "status":0}}
                    res = JSON.parse(res);

                    if(res.result){

                        _this.awardrank = res.data['awardrank'];

                        //渲染刮奖券
                        $('#page_scratch').show();
                        var info = g.getUserInfo();
                        $('#scratch_user').html(info['username'] + ' ' + info['mobile']);

                        var img = new Image();
                        img.addEventListener('load', function (e) {
                            _this.doRenderTicket(img);
                        });
                        img.src = '../images/lottery/' + _this.imgUrls[_this.awardrank] + '.jpg';


                    }else{
                        alert('奖品兑换失败，请刷新页面重试');
                    }

                    g.loadingMask.close();
                },
                error:function(err){
                    if(err.statusText == 'timeout'){
                        alert('服务器请求超时无响应，请刷新页面');
                        document.location.reload();
                    }else{
                        alert('奖品兑换失败，请刷新页面重试');
                    }
                    g.loadingMask.close();
                }
            })
        },


        //渲染Canvas最终刮奖券
        doRenderTicket: function (img) {

            var _this = this,
                mousedown = false;

            var ctx,
                con = $('#gua_border'),
                w = con.width(),
                h = con.height(),
                canvas = con.find('canvas')[0];
            offsetX = null,
                offsetY = null;

            function eventDown(e) {
                e.preventDefault();
                mousedown = true;

                var offset = $(this).offset();
                offsetX = offset.left;
                offsetY = offset.top;
            }

            function eventUp(e) {
                e.preventDefault();
                mousedown = false;

                var donePercent = getTransparentPercent();
                if(donePercent > 50 ){

                    //已刮奖区域超过50%，则刮奖完成
                    $(this).fadeOut('fast');

                    //异步提交状态，我已经刮过奖
                    _this.submitState();

                }
            }

            function eventMove(e) {
                e.preventDefault();
                if (mousedown) {
                    if (e.changedTouches) {
                        e = e.changedTouches[e.changedTouches.length - 1];
                    }
                    var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,
                        y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
                    with (ctx) {
                        beginPath();
                        arc(x, y, 40, 0, Math.PI * 2);
                        fill();
                    }
                }
            }

            //计算涂抹区域占百分比
            function getTransparentPercent () {
                var imgData = ctx.getImageData(0, 0, w, h),
                    pixles = imgData.data,
                    transPixs = [];
                for (var i = 0, j = pixles.length; i < j; i += 4) {
                    var a = pixles[i + 3];
                    if (a < 128) {
                        transPixs.push(i);
                    }
                }
                return (transPixs.length / (pixles.length / 4) * 100).toFixed(2);
            }

            con.find('.bg')[0].style.backgroundImage = 'url(' + img.src + ')';

            canvas.width = w;
            canvas.height = h;


            ctx = canvas.getContext('2d');
            ctx.fillStyle = 'gray';
            ctx.fillRect(0, 0, w, h);

            ctx.globalCompositeOperation = 'destination-out';
            canvas.addEventListener('touchstart', eventDown);
            canvas.addEventListener('touchend', eventUp);
            canvas.addEventListener('touchmove', eventMove);
            canvas.addEventListener('mousedown', eventDown);
            canvas.addEventListener('mouseup', eventUp);
            canvas.addEventListener('mousemove', eventMove);
        },

        //异步提交状态，我已经刮过奖
        submitState:function(){

            var _this = this;

            g.loadingMask.open();


            $.ajax({
                url: g.url.host + _this.url.changeAwardState +'&mobile='+ g.getUserInfo()['mobile'] + '&id=' + _this.ticketId,
                cache:false,
                success:function(res){

                    res = JSON.parse(res);

                    if (res.result === true) {

                        //提交状态成功后执行
                        $('#scratch_result').fadeIn();
                        alert('您的刮奖结果已保存');

                    }else if(res.result === false){

                        //{"result":false,"error":"","errorcode":1,"data":{}}

                        if (res.errorcode == 1) {
                            alert('该奖券已经被抽取过，请重新抽奖');
                        } else if (res.errorcode == 2) {
                            alert('您已刮过奖，不需再次操作');
                        } else {
                            alert('刮奖结果没有保存成功，请刷新页面');
                        }
                        document.location.reload();

                    }

                    g.loadingMask.close();
                },
                error:function(err){
                    if(err.statusText == 'timeout'){
                        alert('服务器请求超时无响应，请刷新页面');
                        document.location.reload();
                    }else{
                        alert('刮奖结果没有保存成功，请刷新页面');
                    }
                    g.loadingMask.close();
                }
            })

        }

    };

    module.init();
    g.fitPage();
});

	




