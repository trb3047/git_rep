var roll_cont = $(".m_roll_list");
var roll_obj = roll_cont.children("li");
var roll_margin =  roll_obj.css("margin-right");
var roll_w = (roll_obj.width()/1) + (roll_margin.substring(roll_margin.length-2,0)/1);

//console.log(roll_w);

function rolling(check){
    roll_cont = $(".m_roll_list");
    var time = 4000;
    if(check){
        var margin_left = roll_cont.css("margin-left");
        var percent = Math.ceil(margin_left.substring(margin_left.length-2,0)/roll_w * 100)*-1/100;
        time = time - (time*percent);
        //console.log(time);
    }
    roll_cont.animate({"margin-left":-roll_w},time,"linear",function(){
        roll_cont.css("margin-left",0);
        roll_cont.append($(".m_roll_list > li").eq(0));
        rolling();
    });
}

rolling();

//var roll_auto = setInterval(rolling,4000);

roll_obj.hover(function(){
    roll_cont.stop();
},function(){
    rolling("on");
});