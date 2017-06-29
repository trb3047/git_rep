/*

2017 - 2 - 15 

최성훈

http://shtar.co.kr/

*/

$.fn.snow = function(max,timer){
     //눈 이벤트
    var canvas = this;
    var random = Math.ceil(Math.random()*max);
    var bottom = canvas.height()+20;
    //console.log(sec);
    if(random < max*2/3 && random > max/3){
        random += 20; 
    }else if(random <= max/3){
        random = max*2/3;
    }
    canvas.css({"overflow":"hidden","position":"relative"})
    canvas.append("<div class='snow' style='position:absolute;top:0;left:0;width:100%;height:100%'></div>");
    for(var i=0;i<random;i++){
        var width = Math.ceil(Math.random()*12);
        var top = Math.ceil(Math.random()*100);
        var left = Math.ceil(Math.random()*100);
        canvas.children(".snow").append("<div class='dot'></div>");
        canvas.find(".dot").eq(i).css({"position":"absolute","top":top+"%","left":left+"%","width":width,"height":width,"background-color":"#fff","box-shadow":"0 0 10px #fff","border-radius":"50%"});
    }
    var dot = canvas.find(".dot");
    snow();
    function snow(){
        var total = dot.size();
        for(var i=0;i<total;i++){
            flow(dot.eq(i));
        }
    }
    function flow(obj){
        var time = Math.ceil(Math.random()*timer);
        var length = String(time).length;
        if(length <= 3){
            time = time*20;
        }else if(length == 4){
            time = time*2;
        }
        obj.animate({"top":bottom},time,"linear",function(){
            obj.css({"top":"-40px"});
            flow(obj);
        });
    }
    
}
$.fn.snow2 = function(max,timer){
     //눈 이벤트
    var canvas = this;
    var random = Math.ceil(Math.random()*max);
    var bottom = canvas.height()+20;
    //console.log(sec);
    if(random < max*2/3 && random > max/3){
        random += 20; 
    }else if(random <= max/3){
        random = max*2/3;
    }
    canvas.css({"overflow":"hidden","position":"relative"})
    canvas.append("<div class='snow' style='position:absolute;top:0;left:0;width:100%;height:100%'></div>");
    for(var i=0;i<random;i++){
        var width = Math.ceil(Math.random()*12);
        var top = Math.ceil(Math.random()*100);
        var left = Math.ceil(Math.random()*100);
        //내리는 시간
        var time = Math.ceil(Math.random()*timer);
        var length = String(time).length;
        if(length <= 3){
            time = time*20;
        }else if(length == 4){
            time = time*2;
        }
        canvas.children(".snow").append("<div class='dot'></div>");
        canvas.find(".dot").eq(i).css({"transition":time+"ms","position":"absolute","top":0,"left":left+"%","width":width,"height":width,"background-color":"#fff","box-shadow":"0 0 10px #fff","border-radius":"50%"});
        setTimeout(function(){
            canvas.find(".dot").eq(i).remove();
        },time)
    }
    setTimeout(function(){
        canvas.find(".dot").css("top",bottom);
    },100);
   
}