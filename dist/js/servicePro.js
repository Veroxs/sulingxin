$(function(){
    servicePro.init();
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

var servicePro = {
    init:function(){
        $('#chk').click(function(){
            servicePro.event.isAgree(this);
        })
        $('#submit').click(function(){
            servicePro.event.isComplete();
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
            if($("#tel").val()==''){
                promptPopup('电话不能为空');
                return false;
            }
            if($("#pas").val()==''){
                promptPopup('密码不能为空');
                return false;
            }
            if($("#meg").val()==''){
                promptPopup('动态码不能为空');
                return false;
            }
            
            if($("#chk-input").attr("checked")!="checked"){
                promptPopup('未同意用户协议');
                return false;
            }
            servicePro.submit();
            
        },
    },
    submit:function(){
        promptPopup('完成');
    }
    
}