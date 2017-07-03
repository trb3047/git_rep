/*

2017 - 3 - 30 

최성훈

http://shtar.co.kr/

*/
$(function(){
    var canvas = $("#canvas");
    var obj = $("#canvas > ul");
    var cube_wrap = $(".cube_wrap");
    var cube_cont = $(".cube_cont");
    var arrow = $(".cube_wrap .arrow");
    var cube_bg = $(".cube_bg");

    //익스플로러 체크 - 익스플로러가 아닐때 실행
    var agent = navigator.userAgent.toLowerCase();
    if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
        obj.remove();
        cube_wrap.remove();
        arrow.remove();
        cube_bg.remove();
        canvas.snow(20,9000);
        alert("익스플로러에서 지원하지 않는 속성을 사용한 기능이 있습니다.\n다른 브라우저를 통해 보시는걸 권장합니다");
    }else{
        var screen_w = canvas.width()/2;
        var wrap_h = canvas.height();
        var title = $(".cube_cont .title");
        //큐브 확대 체크 값
        var view_check = 0;
        
        //모바일 환경일 경우
        if(screen_w <= 320){
           //canvas.addClass("mobile");
        }

        $(window).resize(function(){
            screen_w = $("#canvas").width()/2;
            //(screen_w <= 320) ? canvas.addClass("mobile") : canvas.removeClass("mobile");
        })


        var box_check = 1;
        $(".right_arrow").click(function(){
            box_check++;
            box_addClass();
            //console.log(box_check);
        })
        $(".left_arrow").click(function(){
            box_check--;
            box_addClass();
            //console.log(box_check);
        })
        function box_addClass(){
            obj.removeClass();
            switch(box_check){
                case 0 : box_check = 5, obj.addClass("app")
                break;
                case 1 : obj.addClass("comp")
                break;
                case 2 : obj.addClass("shop")
                break;
                case 3 : obj.addClass("hosp")
                break;
                case 4 : obj.addClass("resp")
                break;
                case 5 : obj.addClass("app")
                break;   
                case 6 : box_check = 1, obj.addClass("comp")
                break;
            }
        };

        cube_cont.click(function(){
            if(view_check == 0){
                obj.hide();
                arrow.fadeOut(300);
                cube_bg.fadeIn(300);
                title.delay(200).fadeIn(300);
                cube_cont.addClass("view");
                cube_cont.children("div").addlist(box_check-1);
                var portfolio = $(".portfolio_list");
                var total = portfolio.size();
                setTimeout(function(){
                    for(var i=0;i<total;i++){
                        portfolio.eq(i).delay(i*150).fadeIn(300);
                    }
                },400);
                view_check = 1;
            }
        })
        $(".cube_bg,header,footer").click(function(){
            if(view_check == 1){
                obj.show();
                arrow.fadeIn(300);
                title.fadeOut(300);
                cube_bg.fadeOut(300);
                cube_cont.removeClass("view");
                cube_cont.children("div").html("");
                view_check = 0;
            }
        })
        $(".arrow").hover(function(){
            var img = $(this).find("img")
            var src = img.attr("src");
            img.attr("src",src.replace("_off","_on"));
        },function(){
            var img = $(this).find("img")
            var src = img.attr("src");
            img.attr("src",src.replace("_on","_off"));
        })
    }
})