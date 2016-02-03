$(function(){

	var module ={

		url:{
			//登录接口
			goLogin:'login.ca?type=login'
		},

		init:function(){
			var _this = this;

			$('#loginBtn').on('click',function(){
				_this.submit();
			})
		},
		//提交表单
		submit:function(){

			var username = $('#username').val(),
				department = $('#department').val(),
				mobile = $('#mobile').val(),
				password = $('#password').val();

			if (username == "" || username == null) {
				alert("用户名不能为空");
				return false;
			}
			if (mobile == "" ) {
				alert("手机号不能为空");
				return false;
			}
			if(password == ""){
				alert("密码不能为空");
				return false;
			}
			if(department==""){
				alert('请选择部门');
				return false;
			}

			var telReg = !!mobile.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/);
			if (telReg == false) {
				alert('请输入正确的手机号!');
				return;
			}

			this.doLogin({
				mobile: mobile,
				username: username,
				department: department,
				password:password,
				usergent: encodeURIComponent(navigator.userAgent) ,
				sw:window.screen.width,
				sh:window.screen.height
			});

		},
		//登录
		doLogin:function(params){
			var _this = this;

			g.loadingMask.open();

			$.ajax({
				type: "GET",
				url: g.url.host + _this.url.goLogin + '&' + g.stringfObj(params) ,
				cache: false,
				success: function (res) {

					res = JSON.parse(res);

					//result:
					//2 还未到抽奖时间
					//1 登录成功
					//0 登录失败

					if (res.result == 1) {

						g.setUserInfo(res.data);
						document.location.href = "details.html";

					} else if (res.result == 2) {

						alert('抽奖时间为2016年2月2日20:00-23:00，请按时参加。');

					}else {
						alert('登录失败，请检查您输入的信息');
					}

					g.loadingMask.close();

				},
				error:function(err){
					if(err.statusText == 'timeout'){
						alert('服务器请求超时无响应，请刷新页面');
						document.location.reload();
					}else{
						alert('登录失败，请稍后重试');
					}
					g.loadingMask.close();
				}
			});

		}

	};

	window.login = module;

	module.init();
});


	