/**
 * Created by Junkx on 2016/5/11.
 */

$(document).ready(function(){
    var nowpage=0;
    var lock=true;

    //event 是滚轮坐标属性 delta是滚轮方向属性（-1 1）
    $(document).mousewheel(function(e ,delta){
        if(lock){
            //console.log(event.pageX ,event.pageY)
            if(delta==1){
                nowpage=nowpage-1;
            }else {
                nowpage=nowpage+1;
            }

            if(nowpage<1){
                nowpage=7;
            } else if(nowpage>7){
                nowpage=1;
            }

            var iNow='.page'+nowpage;

            $('.page').removeClass('pageShow');
            $(iNow).addClass('pageShow');

            //函数节流//
            lock=false;
            setTimeout(function(){ lock=true; },500)
        }

    })

});



$(document).ready(
    function() {
        var nowpage = 0;

        //给最大的盒子增加事件监听
        $("body").swipe(
            {
                swipe:function(event, direction, distance, duration, fingerCount) {
                    if(direction == "up"){
                        nowpage = nowpage + 1;
                    }else if(direction == "down"){
                        nowpage = nowpage - 1;
                    }
                    if(direction == "left"){
                        nowpage = nowpage + 1;
                    }else if(direction == "right"){
                        nowpage = nowpage - 1;
                    }

                    if(nowpage > 7){
                        nowpage = 1;
                    }

                    if(nowpage < 1){
                        nowpage = 7;
                    }
                    //alert(nowpage);
                    var iNow='.page'+nowpage;
                    $('.page').removeClass('pageShow');
                    $(iNow).addClass('pageShow');
                }
            }
        );
    }
);

$(function () {
    $('img').click(function () {
        var audioEle = $("audio")[0];

        if(audioEle.paused){
            audioEle.play();// 播放
            $('img').eq(0).css('display','block');
            $('img').eq(1).css('display','none');
        }
        else{
            $('img').eq(1).css('display','block');
            $('img').eq(0).css('display','none');
            audioEle.pause();// 暂停
        }
    })
})