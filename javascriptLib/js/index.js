
$(function(){

    $('.login').click(function(){
       // alert('')
        $('#login').show().center();
    });

     $('#login').drag('H2').center();
    $('#login .close').click(function(){
      //  alert('')
         $('#login').hide(); 
    });
   $(window).bind('resize',function(){
    //alert($('#login').offset().top)
     if($('#login').offset().top<=0){
       $('#login').css('top','0px');
       // alert('')
     }
   });
   if($.cookie('user')){
       $('#header .info').show().html($.cookie('user')+'你好！');
       $('#header .login').hide();
       $('#header .reg').hide();
   }
  // console.log($.cookie('user',null,-1));
   $('#login .login .submit').click(function(){
    //alert('')
     var fmlogin= $('#login .login').get(0);
        $(fmlogin).find('.submit').attr('disabled',true).css('background','#ccc');

        if(!/[\w]{2,20}/.test(fmlogin.user.value)  && fmlogin.user.value==''){
            $(fmlogin).find('.submit').removeAttr('disabled').css('background','green');
            show_info('用户名不正确!','aa');
            $('#login .info').show().html('用户名格式不正确');
            setTimeout(function(){
                $('#info').hide();
               
            },1500);
        }else{
             $('#login .info').hide();
            show_info('正在尝试登陆中...','loading.gif');
            $.ajax({
                'method':'post',
                'url':'User/login.php',
                'data':$('#login .login').serialize(),
                success:function(msg){

                    if(msg==1){
                        show_info('登陆成功！...','success.gif');
                        $(fmlogin).find('.submit').removeAttr('disabled').css('background','green');
                        //生成cookie
                        
                        $('#header .login').hide();
                        $('#header .reg').hide();
                        setTimeout(function(){
                         $.cookie('user',$('#login .login_user').val() );  //生成cookie
                        $('#header .info').show().html($.cookie('user')+'你好！');
                            $('#info').hide();
                            fmlogin.reset();
                            $('#login').hide();
                        },1500 );
                       //有数据，表示成功
                       
                    }else{
                       // 没有成功，没数据！；
                        show_info('登陆失败！...');
                        setTimeout(function(){
                            $('#info').hide();
                        }, 1500);
                        $(fmlogin).find('.submit').removeAttr('disabled').css('background','green');
                    }
                },
                async:true
            }); //ajax
        }
   });
//个人中心
   // console.log($('#header .member_ul'))
    $('#header .member').hover(function () {
       // alert('')
        $(this).css('background', 'url(images/arrow2.png) no-repeat 55px center');
        $('.member_ul').show().animate({
            t : 30,
            step : 10,
            mul : {
                o : 100,
                h : 120
            }
        });
    }, function () {
        $(this).css('background', 'url(images/arrow.png) no-repeat 55px center');
        $('.member_ul').animate({
            t : 30,
            step : 10,
            mul : {
                o : 0,
                h : 0
            },
            fn : function () {
                $('.member_ul').hide();
            }
        });
    });

    var reg=$('#reg');
    $('#header .reg').click(function(){
        reg.center().show();
    });
    $('#reg .close').click(function(){
        reg.hide();
    });


     $('#share').hover(function(){

            $(this).animate({
                'attr':'x',
                'target':0,
            })

     },function(){
         $(this).animate({
                attr:'x',
                'target':-210,
               
            })
     });
     $('#share').css('top', (Tool.getInner().height-parseInt(getStyle($('#share').first(), 'height')) ) /2+'px');

     $(window).scroll(function(){
        setTimeout(function(){

            $('#share').animate({
                mul:{
                    top:(Tool.getInner().height-parseInt(getStyle($('#share').first(), 'height') ) ) /2
                }
            });
        }, 100)
     });
     
     $('#sidebar h2').toggle(function(){
        $(this).next().animate({
            mul:{
                o:0,
                h:0
            }
        });
     },function(){
         $(this).next().animate({
            mul:{
                o:100,
                h:150
            }
        });
     })


/**********************表单验证！*******************/
var fm=$('#reg .reg').get(0);
fm.reset();
$(fm.user).bind('focus',function(){
    $('#reg .info_user').show()
    $('#reg .info_user').hide()
    $('#reg .error_user').hide()
    $('#reg .succ_user').hide()
}).bind('blur',function(){
    if($(this).val()==''){
        $('#reg .info_user').hide()
          $('#reg .error_user').hide()
            $('#reg .succ_user').hide()
    }else if(!check_user()){
        $('#reg .info_user').hide()
       // $('#reg .error_user').show()
        $('#reg .succ_user').hide()
        $('#reg .loading').hide();
    }else{
        $('#reg .info_user').hide()
        $('#reg .error_user').hide()
        $('#reg .succ_user').show()
        $('#reg .loading').hide();
    }
}).bind('keyup',function(){

});

function check_user(){
   // console.log($('#reg .userreg'));
    $('#reg .loading').show();
    var flag=true;
    if(!/[\w]{2,20}/.test( $(fm.user).val()) ){
         $('#reg .error_user').show();
        return false;
    }else{
        //通过了规则审核，然后在审核数据库的信息！
        $.ajax({
            'method':'post',
            'url':'User/find.php',
            data:{'user':$('#reg .userreg').val()},
            success:function(msg){
                if(msg=='1'){ //如果找到了就代表有，flag变成false;
                    flag=false;
                   // alert('用户名被占用')
                     $('#reg .error_user').show().html('用户名被占用..!').css('color','#f60');

                }else{
                    $('#reg .loading').hide();
                    flag=true;
                }
            },
            async:false //同步！
        })
    }
    return flag;
}
$(fm.pass).bind('focus',function(){
     $('#reg .info_pass').show();
     $('#reg .error_pass').hide();
     $('#reg .succ_pass').hide();
    
}).bind('blur',function(){
    if($(this).val()==''){
    $('#reg .info_pass').hide();
     $('#reg .error_pass').hide();
     $('#reg .succ_pass').hide();
    }else if(check_pass()){
       // alert('')
        $('#reg .info_pass').hide();
         $('#reg .error_pass').hide();
        $('#reg .succ_pass').show();
    }else{
        //不合格
        $('#reg .info_pass').hide();
         $('#reg .error_pass').show();
        $('#reg .succ_pass').hide();
    }
})

$(fm.pass).bind('keyup',function(){
    //密码验证
   check_pass();
});
function check_pass(){
     var value=Tool.trim($(fm.pass).val());
    var value_length=value.length;
    var code_length=0;
    //条件一
    if(value_length>=6 && value_length<=20){
        //alert(value_length)
        $('#reg .info_pass .q1').html('●').css('color',"green")   // ●■○◇
    }else{
        $('#reg .info_pass .q1').html('○').css('color',"#666")
    }
//条件2
    if(value_length>0 && !/\s/g.test(value)){
         $('#reg .info_pass .q2').html('●').css('color',"green")
     }else{
        $('#reg .info_pass .q2').html('○').css('color',"#666")
     }

     //条件三大写小写 数字  非空字符，任意两种混搭即可；
     if(/\d+/g.test(value)){
        code_length++;
     }
     if(/[a-z]+/g.test(value)){
        code_length++;
     }
     if(/[A-Z]+/g.test(value)){
        code_length++;
     }
     if(/[^\da-zA-Z]/.test(value)){
        code_length++;
       
     }
     if(code_length>=2){
         $('#reg .info_pass .q3').html('●').css('color',"green")
     }else{
        $('#reg .info_pass .q3').html('○').css('color',"#666")
     }
    /*安全级别*/
    // 高： 大于等于10个字符，三种不同类型的字符混拼；
    // 中： 大于
    // 从高往低判断！
    if(value_length>=10 && code_length>=3){
        $('#reg .info_pass .s1').css('color','green');
        $('#reg .info_pass .s2').css('color','green');
        $('#reg .info_pass .s3').css('color','green');
        $('#reg .info_pass .s4').html('高').css('color','green');
    }else if(value_length>=8 && code_length>=2){
        $('#reg .info_pass .s1').css('color','#f60');
        $('#reg .info_pass .s2').css('color','#f60');
        $('#reg .info_pass .s3').css('color','#ccc');
        $('#reg .info_pass .s4').html('中').css('color','#f60');
    }else if(value_length>2 && code_length>=1){
        $('#reg .info_pass .s1').css('color','maroon');
        $('#reg .info_pass .s2').css('color','#ccc');
        $('#reg .info_pass .s3').css('color','#ccc');
        $('#reg .info_pass .s4').html('低').css('color','maroon');
    }else{
        $('#reg .info_pass .s1').css('color','#ccc');
        $('#reg .info_pass .s2').css('color','#ccc');
        $('#reg .info_pass .s3').css('color','#ccc');
        $('#reg .info_pass .s4').html('')
    }
    if(value_length>=6 && value_length<=20 && !(/\s+/g.test(value)) && code_length>=2){
        return true;
    } 
}

//密码确认！；
$(fm.notpass).bind('focus',function(){
     $('#reg .info_notpass').show();
     $('#reg .error_notpass').hide();
     $('#reg .succ_notpass').hide();
    
}).bind('blur',function(){
    if($(this).val()==''){
    $('#reg .info_notpass').hide();
     $('#reg .error_notpass').hide();
     $('#reg .succ_notpass').hide();
    }else if(check_equal()){
       // alert('')
        $('#reg .info_notpass').hide();
         $('#reg .error_notpass').hide();
        $('#reg .succ_notpass').show();
    }else{
        //不合格
        $('#reg .info_notpass').hide();
         $('#reg .error_notpass').show();
        $('#reg .succ_notpass').hide();
    }
});
function check_equal(){
    return $(fm.notpass).val()==$(fm.pass).val();
}

/*回答！*/
$(fm.ans).bind('focus',function(){
     $('#reg .info_ans').show();
     $('#reg .error_ans').hide();
     $('#reg .succ_ans').hide();
}).bind('blur',function(){
    if($(this).val()==''){
    $('#reg .info_ans').hide();
     $('#reg .error_ans').hide();
     $('#reg .succ_ans').hide();
   }else{
        if(check_ans() ){ 
            $('#reg .info_ans').hide();
             $('#reg .error_ans').hide();
             $('#reg .succ_ans').show();
        }else{
            //不合法！
            $('#reg .info_ans').hide();
             $('#reg .error_ans').show();
             $('#reg .succ_ans').hide();
        }
   }
});
function check_ans(){
    return Tool.trim($(fm.ans).val()).length>=2 && Tool.trim($(fm.ans).val()).length<=32?true:false;
}
function check_ques(){
    if(fm.ques.value!=0) return true;
}
$(fm.ques).bind('change',function(){
    if(check_ques()){
        $('#reg .error_ques').hide();
    }
})
//电子邮件！;
$(fm.email).bind('focus',function(){

//补全界面！
    if($(this).val().indexOf('@')==-1){
      $('#reg .all_email').show();
    }
     $('#reg .info_email').show();
     $('#reg .error_email').hide();
     $('#reg .succ_email').hide();


}).bind('blur',function(){
     $('#reg .all_email').hide();
    if($(this).val()==''){
    $('#reg .info_email').hide();
     $('#reg .error_email').hide();
     $('#reg .succ_email').hide();
   }else{ 
        // [ ^\w\.]{4,8}@[\w]+\.[a-zA-Z]{2,4}$ ];
        if(check_email()){ 
            $('#reg .info_email').hide();
             $('#reg .error_email').hide();
             $('#reg .succ_email').show();
        }else{
            //不合法！
            $('#reg .info_email').hide();
             $('#reg .error_email').show();
             $('#reg .succ_email').hide();
        }
   }
});
function check_email(){
    return /^[\w\.]+@[\w]+\.([a-zA-Z\.]{2,4})+$/g.test(Tool.trim($(fm.email).val()));
}
//点击右键补全系统键入！
$(fm.email).bind('keyup',function(event){
    if($(this).val().indexOf('@')==-1){
         $('#reg .all_email').show();
        $('#reg .all_email li span').html($(this).val());
    }else{
         $('#reg .all_email').hide();
    }
    if(event.keyCode==40){
        if(this.index==undefined || this.index>=$('#reg .all_email li').length()-1){
            
            this.index=0;
        }else{
            this.index++;
        }

        $('#reg .all_email li').css('background','none')
        $('#reg .all_email li').css('color','#666');
        $('#reg .all_email li').eq(this.index).css('background','#ccc')
        $('#reg .all_email li').eq(this.index).css('color','#369');
    }
    if(event.keyCode==38){
        if(this.index==undefined || this.index<=0){
            
            this.index=4;
        }else{
            this.index--;
        }

        $('#reg .all_email li').css('background','none')
        $('#reg .all_email li').css('color','#666');
        $('#reg .all_email li').eq(this.index).css('background','#ccc')
        $('#reg .all_email li').eq(this.index).css('color','#369');
    }
    if(event.keyCode==13){
        //alert('')
        $(this).val($('#reg .all_email li').eq(this.index).text());
        $('#reg .all_email').hide();
        this.index=undefined;
    }

})
//
$('#reg .all_email li').bind('mousedown',function(){
  
  $(fm.email).val($(this).text())
});

//电子邮件补全系统 鼠标移入移出效果！
$('#reg .all_email li').hover(function(){
    $(this).css('background','#ccc');
    $(this).css('color','#369');
},function(){
   // $('#reg .all_email li').css('background','none')
    $(this).css('background','none');
    $(this).css('color','#666');
});


//年月日！
 var year=fm.year;
 var month=fm.month;
 var day=fm.day;
 var day30 = [4, 6, 9 ,11];
 var day31 = [1, 3, 5, 7, 8, 10, 12];
 for(var i=1955;i<2017;i++){
    year.add(new Option(i,i),undefined);
 }
 for(var i=1;i<=12;i++){
    month.add(new Option(i,i),undefined);
 }

//注入日；
$(year).bind('change',select_day);
$(month).bind('change',select_day);

function select_day(){
     if(year.value!=0 && month.value!=0){
         day.options.length=1; //清理之前输入的；

         var cur_day=0;
        if($.inArray(day31,parseInt(month.value) ) ){
            cur_day=31
        }else if($.inArray(day30,parseInt(month.value) ) ){
            cur_day=30
        }else{
            var year_value=parseInt($(this).val())
            if(year_value%4==0 &&year_value%100!=0 || year_value%400==0){

                //闰年2月份29天，平年2月份28天；
               cur_day=29
            }else{
                cur_day=28
            }
        }
        for(var i=0;i<=cur_day;i++){
            day.add(new Option(i,i),undefined);
        }

    }else{
       day.options.length=1; 
    }
}
$(day).bind('change',function(){
    if(check_birthday()){
        $('#reg .error_birthday').hide();
    }
});
function check_birthday(){
    if(year.value!=0 && month.value!=0 &&day.value!=0) return true;
}
//备注！
$(fm.ps).bind('keyup',checkPs).bind('paste',function(){
    setTimeout(checkPs, 50);
});
//清尾部
$('#reg .ps .clear').bind('click',function(){
    $(fm.ps).val($(fm.ps).val().substring(0,10));
    checkPs()
});

function checkPs(){
    var total=10;
    var num=total-$(fm.ps).val().length; //还可以输入的字符；
    if(num>=0){
        var ps=$('#reg .ps');
        ps.eq(0).show();
        $('#reg .ps .num').eq(0).html(num);
         $('#reg .ps').eq(1).hide();
         return true;
    }else{
        var ps=$('#reg .ps');
        ps.eq(0).hide();
        $('#reg .ps .num').eq(1).html(Math.abs(num));
         $('#reg .ps').eq(1).show().css('color',"red");
         return false;
    }
}

    $('#reg .submit').click(function(){
       // alert('')
            var flag=true;
            //验证在這！；
            if(!check_user()){
                $('#reg .error_user').show();
                flag=false;
            }
            if(!check_pass()){
                $('#reg .error_pass').show();
                flag=false;
            }
            if(!check_equal()){
                $('#reg .error_notpass').show();
                flag=false;
            }
            if(!check_ques()){
                $('#reg .error_ques').show();
                flag=false; 
            }
            if(!check_ans()){
                $('#reg .error_ans').show();
                flag=false; 
            }
            if(!check_email()){
                 $('#reg .error_email').show();
                flag=false; 
            }
            if(!check_birthday()){
                 $('#reg .error_birthday').show();
                 flag=false;
            }
            if(!checkPs()){

                 flag=false;
            }
           // alert(flag)
            if(flag){
                 show_info('正在注册中！','loading.gif');
                 $('#reg .submit').attr('disabled','true').css({
                                    'backgroundPosition':'right'
                                });
                $.ajax({
                    url:'User/add.php',
                    method:'post',
                    data: $('#reg .reg').serialize(),
                    success:function(msg){
                        if(msg=='1'){
                            show_info('注册成功!,请登录...','success.gif');
                            setTimeout(function(){
                                $('#info').hide();
                                $('#reg').hide();
                                $('#reg .reg').get(0).reset();
                                $('#reg .submit').removeAttr('disabled').css({
                                    'backgroundPosition':'left'
                                });
                                $('#reg .succ').hide();

                            }, 1500);
                        }
                    },
                    async:true
                });
               
           // console.log( $('#reg .reg').serialize());
            }
    });
//console.log( typeof $('#success'))

  function show_info(info,background){
     $('#info').css({
    'height':'40px',
    'width':'200px',
    'background':'url(./images/login_header.png) ',
    'position':'absolute',
    'color':'#666',
    'font-weight':'bold',
    'line-height':'40px',
    'text-indent':'30px',
    'zIndex':'10000'

  }).center().show().find('p').html(info).css({
    'background':'url(./images/'+background+')   no-repeat 100px center',
    'font-size':'14px'
     });
  }


    /*轮播图！*/
   
    var banner=$('#banner').get(0);
    banner.index=0;
    var length=$('#banner img').length();
    banner.type=1;
    banner.timer=setInterval(function(){
        banner.index++;
        banner.index=banner.index%length;
        banner.move();
    }, 3000);
    $('#banner img').hide();
    $('#banner img').eq(0).show();
    $('#banner ul li').eq(0).css('color','orange');

    $('#banner .title').html($('#banner img').eq(0).attr('alt'));
    banner.move=function(index){
       // alert('')
       if(banner.type==1){
         $('#banner img').css('zIndex','1');
         $('#banner img').eq(banner.index).show().opacity(10).animate({
            'attr':'o',
            'target':100,
            'step':2,
            't':30
         }).css('zIndex','2');
         $('#banner ul li').eq(banner.index).css('color','orange').siblings().css('color','#666');
         $('#banner .title').html($('#banner img').eq(banner.index).attr('alt'));
     }else if(banner.type==2){
     //   alert('')

        if(index<banner.index){
            $('#banner img').eq(index).show().css('top','150px')
            banner.index=index;
        //    alert($('#banner img').eq(banner.index).css('top'))
        }else if(index>banner.index){
            $('#banner img').eq(index).show().css('top','-150px')
            banner.index=index;
        }else{

            $('#banner img').eq(banner.index).show().css('top','-150px')

        }
      //  alert('')
        $('#banner img').css('zIndex','1');


         $('#banner img').eq(banner.index).animate({
                        'attr':'y',
                        'target':0
            }).css('zIndex','2');
         $('#banner ul li').eq(banner.index).css('color','orange').siblings().css('color','#666');
         $('#banner .title').html($('#banner img').eq(banner.index).attr('alt'));
     }
    }

     $('#banner ul li').hover(function(){
        clearInterval(banner.timer);
        if(this.index==banner.index){
            return false;
        }
        if(banner.type==1){
            banner.index=$(this).index();
            banner.move();
        }else if(banner.type==2){
            
            banner.move($(this).index());
        }
      
             
     },function(){
        banner.timer=setInterval(function(){
            banner.index++;
            banner.index=banner.index%length;
            banner.move();
        }, 3000);
     });


     //延迟加载！；
     //当图片进入到可见区域，将xsrc 替换到src那；
  //  alert($('.wait_load').attr('xsrc'));
   // getInner
    
     var wait_load=$('.wait_load').opacity(0);
     $(window).bind('scroll',function(){
       
        setTimeout(function(){
            for(var i=0;i<wait_load.length();i++){
                var _this=wait_load.get(i);
                if($(window).scrollTop()+Tool.getInner().height>=$(_this).offset().top){
                      $(_this).attr('src',$(_this).attr('xsrc')).animate({
                        'attr':'o',
                        'target':100,
                        't':50,
                        'step':2
                      });
                }
               
            }
        },50);
        // alert(wait_load.length());
     });

//点击弹窗！
$('.wait_load').click(function(){


    $('#photo_big').center().show();
    $('#photo_big').drag('H2');

var temp_img=new Image();
$(temp_img).bind('load',function(){
    $('#photo_big .big img').attr('src',temp_img.src).animate({
        'attr':'o',
        'target':100
    }).css('width','600px').css('height','450px').css('top','0px').opacity(0);

});
    temp_img.src=$(this).attr('bigsrc');

    var children=this.parentNode.parentNode;
   var prev=$.prevIndex($(children).index(),children.parentNode);
   var next=$.nextIndex($(children).index(),children.parentNode);
   var prev_img=new Image();
   var next_img=new Image();
   prev_img.src=$('#photo dl dt img').eq(prev).attr('bigsrc');
   next_img.src=$('#photo dl dt img').eq(next).attr('bigsrc');
   $('#photo_big .big img').attr('index',$(children).index());
   $('#photo_big .big .left').attr('src',prev_img.src);
   $('#photo_big .big .right').attr('src',next_img.src);
});

 
//关闭
$('#photo_big .close').click(function(){
    $('#photo_big').hide();
    $('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px')
});


//hover显示arrow;
$('#photo_big .big .left').hover(function(){
    $('#photo_big .big .sl').animate({
        'attr':'o',
        'target':'50'
    })
},function(){
    $('#photo_big .big .sl').animate({
        'attr':'o',
        'target':'0'
    })
});

$('#photo_big .big .right').hover(function(){
    $('#photo_big .big .sr').animate({
        'attr':'o',
        'target':'50'
    });
},function(){
    $('#photo_big .big .sr').animate({
        'attr':'o',
        'target':'0'
    });
});
$('#photo_big .big strong').hover(function(){
    $(this).animate({
        'attr':'o',
        'target':'50'
    });
},function(){
    $(this).animate({
        'attr':'o',
        'target':'0'
    });
})


$('#photo_big .big .left').click(function(){
// 获取到索引了，根据索引去 小图对应的大图；
    
    $('#photo_big .big img').attr('src',$(this).attr('src'));

    var index=$('#photo_big .big img').attr('index');
    index--;
    if(index<0){
        index=$('#photo dl dt img').length()-1;
    }
    $('#photo_big .big img').attr('index',index);
    var prev_img=new Image()
    var next_img=new Image();
    var children_current=$('#photo dl dt img').eq(index).get(0);
    //console.log(children_current);
    var current_index=$(children_current.parentNode.parentNode).index()
//alert(children_current.parentNode.parentNode.tagName)
    var prev=$.prevIndex(current_index,children_current.parentNode.parentNode.parentNode);
    var next=$.nextIndex(current_index,children_current.parentNode.parentNode.parentNode);
   // alert(prev +'-'+current_index+'-'+next);
    prev_img.src=$('#photo dl dt img').eq(prev).attr('bigsrc');
    next_img.src=$('#photo dl dt img').eq(next).attr('bigsrc');
    $('#photo_big .big .left').attr('src',prev_img.src);
    $('#photo_big .big .right').attr('src',next_img.src);

});
$('#photo_big .big .right').click(function(){
    $('#photo_big .big img').attr('src',$(this).attr('src'));

    var index=$('#photo_big .big img').attr('index'); //当前的正在显示的索引；
    index++;                                    //将要显示的索引；
                                                //如果将要显示的索引大于11 就让他等于0  11不大于11；
    if(index>$('#photo dl dt img').length()-1){
        index=0
    }
    $('#photo_big .big img').attr('index',index);
    var prev_img=new Image()
    var next_img=new Image();
    var children_current=$('#photo dl dt img').eq(index).get(0);
    //console.log(children_current);
    var current_index=$(children_current.parentNode.parentNode).index()
//alert(children_current.parentNode.parentNode.tagName)
  // alert(children_current.parentNode.parentNode.tagName)
    var prev=$.prevIndex(current_index,children_current.parentNode.parentNode.parentNode);
    var next=$.nextIndex(current_index,children_current.parentNode.parentNode.parentNode);
   // alert(prev +'-'+current_index+'-'+next);
    prev_img.src=$('#photo dl dt img').eq(prev).attr('bigsrc');
    next_img.src=$('#photo dl dt img').eq(next).attr('bigsrc');
    $('#photo_big .big .left').attr('src',prev_img.src);
    $('#photo_big .big .right').attr('src',next_img.src);
});

//发表博文；

    $('#blog').center().drag('H2')
    $('#blog .close').click(function(){
            $('#blog').hide();
    });
  //  console.log($('#send_blog'))
    $('.send_blog').click(function(e){
        e.stopPropagation();
        $('#blog').show();
    })
   var fm_blog= $('#blog form').eq(0).get(0);

   $('#blog .submit').click(function(){
            $(this).attr('disabled','true').css('backgroundPosition','right');

            var value_title=Tool.trim(fm_blog.title.value);
            var value_content=fm_blog.content.value;

        if( value_title.length<2 || value_title>20){
            alert('标题不得小于2位或者大于20位');
            $('#blog .submit').removeAttr('disabled').css('backgroundPosition','left');
            return false;
        }
      if(value_content.length<10 || value_content>200){
            alert('内容不得小于10位或者不得大于200');
            $('#blog .submit').removeAttr('disabled').css('backgroundPosition','left');
            return false;
        }
        show_info('正在发表博文，请稍后！','loading.gif');
        $.ajax({
            'method':'post',
            'url':'Blog/add.php',
            'data':$('#blog form').serialize(),
            success:function(msg){
               // alert(msg);
                if(msg==1){
                    show_info('发表博文成功！','success.gif');
                    $('#blog .submit').removeAttr('disabled').css('backgroundPosition','left');
                    $('#blog form').get(0).reset();
                    setTimeout(function(){
                            $('#info').hide();
                            $('#blog').hide();
                    }, 1500);
                }else{
                    show_info('发表博文失败!');
                    setTimeout(function(){
                            $('#info').hide();
                            
                    }, 1500);
                    $('#blog .submit').removeAttr('disabled').css('backgroundPosition','left');
                }
            },
            async:true
        });


   });
    
    $.ajax({
        method:'post',
        url:'Blog/find.php',
        success:function(msg){
            var json=JSON.parse(msg);
           // alert(typeof json)
           var html='';
            for(var i=0;i<json.length;i++){
                html+='<div class="content"><h2>'+json[i].title+'<em>'+json[i].date+'</em></h2><p>'+json[i].content+'</p></div>';
            }
            $('#index').html(html);
        },
        async:true
    })
//ajax 换肤

$('#header .skin').click(function(e){
    e.stopPropagation();
    $('#skin').center().show();
    $.ajax({
        'method':'post',
        'url':'includes/skin.php',
        success:function(msg){
            var html="";
            for(var i=0;i<msg.length;i++){
                html+='<dl><dt><img bigsrc="images/'+msg[i].big_bg+'" bg_color="images/'+mgs[i].bg_color+'" src="images/'+msg[i].small_bg+'" title="" alt=""></dt><dd>'+msg[i].bg_text+'</dd></dl>';
            }
        },
        async:true
    })
})
$('#skin .close').click(function(){
    $('#skin').hide();

})

/*$.ajax({
    url:'demo.php',
    method:'post',
    
    success:function(msg){
        //alert(msg)
    },
    async:true

});
*/

/*Base.prototype.opacity = function (num) {
    for (var i = 0; i < this.elements.length; i ++) {
        this.elements[i].style.opacity = num / 100;
        this.elements[i].style.filter = 'alpha(opacity=' + num + ')';
        }
    return this;
};
*/



});


/* $('#box li').hover(function(){
    $(this).animate({
    'mul':{
        'width':'150',
         'height':'100',
         'opacity':30
        }
    })
 },function(){
    $(this).animate({
    'mul':{
        'width':'50',
         'height':'50',
          'opacity':100
        }
      })  
 })    
 */  


 /*if(this.index==undefined){
        this.index=0;
    }
    if(event.keyCode==40){
       // alert($('#reg .all_email li').length())
        this.index++;
        this.index=this.index%$('#reg .all_email li').length();
       // alert(this.index)
        $('#reg .all_email li').css('background','none')
        $('#reg .all_email li').css('color','#666');

        $('#reg .all_email li').eq(this.index).css('background','#ccc')
        $('#reg .all_email li').eq(this.index).css('color','#369');

      
    }
    if(event.keyCode==38){
        this.index--;
        this.index=Math.abs(this.index%$('#reg .all_email li').length());
        $('#reg .all_email li').css('background','none')
        $('#reg .all_email li').css('color','#666');

        $('#reg .all_email li').eq(this.index).css('background','#ccc')
        $('#reg .all_email li').eq(this.index).css('color','#369');

      
    }*/