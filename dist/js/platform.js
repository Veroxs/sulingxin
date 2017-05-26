$(function(){
    platform.init();
})

function promptPopup(e){
    $('.prompt-popup').show();
    $('.prompt-popup').find('.nowrap-text').text(e);
    setTimeout(function() {
        $('.prompt-popup').hide()
    }, 2000)
}

var platform = {
    init:function(){
        $('#chk').click(function(){
            platform.event.isAgree(this);
        })
        $('#submit').click(function(){
            platform.event.isComplete();
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
            if($("#platName").val()==''){
                promptPopup('姓名不能为空');
                return false;
            }
            if($("#account").val()==''){
                promptPopup('平台账号不能为空');
                return false;
            }
            if($("#pas").val()==''){
                promptPopup('密码不能为空');
                return false;
            }
            
            if($("#chk-input").attr("checked")!="checked"){
                promptPopup('未同意用户协议');
                return false;
            }
            platform.submit();
            
        },
    },
    submit:function(){
        promptPopup('完成');
    }
    
}