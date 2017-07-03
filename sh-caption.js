/*

2017 - 2 - 15 

최성훈

http://shtar.co.kr/

*/

$.fn.addCaption = function(obj){
    var text = new Array();
    var num = 0;
    var cont = this.html();
    var box = this;
    cont = cont.trim();
    for(var key in obj){
        //캡션에 쓸 텍스트 저장
        text[num] = obj[key];
        //정규표현식
        var reg = new RegExp(key,'g');
        //console.log(reg);
        //이벤트를 줄 위치 표시
        cont = cont.replace(reg,"<span class='cap_check' data-num='"+num+"'>"+key+"</span>");
        
        num++;
    }
    //console.log(cont);
    box.html(cont);
    box.css({"position":"relative","overflow":"visible"});
    $(".cap_check").on('mouseover',function(){
        var num = $(this).attr('data-num');
        var top = $(this).position().top;
        var left = $(this).position().left;
        //console.log(top);
        //console.log(left);
        //console.log(num);
        $(".cap_box").remove();
        box.append("<span class='cap_box' style='position:absolute;top:"+(top+20)+"px;padding:10px;background-color:#fff;border:1px solid #ccc' onmouseleave='this.remove();'>"+text[num]+"</span>");
        $(".cap_box").css({left:(left - $(".cap_box").width()/2)+"px"});
    })
    box.on('mouseleave',function(){
       $(".cap_box").remove();
    });
    
}