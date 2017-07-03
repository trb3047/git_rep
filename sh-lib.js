/*

2017 - 2 - 15 

최성훈

http://shtar.co.kr/

*/

//네비게이션 호출 1차
$.fn.printNav = function(obj){
    for(var name in obj){
        this.append("<li><a href='"+obj[name]+"'>"+name+"</a></li>");
    }
};

//네비게이션 호출 2차 a = 최상위카테고리번호, obj = 네비게이션의 최상위 ul
$.fn.printNav2nd = function(a,obj){
    this.each(function(){
        var gnb = $(this).children("li").eq(a);
        gnb.append("<ul class='sgnb'></ul>");
        for(var name in obj){
           gnb.children(".sgnb").append("<li><a href='"+obj[name]+"'>"+name+"</a></li>");
        }
    })
};

//네비게이션 호출 3차 a = 최상위카테고리번호, b = 상위카테고리번호, obj = 네비게이션의 최상위 ul
$.fn.printNav3rd = function(a,b,obj){
    this.each(function(){
        var sgnb = $(this).children("li").eq(a).children(".sgnb").children("li").eq(b);
        sgnb.append("<ul class='tgnb'></ul>");
        for(var name in obj){
            sgnb.children(".tgnb").append("<li><a href='"+obj[name]+"'>"+name+"</a></li>");
        }
    })
};   

//네비게이션에 등록한 url을 재사용하기 위한 출력함수 
//ex)해당 class에 출력 1차카테고리 sb1, 2차카테고리 sb1_1, 3카테고리 sb1_1_1 원하는 번호의 네이밍을 html에 하면된다.  
$.fn.printLink = function(){
    var gnbSize = this.children("li").size();
    var gnb = this;
    for(var i=0;i<gnbSize;i++){
        var check = gnb.children("li").eq(i).children(".sgnb").children("li").size();
        var href = gnb.children("li").eq(i).children("a").attr("href");
        $("a.sb"+(i+1)+",.sb"+(i+1)+">a").attr("href",href);
        //console.log(check);
        if(check > 0){
            var sgnb = gnb.children("li").eq(i).children(".sgnb");
            var sgnbSize = sgnb.children("li").size();
            for(var j=0;j<sgnbSize;j++){
                var scheck = sgnb.children("li").eq(j).children(".tgnb").children("li").size();
                var shref = sgnb.children("li").eq(j).children("a").attr("href");
                $("a.sb"+(i+1)+"_"+(j+1)+",.sb"+(i+1)+"_"+(j+1)+">a").attr("href",shref);
                //console.log(scheck);
                if(scheck > 0){
                    var tgnb = sgnb.children("li").eq(j).children(".tgnb");
                    var tgnbSize = tgnb.children("li").size();
                    for(var t=0;t<tgnbSize;t++){
                        var thref = tgnb.children("li").eq(t).children("a").attr("href");
                        $("a.sb"+(i+1)+"_"+(j+1)+"_"+(t+1)+",.sb"+(i+1)+"_"+(j+1)+"_"+(t+1)+">a").attr("href",thref);
                    }
                }
            }
        }
    }

};

//$("tab버튼").printTab($("내용물"));
$.fn.tabMenu = function(cont){
    var tab = this.children();
    var cont = cont.children();
    tab.eq(0).addClass("on");
    cont.hide();
    cont.eq(0).show();
    tab.on('focusin click',function(){
        var num = $(this).index();
        tab.removeClass("on");
        $(this).addClass("on");
        cont.hide();
        cont.eq(num).show();
    })
}
//슬라이드메뉴 $("적용시킬목록 ex.ul or ol").slideMenu($("slide적용될 자식 목록 ex. ul or li"))
$.fn.slideMenu = function(cont){
    var list = this.children();
    var cont = this.find(cont);
    cont.css({"overflow":"hidden","height":0});
    list.each(function(e){
        var check = $(this).children(".sgnb").children("li").size();
        if(check > 0){
            list.eq(e).children("a").attr("href","javascript:;");
        }
    })
    list.children("a").on('click',function(){
        var cont_ = $(this).siblings(cont);
        var height = cont_.children().size() * cont_.children().height();
        var check = cont_.height()/1;
        var timer = 0;
        //console.log(check);
        $(this).parent("li").addClass("on").siblings().removeClass("on");
        if(check == 0){
             cont_.stop().animate({
                 "height":height
            },400);
        }else{
            cont_.stop().animate({
                 "height":0
            },400);
        }
       
        $(this).parent("li").siblings("li").children("ul").stop().animate({"height":0},400);
    })

};

//카테고리 순서(0~), 자식포함하는지 여부(true or false), 가져올 nav
$.fn.copyNav2nd = function(a,b,obj){
    if(a != "main"){
         var sgnb = obj.children("li").eq(a).children("ul");
        var nav = this;
        var check = b;
        sgnb.children("li").each(function(e){
            var href = $(this).children("a").attr("href");
            var text = $(this).children("a").text();
            nav.append("<li><a href='"+href+"'>"+text+"</a></li>");
            var tgnb = sgnb.children("li").eq(e).children("ul");
            var sub_check = tgnb.children("li").size();
            if(check == true && sub_check > 0){
                nav.children("li").eq(e).append("<ul class='sgnb'></ul>");
                var snav = nav.children("li").eq(e).children(".sgnb");
                tgnb.children("li").each(function(){
                    var href = $(this).children("a").attr("href");
                    var text = $(this).children("a").text();
                    snav.append("<li><a href='"+href+"'>"+text+"</a></li>");
                })
            }
        })
    }
};

//on 이벤트, 이름넣을객체(ex. $("ul")).addClassOn(순서,"이름");
$.fn.addClassOn = function(a,name){
    var obj = this.children();
    obj.eq(a).addClass(name);
};

//포폴 리스트 출력
$.fn.addList = function(obj){
    if(this.html() == ''){
        for(var name in obj){
            var array = new Array();
            var split = obj[name].split(",");
            this.append("<a class='portfolio_list' href='"+split[3]+"' title='"+name+" 바로가기' target='_blank'><img src='"+split[4]+"'><strong class='subject'>"+name+"</strong><p class='txt'>"+split[1]+"<span class='skill'>"+split[2]+"</span></p><p class='date'>"+split[0]+"</p></a>");
        }
    }
}
//html에 코드 텍스트출력하기
$.fn.print_code = function(){
    var text = this.html();
    text = text.replace(/</g,"&lt;");
    text = text.replace(/>/g,"&gt;");
    /* text = text.split("/br");
    function plus(num){
        var nbsp = "";
        for(var i=0;i<num*4;i++){
            nbsp += "&nbsp;";
        }
        return nbsp;
    }
    for(var i=0,length = text.length;i<length;i++){
        if(i >= length/2){
            text[i] = text[i] + "<br>"; 
        }else{
            text[i] = text[i] + "<br>";
        }
    } */
    this.html("");
    this.append(text);
}


//메인 gnb 기반의 텍스트 출력, gnbText[], sgnbText[][], tgnbText[][][] 로 출력해 쓰면된다
$.fn.printText = function(){
    var gnbSize = this.children("li").size();
    var gnb = this;
	var gnbText = new Array();
	var sgnbText = new Array();
	var tgnbText = new Array();
    for(var i=0;i<gnbSize;i++){
        var check = gnb.children("li").eq(i).children(".sgnb").children("li").size();
		var gnb_a = gnb.children("li").eq(i).children("a");
		if(gnb_a.children("img").attr("src")){
			var text = gnb_a.children("img").attr("alt");
		}else{
			var text = gnb_a.text();
		}
         gnbText[i] = text;
        //console.log(check);
        if(check > 0){
			sgnbText[i] = new Array(); 
            var sgnb = gnb.children("li").eq(i).children(".sgnb");
            var sgnbSize = sgnb.children("li").size();
            for(var j=0;j<sgnbSize;j++){
                var scheck = sgnb.children("li").eq(j).children(".tgnb").children("li").size();
                var stext = sgnb.children("li").eq(j).children("a").text();
                sgnbText[i][j] = stext;
                //console.log(scheck);
                if(scheck > 0){
					tgnbText[i] = new Array();
					tgnbText[i][j] = new Array();
                    var tgnb = sgnb.children("li").eq(j).children(".tgnb");
                    var tgnbSize = tgnb.children("li").size();
                    for(var t=0;t<tgnbSize;t++){
                        var ttext = tgnb.children("li").eq(t).children("a").text();
                        tgnbText[i][j][t] = ttext; 
                    }
                }
            }
        }
    }
	return [gnbText, sgnbText, tgnbText];
}

//form value체크 form객체.valueCheck({"input의 name값":"출력될 alert문구"});
$.fn.valueCheck = function(obj){
    var name = new Array();
    var text = new Array();
    var i = 0;
    for(var name_ in obj){
        name[i] = name_;
        text[i] = obj[name_];
        i++;
    }
    this.submit(function(){
        var length = name.length;
        for(var i=0;i<length;i++){
            var input = $("input[name='"+name[i]+"']");
            var value = input.val();
            if(value == '' || value == null || value == undefined){
                alert(text[i]);
                input.focus();
                return false;
            }
        }
        
        return true;
    })
}

function addCookie(name,val,day){
    //쿠키 날짜 설정
    //오늘 데이터 가져오기
    var expires = new Date();
    //console.log(new Date());
    //보존 기간 설정
    //오늘 데이터에서 날짜를 가져 온 후 +할 날짜를 더해주고 셋팅
    expires.setDate(expires.getDate() + day);
    //Date객체 시간 정리
    expires = expires.toUTCString();
    //console.log(expires);
    //한글 깨짐을 막기위해 escape()를 써준다
    var cookie = name+"="+escape(val)+";path=/;expires=" + expires + ";";
    document.cookie = cookie;
}
//addCookie('cookieT','한글',1);
//console.log(document.cookie);
function printCookie(name){
    var cookie = document.cookie;
    var first = cookie.indexOf(name);
    var last = cookie.indexOf(first,';');
    if(last == -1) last = cookie.length;
    var val = cookie.substr(first+(name.length+1),last);
    val = unescape(val);
    //console.log('cookie=' + cookie);
    //console.log('first=' + first);
    //console.log('last=' + last);
    //console.log('val=' + val);

    return val;
}
//printCookie('cookieT');
function delCookie(name){
    //오늘 데이터를 가져옵니다.
    var expires = new Date();

    //데이터를 어제 날짜로 설정합니다.
    expires.setDate(expries.getDate() - 1);

    //어제 날짜인 같은 이름의 쿠키로 덮어 씌워 줍니다.
    document.cookie = name + "=;path=/;expires=" + expires + ";";
}


