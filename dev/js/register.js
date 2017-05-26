$(function(){
    register.init();
    //获取短信验证码
    var validCode=true;
    $("#getMsg").click (function  () {
        setTimeout(function(){
            promptPopup('信息已发送');
        },1000);
        var time=30;
        var code=$(this);
        if (validCode) {
            validCode=false;
            code.addClass("unabled");
        var t=setInterval(function  () {
            time--;
            code.html(time+"秒");
            if (time==0) {
                clearInterval(t);
            code.html("重新获取");
                validCode=true;
            code.removeClass("unabled");

            }
        },1000)
        }
    })
})

function promptPopup(e){
    $('.prompt-popup').show();
    $('.prompt-popup').find('.nowrap-text').text(e);
    setTimeout(function() {
        $('.prompt-popup').hide()
    }, 2000)
}

var register = {
    init:function(){
        // register.event.isComplete(this);
        $('.eye').click(function() {
            register.event.isShowPassword(this);
        });
        $('#chk').click(function(){
            register.event.isAgree(this);
        })
        $('#login').click(function(){
            register.event.isComplete();
        })
    },
    event:{
        isShowPassword:function(e){
            var input = $(e).parents('.mima').find('input');
            if($(e).hasClass('icon-biyan')){
                $(e).removeClass('icon-biyan');
                $(e).addClass('icon-zhengyan');
                input.attr('type','text');

            }else{
                $(e).removeClass('icon-zhengyan');
                $(e).addClass('icon-biyan');
                input.attr('type','password');
            }
        },
        isAgree:function(e){
            var i = $(e).find('.icon');
            if(i.hasClass('icon-checkbox')){
                i.removeClass('icon-checkbox');
                i.addClass('icon-checkbox2');
                $('#chk-input').attr('checked',"checked");

            }else{
                i.removeClass('icon-checkbox2');
                i.addClass('icon-checkbox');
                $('#chk-input').removeAttr('checked',"checked");
            }
        },
        isComplete:function(){
            if($("#tel").val()==''){
                promptPopup('手机号不能为空');
                return false;
            }
            if(!$("#tel").val().match(/^(((13[0-9]{1})|159|153)+\d{8})$/)){
                promptPopup('手机号格式错误');
                return false;
            }
            if($("#pas").val().length<6){
                promptPopup('密码必须多于或等于6个字符');
                return false;
            }
            if($("#pas").val().length>20){
                promptPopup('密码必须少于或等于20个字符');
                return false;
            }
            if($("#pasRepeat").val()!=$("#pas").val()){
                promptPopup('两次密码不一致');
                return false;
            }
            if($('#yzm').val()==''){
                promptPopup('验证码不能为空');
                return false;
            }
            if($("#chk-input").attr("checked")!="checked"){
                promptPopup('未同意用户协议');
                return false;
            }
            register.submit();
            
        },
    },
    submit:function(){
        promptPopup('登录成功');
    }
    
}