/*

2017 - 2 - 15 

최성훈

http://shtar.co.kr/

*/

$.fn.mouseWheelLayout = function(option){
    //버튼 색깔
    var btn_off = option['btn_off'];
    var btn_on = option['btn_on'];
    
     //화면 노출될 컨테이너 번호
    var num = 0;
    //휠 이벤트 적용될 컨테이너
    var cont = this.children();
    this.css({"position":"relative","overflow":"hidden"});
    cont.css({"position":"absolute","width":"100%","height":"100%"});
    //애니메이션 효과 끝나야 실행되게 하기위한 타이머
    var timer = 0;
    //마우스 휠 위,아래 값
    var wheel = 0;
    var total = cont.size();
    cont.css("top","100%");
    cont.eq(num).css("top",0);
    
    //마우스 휠 이벤트 버튼
    this.append("<div class='wheel_nav_wrap' style='position:absolute;top:0;right:0;width:30px;height:100%;display:table;'></div>");
    $(".wheel_nav_wrap").append("<div class='wheel_nav' style='display:table-cell;height:100%;vertical-align:middle;'></div>")
    for(var i=0;i<total;i++){
        $(".wheel_nav").append("<a class='wheel_btn' href='javascript:;' title='"+(i+1)+"번째 컨텐츠로 이동하기' style='display:block;margin-bottom:5px;width:16px;height:16px;border-radius:8px;background-color:"+btn_off+";'></a>");
    }
    var btn = $(".wheel_btn");
    //첫번째 버튼 on
    btn.eq(0).addClass("on");
    on(0);
    
    var check_num = 0;
    var time_check = new Array();
    time_check[check_num] = new Date();
    time_check[check_num] = time_check[check_num].getTime();
    
    this.on('mousewheel DOMMouseScroll',function(e){
        e.preventDefault();
        e.stopPropagation();
        //이벤트 연속 발생을 막기위한 타이머 체크
        check_num++;
        time_check[check_num] = new Date();
        time_check[check_num] = time_check[check_num].getTime();
        var check_val = time_check[check_num] - time_check[check_num-1];
        //console.log(check_val);
        if(check_val < 35) return false;
        
        var check = e.originalEvent;
        //console.log(check);
        //파이어폭스의 경우 반대로 나오기때문에 음수를 곱해준다
        if(check.detail){
            wheel = check.detail * -1;
        }
        //그 외
        else{
            wheel = check.wheelDelta;
        }
        
        if(num >= 0 && num < total && timer == 0){
            timer = 1;
            //마우스 휠을 올렸을 경우
            if(wheel > 0){
                if(num != 0){
                    cont.eq(num-1).css("top","-100%").stop().animate({"top":0},400);
                    cont.eq(num).css("top",0).stop().animate({"top":"100%"},400,function(){
                    timer = 0;
                    });
                    num--;
                }else{
                    timer = 0;
                }
            }
            //마우스 휠을 내렸을 경우
            else{
                if(num < (total-1)){
                    num++;
                    cont.eq(num-1).css("top",0).stop().animate({"top":"-100%"},400);
                    cont.eq(num).css("top","100%").stop().animate({"top":0},400,function(){
                        timer = 0;
                    });
                }else{
                    timer = 0;
                }
            }
        }
        //버튼색변경
        on(num);
        //console.log('num='+num);
    });
    
    
    btn.on('click', function(){
        var click_num = $(this).index();
        //console.log(click_num);
        if(num >= 0 && num < total && timer == 0){
             timer = 1;
            if(click_num > num){
                cont.eq(num).css("top",0).stop().animate({"top":"-100%"},400);
                num = click_num;
                cont.eq(num).css("top","100%").stop().animate({"top":0},400,function(){
                    timer = 0;
                });
            }else{
                cont.eq(num).css("top",0).stop().animate({"top":"100%"},400,function(){
                    timer = 0;
                });
                num = click_num;
                cont.eq(num).css("top","-100%").stop().animate({"top":0},400);
            }
        }
        //버튼색변경
        on(num);
        //console.log("click_num="+num);
    })
    function on(num){
        btn.eq(num).addClass("on").siblings(".wheel_btn").removeClass("on");
        $(".wheel_btn").css({"background-color":btn_off});
        $(".wheel_btn.on").css({"background-color":btn_on});
    }
}

