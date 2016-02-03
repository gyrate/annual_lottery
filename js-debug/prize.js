$(function(){

   var module = {

       url:{
           //查询获奖名单
           getTicktes:'search.ca?type=getallawrad'
       },

       imgUrls:[
           'camera', //一等奖
           'iphone', //一等奖
           'ipad',  //二等奖
           '2000', //三等奖
           '1000', //四等奖
           '800', //五等奖
           '500', //六等奖
           '300' //七等奖
       ], //奖品等级对应图片路径

       prizeTypes:[
           '佳能OS 760D 单反套机',//一等奖
           'iphone 6s 64G',//一等奖
           'iPad mini 16G', //二等奖
           '2000元摩登现金券', //三等奖
           '1000元摩登现金券', //四等奖
           '800元摩登现金券', //五等奖
           '500元摩登现金券', //六等奖
           '300元摩登现金券' //七等奖
       ],

       //获奖信息列表
       prizeList:[],

       init:function(){

           var _this = this;

           g.checkLogin(function(){
               //已经登录

               var info = g.getUserInfo();
               $('#prize_user').html(info['username'] + ' ' + info['mobile']);

               var level = info.awardrank;
               if (level >= 0) {
                   //抽过奖
                   $('#ticket img').attr('src', '../images/price/' + _this.imgUrls[level] + '.png');
               } else {
                   //未抽奖
                   $('#ticket img').bind('click',function () {
                       document.location.href = 'details.html';
                   })
               }

               //获取获奖列表
               _this.renderBrand();

           },function(){
               //没有登录
               alert('请先登录');
               document.location.href = 'login.html';
           });

       },
       renderBrand:function(){

           var _this = this;

           g.loadingMask.open();

           $.ajax({
               url: g.url.host + _this.url.getTicktes,
               cache:false,
               success:function(res){

                   res = JSON.parse(res);

                   if(!res.result){
                       alert('获取[获奖名单]失败，请刷新页面重试');
                       return;
                   }

                   _this.prizeList = res.data;
                   _this.doRenderBrand();
                   g.loadingMask.close();
               },
               error:function(err){
                   if(err.statusText == 'timeout'){
                       alert('服务器请求超时无响应，请刷新页面');
                       document.location.reload();
                   }else{
                       alert('获取[获奖名单]失败，请刷新页面重试');
                   }
               }
           })

       },

       //渲染获奖名单
       doRenderBrand:function(){

            var _this = this,
            arr =  this.prizeList;

           var ul = $('#list');

           if (arr.length == 0) {
               ul.html('<li>目前还没有人获奖</li>');
               return;
           }

           for (var i = 0, len = arr.length; i < len; i++) {
               ul[0].innerHTML += '<li>恭喜 ' + arr[i]['username'] + ': 获得' + _this.prizeTypes[arr[i]['awardrank']]  + '</li>';
           }

           //重新定义容器的高度
           this.fitBrandHeight();

           var ch = ul.outerHeight(),
               wh = $('#brand').outerHeight(),
               mt = 0,
               speed = 3;

           if ( ch  <= wh + speed * 10) {
               //内容高度小于容器高度，则不需要滚动
               return;
           }


           //循环滚动
           setInterval(function(){

               if (mt < wh - ch) {
                   mt = 0
               } else {
                   mt = mt - speed;
               }

               ul[0].style.marginTop = mt + 'px';

           },100);

       },
       //重新计算获奖板块的高度
       fitBrandHeight: function () {

           var isIphone = /iPhone/ig.test(window.navigator.userAgent),
               dpr = isIphone ? window.devicePixelRatio : 1;

           if(!isIphone){
               //安卓手机存在太多高度计算异常的情况，当前不重新调整其高度
               return;
           }

           var h = window.screen.availHeight * dpr - $('#caption').outerHeight() - $('#ticket').outerHeight() - 64;
           $('#brand').height(h);
       }
   } ;

    module.init();

});