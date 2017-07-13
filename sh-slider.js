/*

2017 - 7 - 12 

최성훈

http://shtar.co.kr/

sh-slider.2.0

*/

(function($){
    var defaults = {
        //slide, fade 타입 설정
        type : "slide", //slide, fade
        //자동 반복 시간
        set_time : 3000,
        //넘기는 시간
        animate_time : 400,
        //버튼 출력 유무
        btn_use : true,
        //화살표 출력 유무
        arrow_use : true,
		//멈춤,재생 버튼 출력 유무
		play_use : true,
        //자동 반복 유무
        auto_start : true,
        //슬라이드 방향
        slide_way : "right", //left, right, top, bottom
        //풀페이지 적용 유무
        width_type : "normal", //normal, full 
        //버튼 이미지
        mbtn_off : "images/mbtn_off.png",
        mbtn_on : "images/mbtn_on.png",
        btn_prev : "images/l_btn.png",
        btn_next : "images/r_btn.png",
		btn_play : "images/play.png",
		btn_stop : "images/stop.png",
        //마우스 오버시 멈춤
        hover_stop : true,
        //슬라이드 이미지 위에 여러 컷의 이미지 등장 효과
        multi_img : false,
        multi_selector : ""

    }
    $.fn.slider = function(options){
        var obj = this;
        
        var setting = {};
        for(var name in defaults){
            setting[name] = defaults[name];
        }
        //옵션 수정
        if(options){
            for(var name in options){
                setting[name] = options[name];
            }
        };
        
        var type = setting.type;
        var set_time = setting.set_time;
        var animate_time = setting.animate_time;
        var auto_start = setting.auto_start;
        var btn_use = setting.btn_use;
        var arrow_use = setting.arrow_use;
		var play_use = setting.play_use;
        var slide_way = setting.slide_way;
        var width_type = setting.width_type;
        var hover_stop = setting.hover_stop;
        var multi_img = setting.multi_img;
        var multi_selector = setting.multi_selector;
        
        var slide_w = obj.parent().width();
        var slide_num = 0;
        //슬라이드 초기 상태
        var slider = obj.children();
        var slide_total = slider.length;
        //easing 효과
        var easing = (multi_img) ? "easeInOutCubic" : "swing";
        
        //슬라이드 연속클릭 방지
        var timer = 0;

        //슬라이드 css 조절
        if(type){
            obj.css({"position":"relative","overflow":"hidden"});
            slider.css({"position":"absolute","top":0,"left":0,"width":"100%","height":"100%"});
            slider.find(".slide").css("max-width","100%");
            //기본 위치를 잡기 위함
            var slider_bg = slider.eq(0).clone();
            slider_bg.css({"position":"relative"});
            obj.prepend(slider_bg);
            obj.append(slider.eq(0));
            
            if(width_type == "full"){
                slider.each(function(){
                    var src = $(this).find(".slide").attr("src");
                    var height = slider_bg.height();
                    $(this).find(".slide").remove();
                    $(this).css({"height":height,"background":"url("+src+") center 0 no-repeat"});
                })
            }
        }

        //conle.log(slide_array);
        //버튼 사용시 버튼 출력
        if(btn_use == true){
            obj.parent().append("<div class='mbtn'></div>");
            var mbtn = obj.siblings(".mbtn");
            var mbtn_off = setting.mbtn_off;
            var mbtn_on = setting.mbtn_on;
			var btn_play = setting.btn_play;
			var btn_stop = setting.btn_stop;
			if(play_use == true){
				mbtn.append("<a href='javascript:;' class='play' title='자동으로 슬라이드 넘기기'><img src='"+btn_play+"'></a><a href='javascript:;' class='stop' title='슬라이드 멈추기'><img src='"+btn_stop+"'></a>")
			}
            for(var i=0;i<slider.length;i++){
                mbtn.append("<a href='javascript:;' class='btn' title='"+(i+1)+"번째 슬라이드로 이동'><img src='"+mbtn_off+"' alt=''></a>");
            }
            mbtn.children(".btn").eq(0).children("img").attr("src",mbtn_on);
            //버튼 위치 조절
            var btn = mbtn.children("a");
            obj.parent().css({"position":"relative"});
            mbtn.css({"position":"absolute","top":"95%","left":0,"right":0,"text-align":"center"});
            btn.css({"margin-right":"10px"});
            btn.eq(btn.length-1).css("margin-right",0);
        }
        //화살표 사용시 화살표 출력
        if(arrow_use == true){
            obj.parent().append("<a href='javascript:;' class='arrow prev' title='이전 슬라이드로 넘기기'><img src='"+setting.btn_prev+"'></a>");
            obj.parent().append("<a href='javascript:;' class='arrow next' title='다음 슬라이드로 넘기기'><img src='"+setting.btn_next+"'></a>");
            //화살표 위치 조절
            var arrow = obj.siblings(".arrow")
            var prev = obj.siblings(".prev");
            var next = obj.siblings(".next");
            arrow.css("display","block");
            var arrow_h = prev.outerHeight();
            obj.parent().css({"position":"relative"});
            arrow.css({"position":"absolute","top":"50%","margin-top":-arrow_h/2+"px"});
            prev.css({"left":0});
            next.css({"right":0});
        }
        
        //멀티 이미지 기본 위치 조정
        if(multi_img){
            slider.css({"overflow":"hidden"});
            slider_bg.find(".slide").siblings().remove();
            var selector = multi_selector.split(",");
            //console.log(selector);
            var multi_length = selector.length;
            slider.each(function(e){
                for(var i=0;i<multi_length;i++){
                    var $this = slider.eq(e).find("."+selector[i]);
                    //console.log($this);
                    if($this.hasClass(selector[i])){
                        var position = $this.attr("data-position").split(",");
                        var top = position[1];
                        var left = position[0];
                        $this.css({"position":"absolute","top":top+"px","left":left+"px"});
                    }
                }
            })
        }
        
        //자동반복 시작
        setting.play = function(){
            if(auto_start == true){
                setting.play.interval = setInterval(auto,set_time);
            }
        };
        //자동반복 멈춤
        setting.stop = function(){
            if(auto_start == true){
                clearInterval(setting.play.interval);
            }
        };
        //자동반복 사용시 자동반복 적용
        if(auto_start == true){
            setting.play();
        }
        //자동반복
        function auto(){
            if(slide_way == "right" || slide_way == "top"){
                if(slide_num == slide_total-1){
                    slide_num = 0;
                }else{
                    slide_num++;
                }
                right_slide(slide_num);
            }else if(slide_way == "left" || slide_way == "bottom"){
                if(slide_num == 0){
                    slide_num = slide_total-1;
                }else{
                    slide_num--;
                }
                left_slide(slide_num);
            }
           
        }
       
        //fade 슬라이드
        function fade(slide_num){
            slider.stop().fadeOut(animate_time);
            slider.eq(slide_num).stop().fadeIn(animate_time,function(){
                timer = 0; 
            });
            btn_trans();
        }
        
        //슬라이드 기본골자
        function right_slide(slide_num){
            //이미지가 1개 이상일 경우 우측에서 슬라이드
            if(slide_total > 1 && timer == 0){
				timer = 1;
                if(type == "slide"){
                    //멀티이미지 효과
                    if(multi_img){
                        for(var i=0;i<multi_length;i++){
                            var $this = slider.eq(slide_num).find("."+selector[i]);
                            if($this.hasClass(selector[i])){
                                var position = $this.attr("data-position").split(",");
                                var left = position[0];
                                //console.log(top);
                                $this.css({"left":"100%"});
                                $this.stop().delay(500).animate({"left":left+"px"},300+((400*i)),"easeOutQuart");
                            }
                            var $this2 = obj.children().eq(slide_total).find("."+selector[i]);
                            if($this2.hasClass(selector[i])){
                                $this2.stop().animate({"left":-$this2.width()+"px"},300+((200*i)),"easeInOutQuart");
                            }
                        }
                    }
                    //슬라이드
                    if(slide_way == "right" || slide_way == "left"){
                        obj.children().eq(slide_total).stop().animate({
                            "left"  : "-100%"
                        },animate_time,easing);
                        obj.append(slider.eq(slide_num));
                        slider.eq(slide_num).css({"left":"100%"}).stop().animate({
                             "left":0
                        },animate_time,easing,function(){
                             timer = 0; 
                        });
                    }else if(slide_way == "top" || slide_way == "bottom"){
                        obj.children().eq(slide_total).stop().animate({
                            "top"  : "100%"
                        },animate_time,easing);
                        obj.append(slider.eq(slide_num));
                        slider.eq(slide_num).css({"top":"-100%"}).stop().animate({
                             "top":0
                        },animate_time,easing,function(){
                             timer = 0; 
                        });
                    }
                    btn_trans();
                }else if(type == "fade"){
                    fade(slide_num); 
                    timer = 0;
                }
            }
              
        }
        //좌측 슬라이드
        function left_slide(slide_num){
            //이미지가 1개 이상일 경우 좌측에서 슬라이드
            if(slide_total > 1 && timer == 0){
				timer = 1;
                if(type == "slide"){ 
                    //멀티이미지 효과
                    if(multi_img){
                        for(var i=0;i<multi_length;i++){
                            var $this = slider.eq(slide_num).find("."+selector[i]);
                            if($this.hasClass(selector[i])){
                                var position = $this.attr("data-position").split(",");
                                var left = position[0];
                                //console.log(top);
                                $this.css({"left":-$this.width()+"px"});
                                $this.stop().delay(500).animate({"left":left+"px"},300+((300*i)),"easeOutQuart");
                            }
                            var $this2 = obj.children().eq(slide_total).find("."+selector[i]);
                            if($this2.hasClass(selector[i])){
                                $this2.stop().animate({"left":"100%"},300+((200*i)),"easeInOutQuart");
                            }
                        }
                    }
                    //슬라이드
                    if(slide_way == "left" || slide_way == "right"){
                        obj.children().eq(slide_total).stop().animate({
                            "left"  : "100%"
                        },animate_time,easing);
                        obj.append(slider.eq(slide_num));
                        slider.eq(slide_num).css({"left":"-100%"}).stop().animate({
                             "left":0
                        },animate_time,easing,function(){
                             timer = 0; 
                        });
                    }else if(slide_way == "bottom" || slide_way == "top"){
                        obj.children().eq(slide_total).css({"top":0}).stop().animate({
                            "top"  : "-100%"
                        },animate_time,easing);
                        obj.append(slider.eq(slide_num));
                        slider.eq(slide_num).css({"top":"100%"}).stop().animate({
                             "top":0
                        },animate_time,easing,function(){
                             timer = 0; 
                        });
                    }
                    btn_trans();
                }else if(type == "fade"){
                   fade(slide_num);
				   timer = 0;
                }
				
            }
        }
        
        //버튼 변경 기본골자
        function btn_trans(){ 
           if(btn_use == true){
               mbtn.children(".btn").eq(slide_num).children("img").attr("src",mbtn_on).parent("a").siblings(".btn").find("img").attr("src",mbtn_off); 
            }
        }
        
        //재생버튼 클릭 이벤트
		obj.siblings(".mbtn").children(".play").on('focusin click',function(e){
			setting.stop();
			setting.play();
		});
        
        //멈춤버튼 클릭 이벤트
		obj.siblings(".mbtn").children(".stop").on('focusin click',function(e){
			setting.stop();
		});
        
        //슬라이드 버튼 클릭 이벤트
        obj.siblings(".mbtn").children(".btn").on('focusin click',function(e){
            setting.stop();
            var check_num = $(this).index();
			if(play_use == true) check_num -= 2;
            //console.log(check_num);
            if(check_num > slide_num){
                slide_num = check_num;
                right_slide(check_num);
            }else if(check_num < slide_num){
                slide_num = check_num;
                left_slide(check_num);
            }
            setting.play();
        });
        
        //이전 버튼 클릭 이벤트
        prev.on('click',function(e){
            if(timer == 0){ 
                setting.stop();
                (slide_way == "top" || slide_way == "bottom") ? slide_way = "bottom" : slide_way = "left";
                if(slide_num == 0){
                    slide_num = slide_total-1;
                }else{
                    slide_num--;
                }
                left_slide(slide_num);
                //console.log(num);
                setting.play();
            }
        });
        
        //다음 버튼 클릭 이벤트
        next.on('click',function(e){
            if(timer == 0){
                setting.stop();
                (slide_way == "top" || slide_way == "bottom") ? slide_way = "top" : slide_way = "right";
                if(slide_num == slide_total-1){
                    slide_num = 0;
                }else{
                    slide_num++;
                }
                right_slide(slide_num);
                setting.play();
            }
        });
        
        //마우스 오버시 멈춤
        if(hover_stop == true){
            obj.hover(function(){
                setting.stop();
            },function(){
                setting.play();
            })
        }
        
    };
})(jQuery);