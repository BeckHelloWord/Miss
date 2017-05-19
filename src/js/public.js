/**
 * Created by huangyexin on 2016/10/31.
 */
var Interface = require("./interface.js");
var MD5 = require("./md5.js");
import Vue from 'vue'
import layer from '../../static/layer.js'
Vue.use(layer);
export default {
    data(){
      return {
        options:{
            debug:false//生产
            //  debug:true
        },
        siteInfo:{
            siteName : "宝象金融",
            shortName : "宝象",
            domain : "www.bxjr.com",
            currentDeposit : "添添金",
            company:"上海宝象金融信息服务有限公司",
            agreementAddress:"上海市浦东新区向城路288号国华人寿金融大厦5F",
            agreementAddressShort:"上海市浦东新区"
        }
      }
    },
    Auth : {
        get: function () {
            var result = {};
            try{
                result = JSON.parse(localStorage['persion']);
            }catch(r){
                result = sessionStorage['persion'] && JSON.parse(sessionStorage['persion']);
            }
            if("object" === typeof result){
                return result['accessToken'];
            }
            return 0;
        },
        set: function (_user) {
            window.setTokenFlag=true;
            if(_user.accessToken&&_user.accessToken=="app"){
                this.remove()
			}else{
                try{
                    window.setTokenFlag=true
                    localStorage['persion'] = JSON.stringify(_user);
                    //DOTO! 使用此方法需要解决切换用户后第一次访问的问题(立即token覆盖问题)
                }catch(r){
                    sessionStorage['persion'] = JSON.stringify(_user);
                }
            }
        },
        remove: function () {
            try{
                localStorage.removeItem('persion');
            }catch(r){
                sessionStorage.removeItem('persion');
            }
        }
    },
    API_GET :function(config){
        var data = config['data'] || {};
        var _this=this
        config['success'] = config['success'] || function(){};
        config['fail'] = function(response){
            //console.log(response);
            if(/重新登录/.test(response.message)){
                this.Auth.remove();
            }
        };
        var _config = {
            'API_KEY' : this.Auth.get(), //不可为null
            'SECRET' : 'UYGGYG876T6759HUHI975T7GGKJO9786456EDC08'
        };

        var param = function(obj) {
            //console.log(_config);
            var newobj = { 'api_key' : _config['API_KEY'], 'ct' : 1, 'bt' : 2 },
                tmparr = ['api_key', 'ct', 'bt'],
                query = [], name, value, subName, querytext;

            for(name in obj) {
                tmparr.push(name);
                newobj[name] = obj[name]; //复制一个新的obj,为了不影响原有formData数据
            }
            tmparr.sort();

            for(var i = 0, len = tmparr.length; i < len; i++) {
                name = tmparr[i];
                value = newobj[name];
                if(value instanceof Array) {
                    value = value.join(',');
                }else if(value instanceof Object) { //解决 select BUG
                    for(subName in value) {
                        value = value[subName];
                        break;
                    }
                }
                if(value !== undefined && value !== null){
                    query.push(name + '=' + value);
                    //query.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
                }
            }
            querytext = _config['SECRET'] + query.join('').split('=').join('');
            return query.join('&') + '&sign=' + MD5.MD5(querytext).toUpperCase();
        };

        $.ajax({
            type: 'POST',
            url: Interface.default.Model[config['url']],
            data: (String(data) == '[object Object]' ? param(data) : data),
            dataType: 'json',
            success: function(response,textStatus, request){
                if(response.data == null){ response.data = []; }
                if(response.isSuccess == false){
                    //  if(response.status=="201"){
                    //      //业务异常 alert
                    //     alert(response.message)
                    // }
                    if(response.status=="301"){
                         //登出 alert
                        window.Hub.$emit("loginOut",response.message)
                        _this.Auth.remove();
                        return
                    }
                    if(response.status=="500"){
                         //系统异常
                        alert(response.message);
                      return
                    }
                    if(response.status=="501"){
                         //网络不稳定
                       alert(response.message)
                      return
                    }
                    if(response.status=="401"){
                         //非法客户端  网络异常
                      alert(response.message)
                      return
                    }

                }
                //publicArr[cache['url']][cache['data']] = JSON.stringify(response);
                config['success'](response, request);
            },
            error: config['error']
        });

    },
    sendCode:function(options){

                // Public.sendCode({
				// 	useImg:true,
				// 	ajaxUrl:"//10.0.20.13/secure/send-register-mobile.html",
				// 	mobile:"136816164587"
				// })
                			// Public.initBaiQiShi()


        var sendNode = $(this);
        var data = $(this).hasClass("sendVoice") ? {voice: true} : {};
        /*阿里反欺诈引用*/
        var eventType
        var aliTokenKey
        pointman.use('do', function () {
            var afs = pointman.getConfig();
            eventType = afs.scene;
            aliTokenKey= afs.token;
        });
        data.needAfVerfy=true;
        data.eventType=eventType;
        data.aliTokenKey="0#2PJG14842919956105042681051314948342308578142BA477700510A7DF4852EB4A0B25CCA5F0EB6A3B21927F229E0703F0FBC2AF6169292ECEBAB13FB3CD43AD3E795C914C1D06AFFF2E06FF78CF5CD3E3532A4CED";
        data.mobile=options.mobile;
        console.log(data)
        if(options.useImg){
            layer.dialog({
                // title: ['请输入图片验证码',"background:#f0f1f2"], // 第一个是标题内容  第二个是标题栏的style(可以为空)
                content: '<div class="imgVerify"  style="display:block">' +
                                '<div class="hd">请输入图片验证码</div>' +
                                '<div class="imgVerifyForm" id="imgVerifyForm">' +
                                '<label>' +
                                '<input type="text" name="captcha" id="captcha" datatype="/^[\w\W]{4}$/" nullmsg="请输入验证码！" maxlength="4" placeholder="不区分大小写" />' +
                                '<span>' +
                                '<img width="120" height="40" id="captcha-img" />' +
                                '</span>' +
                                '</label>' +
                                '<p>' +
                                '<button type="submit" class="imgVerifyBtn">确认</button>' +
                                '<a class="imgVerifyBtn close" href="javascript:void(0);">取消</a>' +
                                '</p>' +
                                '</div>' +
                                '</div>',
                contentClass: "voucherList",
                time: 2000000,
                bindFun: () => {
                                            //验证码图片显示和增加事件
                                $("#captcha-img").click(function(){
                                    var me = $('#captcha-img');
                                    me.attr("src", "http://10.0.20.13/" + "router/common/captcha?v=" + Math.random() + "&w=" + me.attr("width") + "&h=" +me.attr("height"));
                                }).click();
                                
                                //取消按钮
                                $(".imgVerify .close").click(function(){
                                layer.instanceList[0].close()
                                });
                                $(".sendMobile").blur();
                                //确定按钮
                                var sendCaptcha=function(){
                                    if(($("#captcha").val().length)==4){
                                        data.captcha = $("#captcha").val();
                                        docheck(function(){
                                        layer.instanceList[0].close()
                                            var typeC = $.cookie('sendCodeType');
                                            $.cookie('sendCodeType',(typeC == "voice" || typeC == undefined)?"code":"voice",{ expires: 30*60*1000 });
                                            if($("#voice-verification").hasClass("hideAll")){
                                                setTimeout(function () {
                                                    $("#voice-verification")[0].className = "showVerify";
                                                },10000);
                                            }
                                        });
                                    }else{
                                        $("#captcha").select();
                                    }
                                }

                                $(".imgVerifyBtn").eq(0).click(sendCaptcha);
                                $("#captcha").keydown(function(event){
                                    if(event.keyCode==13){
                                        sendCaptcha()
                                    }
                                });
                }
            })
        }else{
            if($("#voice-verification").hasClass("hideAll")){
                setTimeout(function () {
                    $("#voice-verification")[0].className = "showVerify";
                },10000);
            }
            docheck();
        }

        function docheck(_callback){
                    $.ajax({
                        url: options.ajaxUrl,
                        loading: true,
                        data: data,
                        loadingText: '验证码发送中',
                        dataType: 'json',
                        type: 'POST',
                        error: function(data, transport) {
                            if(data.responseJSON){
                                this.success(data.responseJSON)
                            }else{
                                this.success(data)
                            }
                        },
                        success: function(data){
                            console.log(data)
                        } 
                    });
                }

  

    },
    initBaiQiShi:function(){
        var _this=this;
        var script = document.createElement('script') ;
        script.setAttribute( 'data-app',"ewogICJjb21tb24iOiB7CiAgICAiYXBwa2V5IjogIjJQSkciLAogICAgInVzZUN1c3RvbVRva2VuIjogZmFsc2UsCiAgICAic2NlbmUiOiAiUmVnaXN0ZXJfaDUiLAogICAgImZvcmVpZ24iOiAwCiAgfSwKICAidWFiIjogewogICAgIkV4VGFyZ2V0IjogWwogICAgICAicHdkaWQiCiAgICBdLAogICAgInVzZUN1c3RvbVRva2VuIjogZmFsc2UsCiAgICAiRm9ybUlkIjogIm15X2Zvcm0iLAogICAgIkxvZ1ZhbCI6ICJ1YV9sb2ciLAogICAgIlNlbmRJbnRlcnZhbCI6IDIwLAogICAgIlNlbmRNZXRob2QiOiAzLAogICAgIk1heE1DTG9nIjogMTUwLAogICAgIk1heEtTTG9nIjogMTUwLAogICAgIk1heE1QTG9nIjogMTUwLAogICAgIk1heEdQTG9nIjogNSwKICAgICJNYXhUQ0xvZyI6IDE1MCwKICAgICJHUEludGVydmFsIjogNTAsCiAgICAiTVBJbnRlcnZhbCI6IDUwLAogICAgIk1heEZvY3VzTG9nIjogMTUwLAogICAgImlzU2VuZEVycm9yIjogMSwKICAgICJJbWdVcmwiOiAiLy9jZmQuYWxpeXVuLmNvbS9jb2xsZWN0b3IvYW5hbHl6ZS5qc29ucCIsCiAgICAiR2V0QXR0cnMiOiBbCiAgICAgICJocmVmIiwKICAgICAgInNyYyIKICAgIF0sCiAgICAiRmxhZyI6IDE5NjU1NjcKICB9LAogICJ1bWlkIjogewogICAgInRpbWVvdXQiOiAzMDAwLAogICAgInRpbWVzdGFtcCI6ICIiLAogICAgInRva2VuIjogIiIsCiAgICAic2VydmljZVVybCI6ICJodHRwczovL3ludWYuYWxpcGF5LmNvbS9zZXJ2aWNlL3VtLmpzb24iLAogICAgImFwcE5hbWUiOiAiIiwKICAgICJjb250YWluZXJzIjogewogICAgICAiZmxhc2giOiAiY29udGFpbmVyIiwKICAgICAgImRjcCI6ICJjb250YWluZXIiCiAgICB9CiAgfQp9") 
        script.type ='text/javascript' ;
        script.src = '//g.alicdn.com/sd/pointman/js/pt.js' ;
        var head = document.getElementsByTagName('head').item(0);
        head.insertBefore(script,document.getElementsByTagName('script')[0]);
        script.onload=function(){
 //反欺诈js接口环境
        (function () {
           window._saber = {
                partnerId: 'bxjr',
                appId: 'P2P',
                tokenKey: "24bb1930-4590-40c9-a493-8c5edb85db0f"
            };
            var aa = document.createElement('script'); aa.async = true;
            aa.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'df.baiqishi.com/static/webdf/saber.js?t=' + (new Date().getTime() / 3600000).toFixed(0);
            var bb = document.getElementsByTagName('script')[0]; bb.parentNode.insertBefore(aa, bb);
        })();
        }
           
    }
    
}

// if(this.options.debug && !/.com/.test(location.host) && Auth.get() == 0){
//     setTimeout(function(){
//         var str1=prompt('请输入用户名','');
//         var str2=prompt('请输入密码','');
//         if(str1 && str2){
//             API_GET({
//                 url : 'loginOn',
//                 data : { username : str1, password : str2 },
//                 success : function(result){
//                     if (result.isSuccess) {
//                         Auth.set(result.data);
//                     }else{
//                         alert(result.message);
//                     }
//                 }
//             });
//         }
//     },0);
// }
var jumpApp = function(response) {
    try{localStorage.setItem('appFunc',JSON.stringify(response));}catch(r)
    {sessionStorage.setItem('appFunc',JSON.stringify(response));}
}
window.setToken = function(accessToken){

    Auth.set({"accessToken": accessToken});
}

