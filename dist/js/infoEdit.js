$(function(){
    infoEdit.init();
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

var infoEdit = {
    init:function(){
        $('#chk').click(function(){
            infoEdit.event.isAgree(this);
        })
        $('#submit').click(function(){
            infoEdit.event.isComplete();
        })
    },
    event:{
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
            if($("#name").val()==''){
                promptPopup('姓名不能为空');
                return false;
            }
            if($("#sfz").val()==''){
                promptPopup('身份证号不能为空');
                return false;
            }
            if($("#cardNum").val()==''){
                promptPopup('银行卡号不能为空');
                return false;
            }
            if($("#bank").val()==''){
                promptPopup('发卡行不能为空');
                return false;
            }
            if($("#tel").val()==''){
                promptPopup('手机号不能为空');
                return false;
            }
            if(!$("#tel").val().match(/^(((13[0-9]{1})|159|153)+\d{8})$/)){
                promptPopup('手机号格式错误');
                return false;
            }
            if($("#yzm").val()==''){
                promptPopup('验证码不能为空');
                return false;
            }
            if($("#chk-input").attr("checked")!="checked"){
                promptPopup('未同意用户协议');
                return false;
            }
            infoEdit.submit();
            
        },
    },
    submit:function(){
        promptPopup('完成');
    }
    
}