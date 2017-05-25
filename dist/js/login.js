$(function(){
    login.init();
})
var login = {
    init:function(){
        login.event.isComplete(this);
        $('#eye').click(function() {
            login.event.isShowPassword(this);
        });
        $('#chk').click(function(){
            login.event.isAgree(this);
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
                i.prev().attr('checked',true);

            }else{
                i.removeClass('icon-checkbox2');
                i.addClass('icon-checkbox');
                i.prev().attr('checked',false);
            }
        },
        isComplete:function(){
            var phoneVal = $('#tel').val(),
            passWordVal = $('#pas').val(),
            yzmVal = $('#yzm').val(),
            agree = $('#chk').find('input');
            $('.edit').click(function(){
                if((phoneVal!='')&& (passWordVal !='')&& (yzmVal!='') && (agree.is(':checked'))){
                    $('.btn-login').attr('disabled',false);
                    console.log(111);
                }else{
                    $('.btn-login').attr('disabled',true);
                    console.log(222);
                }
            })
            
        }
    }
}