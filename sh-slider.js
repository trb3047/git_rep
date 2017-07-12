/*

2017 - 6 - 21 

최성훈

http://shtar.co.kr/

*/

(function($){
    var defaults = {
        //slide, fade 타입 설정
        type : "slide",
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
        slide_way : "right",
        //반응형 적용 유무
        responsive_type : false, 
        //버튼 이미지
        mbtn_off : "images/mbtn_off.png",
        mbtn_on : "images/mbtn_on.png",
        l_btn : "images/l_btn.png",
        r_btn : "images/r_btn.png",
		play_btn : "images/play.png",
		stop_btn : "images/stop.png",
        //마우스 오버시 멈춤
        hover_stop : true,
        //슬라이드 이미지 위에 여러 컷의 이미지 등장 효과
        multi_img : false,
        multi_selecter : ""

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
        var responsive_type = setting.responsive_type;
        var hover_stop = setting.hover_stop;
        var multi_img = setting.multi_img;
        var multi_selecter = setting.multi_selecter;
        
        var slide_w = obj.parent().width();
        var slide_num = 0;
        var slider = obj.children();
        var slide_total = slider.length;

		//슬라이드 연속클릭 방지
		var timer = 0;

        //슬라이드 css 조절
        if(type == "slide"){
        obj.parent().css({"overflow":"hidden"});
        obj.css({"width":slide_total*slide_w,"overflow":"hidden"});
        slider.css({"float":"left","width":slide_w});
        }else if(type == "fade"){
            var height = obj.children().height();
            obj.css({"position":"relative","height":height});
            slider.css({"display":"none","position":"absolute","top":0,"left":0});
            slider.eq(0).css("display","block");
        }
        if(responsive_type == true){
            slider.each(function(){
                var src = $(this).find("img").attr("src");
                var height = obj.height();
                $(this).find("img").remove();
                $(this).css({"height":height,"background":"url("+src+") center 0 no-repeat"});
            })
            $(window).resize(function(){
                slide_w = obj.parent().width();
				obj.css({"width":slide_w*slide_total});
                slider.css({"width":slide_w});
            })
        }

        //슬라이드 초기 상태 저장
        var slide_array = new Array();
        slider.each(function(e){
            slide_array[e] = $(this);
        });
        //conle.log(slide_array);
        //버튼 사용시 버튼 출력
        if(btn_use == true){
            obj.parent().append("<div class='mbtn'></div>");
            var mbtn = obj.siblings(".mbtn");
            var mbtn_off = setting.mbtn_off;
            var mbtn_on = setting.mbtn_on;
			var play_btn = setting.play_btn;
			var stop_btn = setting.stop_btn;
			if(play_use == true){
				mbtn.append("<a href='#' class='play'><img src='"+play_btn+"'></a><a href='#' class='stop'><img src='"+stop_btn+"'></a>")
			}
            for(var i=0;i<slider.length;i++){
                mbtn.append("<a href='#' class='btn'><img src='"+mbtn_off+"'></a>");
            }
            mbtn.children(".btn").eq(0).children("img").attr("src",mbtn_on);
            //버튼 위치 조절
            function btn_position(){
                var btn = mbtn.children("a");
                obj.parent().css({"position":"relative"});
                mbtn.css({"position":"absolute","top":"95%","left":0,"width":"100%","text-align":"center"});
                btn.css({"margin-right":"10px"});
            }
            btn_position();
        }
        //화살표 사용시 화살표 출력
        if(arrow_use == true){
            obj.parent().append("<a href='#' class='arrow l_btn'><img src='"+setting.l_btn+"'></a>");
            obj.parent().append("<a href='#' class='arrow r_btn'><img src='"+setting.r_btn+"'></a>");
            //화살표 위치 조절
            function arrow_position(){
                var arrow = obj.siblings(".arrow")
                var l_btn = obj.siblings(".l_btn");
                var r_btn = obj.siblings(".r_btn");
                var height = obj.height();
                var arrow_h = l_btn.find("img").height();
                var top = (height-arrow_h)/2;
                obj.parent().css({"position":"relative"});
				//console.log(height);
				//console.log(arrow_h);
                (height == 0) ? top = top : top = "45%";
                arrow.css({"position":"absolute","top":top});
                l_btn.css({"left":0});
                r_btn.css({"right":0});
            }
            arrow_position();
        }
        
        if(multi_img){
            slider.css({"position":"relative","overflow":"hidden"});
            var selecter = multi_selecter.split(",");
            //console.log(selecter);
            var multi_length = selecter.length;
            slider.each(function(e){
                for(var i=0;i<multi_length;i++){
                    var $this = slider.eq(e).find("."+selecter[i]);
                    var position = $this.attr("position").split(",");
                    var top = position[1];
                    var left = position[0];
                    $this.css({"position":"absolute","top":top+"px","left":left+"px"});
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
            if(slide_way == "right"){
                if(slide_num == slide_total-1){
                    slide_num = 0;
                }else{
                    slide_num++;
                }
                right_slide(slide_num);
            }else if(slide_way == "left"){
                if(slide_num == 0){
                    slide_num = slide_total-1;
                }else{
                    slide_num--;
                }
                left_slide(slide_num);
            }
           
        }
       
        
        function fade(slide_num){
            obj.children().stop().fadeOut(animate_time);
            obj.children().eq(slide_num).stop().fadeIn(animate_time);
            btn_trans();
        }
        //슬라이드 기본골자
        function right_slide(slide_num){
            //이미지가 1개 이상일 경우 우측에서 슬라이드
            if(slide_total > 1 && timer == 0){
				timer = 1;
                if(type == "slide"){
                    slide_w = obj.parent().width();
                    obj.children().eq(0).after(slide_array[slide_num]);
                    slider = obj.children();
                    //console.log(slide_array[check_num]);
                    if(multi_img){
                        for(var i=0;i<multi_length;i++){
                            var $this = slider.eq(1).find("."+selecter[i]);
                            var position = $this.attr("position").split(",");
                            var left = position[0];
                            //console.log(top);
                            $this.css({"right":"inherit","left":"100%"});
                            $this.stop().delay(500).animate({"left":left+"px"},300+((400*i)),"easeOutQuart");
                            
                            var $this2 = slider.eq(0).find("."+selecter[i]);
                            var position2 = $this2.attr("position").split(",");
                            var left2 = position2[0];
                            $this2.css({"right":"inherit","left":left2+"px"});
                            $this2.stop().animate({"left":-$this2.width()+"px"},300+((200*i)),"easeInOutQuart");
                        }
                    }
                    obj.stop().animate({
                         "margin-left":-slide_w
                    },animate_time,function(){
                         var first = slider[0];
                         obj.append(first);
                         obj.css("margin-left",0);
                         //console.log(slider[0]);
						 timer = 0; 
                    });
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
                    var last = slide_array[slide_num];
                    obj.prepend(last);
                    obj.css("margin-left",-slide_w); 
                    if(multi_img){
                        for(var i=0;i<multi_length;i++){
                            var $this = obj.children().eq(0).find("."+selecter[i]);
                            var position = $this.attr("position").split(",");
                            var left = position[0];
                            var right = slide_w - left - $this.width();
                            //console.log(top);
                            $this.css({"left":"inherit","right":"100%"});
                            $this.stop().delay(500).animate({"right":right+"px"},300+((300*i)),"easeOutQuart");
                            
                            var $this2 = slider.eq(0).find("."+selecter[i]);
                            var position2 = $this2.attr("position").split(",");
                            var left2 = position2[0];
                            var right2 = slide_w - left2 - $this.width();
                            
                            $this2.css({"left":"inherit","right":left2+"px"});
                            $this2.stop().animate({"right":-$this2.width()+"px"},300+((200*i)),"easeInOutQuart");
                        }
                    }
                    obj.stop().animate({
                        "margin-left":0
                    },animate_time,function(){
						timer = 0;
					});
                    btn_trans();
                }else if(type == "fade"){
                   fade(slide_num);
				   timer = 0;
                }
				
            }
        }
        //버튼 변경 기본골자
        function btn_trans(){ 
           if(btn_use == true){ mbtn.children(".btn").eq(slide_num).children("img").attr("src",mbtn_on).parent("a").siblings(".btn").find("img").attr("src",mbtn_off); 
            }
        }
		obj.siblings(".mbtn").children(".play").on('focusin click',function(e){
			setting.stop();
            e.preventDefault();
			setting.play();
		})
		obj.siblings(".mbtn").children(".stop").on('focusin click',function(e){
            e.preventDefault();
			setting.stop();
		})
        obj.siblings(".mbtn").children(".btn").on('focusin click',function(e){
            setting.stop();
            e.preventDefault();
            var check_num = $(this).index();
			if(play_use == true) check_num -= 2;
            //console.log(check_num);
            if(check_num == slide_num){
               
            }else if(check_num > slide_num){
                slide_num = check_num;
                right_slide(check_num);
            }else if(check_num < slide_num){
                slide_num = check_num;
                left_slide(check_num);
            }
            setting.play();
        })
        obj.siblings(".l_btn").on('click',function(e){
            if(timer == 0){ 
                setting.stop();
                e.preventDefault();
                slide_way = "left";
                if(slide_num == 0){
                    slide_num = slide_total-1;
                }else{
                    slide_num--;
                }
                left_slide(slide_num);
                //console.log(num);
                setting.play();
            }
        })
        obj.siblings(".r_btn").on('click',function(e){
            if(timer == 0){
                setting.stop();
                e.preventDefault();
                slide_way = "right";
                if(slide_num == slide_total-1){
                    slide_num = 0;
                }else{
                    slide_num++;
                }
                right_slide(slide_num);
                setting.play();
            }
        })
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