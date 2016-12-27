$(function(){
    var box=$(".box");
    var copy=$(".copy");
    var canvas=$("canvas");
    var cobj=canvas[0].getContext("2d");
    canvas.attr({
        width:box.width(),
        height:box.height()
    })
    $(".parent").hover(function(){
        $(this).find(".son").finish();
        $(this).find(".son").slideDown(200);
        this.style.background="yellowgreen";
    },function(){
        $(this).find(".son").finish();
        $(this).find(".son").slideUp(200);
        this.style.background="#879CD3";
    })
    var obj=new draw(copy[0],canvas[0],cobj,$(".xp"),$(".selectarea"));
    //画图的类型:
    $(".hasson:eq(1) ").find(".son li").click(function(){
        obj.shapes=$(this).attr("data-role");
        if(obj.shapes=="pen"){
            obj.pen();
        }else{
            obj.draw();
        }
    })
    //填充类型
    $(".hasson:eq(2) ").find(".son li").click(function(){
        obj.type=$(this).attr("data-rolo");
    })
    //边框颜色
    $(".hasson:eq(3) ").find(".son input").click(function(){
        $(this).change(function(){
            obj.borderColor=this.value;
        })
    })
    $(".hasson:eq(4) ").find(".son input").click(function(){
        $(this).change(function(){
            obj.bgcolor=this.value;
        })
    })
    $(".hasson:eq(5) ")[0].onmousedown=function(e){
        e.stopPropagation();
    }
    $(".hasson:eq(5) ").find(".son  li input").click(function(){
        $(this).change(function(){
            if(isNaN(Number(this.value))){
                alert("请输入数字");
            }
            obj.borderWidth=this.value;
            this.value="";
        })
    })
    //橡皮
    $(".xpc li").click(function(){
        var w=$(this).attr("data-role");
        var h=$(this).attr("data-role");
        obj.xp($(".xp"),w,h);
    })


    //文件
    $(".file li").click(function(){
        var index=$(this).index(".file li");
        if(index==0){
            if(obj.history.length!=0){
                var yes=window.confirm("是否要保存");
                if(yes){
                    location.href=canvas[0].toDataURL().replace("data:image/png","data:stream/octet");
                    obj.qingchu();
                }
            }
        }
        if(index==1){
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height)
            if(obj.history.length==0){
                alert("不能后退");
                return;
            }
            var data=obj.history.pop();
            cobj.putImageData(data,0,0);
        }
        if(index==2){
            location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octet"));
        }
       
    })

    //
    ///拖拽
    // $(document).on("mousedown",function(e){
    //     if($(e.target).attr("class")=="son"||$(e.target).parent().attr("class")=="son"||$(e.target).attr("class")=="sq"){
    //         return;
    //     }
    //     var ox= e.offsetX;
    //     var oy= e.offsetY;
    //     e.stopPropagation();
    //     $(document).on("mousemove",function(e){
    //         var cx= e.clientX;
    //         var cy= e.clientY;
    //         var target= e.target;

    //         $(target).trigger("drag",{ox:ox,oy:oy,cx:cx,cy:cy});
    //     });
    //     $(document).on("mouseup",function(){
    //         $(document).off("mousemove");
    //         $(document).off("mouseup");
    //     });
    // });
    // $(document).delegate(".menu","drag",function(e,data){
    //     $(this).css({
    //         left:data.cx-data.ox,
    //         top:data.cy-data.oy
    //     });
    // });
    ///收起
    var flag=true;
    $(".sq").click(function(e){
        if(flag){
            $(".parent:not(.sq)").css({
                display:"none"
            })
            $(".sq").html("&#xe61c;");
            flag=false;
        }else{
            $(".parent:not(.sq)").css({
                display:"block"
            })
            $(".sq").html("&#xe61b;");
            flag=true;
        }
    })
    $(".select").click(function(){
        obj.select($(".selectarea"));
    })
    $(".qingchu").click(function(){
        obj.qingchu();
    })






     /*图片反向*/
        function fx(dataobj,x,y){
            for(var i=0;i<dataobj.width*dataobj.height;i++){
                dataobj.data[i*4+0]=255-dataobj.data[i*4+0];
                dataobj.data[i*4+1]=255-dataobj.data[i*4+1];
                dataobj.data[i*4+2]=255-dataobj.data[i*4+2];
                dataobj.data[i*4+3]=255;
            }
            cobj.putImageData(dataobj,x,y);
        }
        /*马赛克 栅格化*/
//        msk(dataobj,50,600,0);
        function msk(dataobj,num,x,y){
            var w=dataobj.width/num;
            var h=dataobj.height/num;
            for(var i=0;i<num;i++){
                for(var j=0;j<num;j++){
                    var imgdata=cobj.getImageData(j*w,i*h,w,h);
                    var r=0,g=0,b=0;
                    for(var k=0;k<w*h;k++) {
                        r+=imgdata.data[k*4+0];
                        g+=imgdata.data[k*4+1];
                        b+=imgdata.data[k*4+2];
                    }
                    r=parseInt(r/(w*h));
                    g=parseInt(g/(w*h));
                    b=parseInt(b/(w*h));

                    for(var k=0;k<w*h;k++){
                        imgdata.data[k*4+0]=r;
                        imgdata.data[k*4+1]=g;
                        imgdata.data[k*4+2]=b;
                    }
                    cobj.putImageData(imgdata,x+w*j,y+h*i);
                }
            }
        }
        /*高斯模糊*/
//        blur(dataobj,10,900,0);
        function blur(dataobj,num,x,y) {
            var width = dataobj.width, height = dataobj.height;
            var arr=[];
            var num = num;
            for (var i = 0; i < height; i++) {//行
                for (var j = 0; j < width; j++) {//列  x
                    var x1=j+num>width?j-num:j;
                    var y1=i+num>height?i-num:i;
                    var dataObj = cobj.getImageData(x1, y1,num, num);
                    var r = 0, g = 0, b = 0;
                    for (var k = 0; k < dataObj.width * dataObj.height; k++) {
                        r += dataObj.data[k * 4 + 0];
                        g += dataObj.data[k * 4 + 1];
                        b += dataObj.data[k * 4 + 2];
                    }
                    r = parseInt(r/(dataObj.width*dataObj.height));
                    g = parseInt(g/(dataObj.width*dataObj.height));
                    b = parseInt(b/(dataObj.width*dataObj.height));
                    arr.push(r,g,b,255);
                }
            }
            for(var i=0;i<dataobj.data.length;i++){
                dataobj.data[i]=arr[i]
            }
            cobj.putImageData(dataobj,x,y);
        }
        var file=document.querySelector("input");
        var img=document.querySelector("img");
            // img.style.width=width/2+"pc";
            // img.style.height=height+"pc";
        file.onchange=function(){
            var fileObj=this.files[0];
            var reader=new FileReader();
            reader.readAsDataURL(fileObj);
            reader.onload=function(e){
                img.src= e.target.result;
                cobj.drawImage(img,150,0,500,550);
                dataobj=cobj.getImageData(150,0,500,550);
            }
        }
        var lis=document.getElementsByTagName("li");
        for(var i=0;i<lis.length;i++){
            lis[i].onclick=function(){
                var attr=this.getAttribute("data-role")
                if(attr=="blur"){
                    blur(dataobj,5,0,0);
                }else if(attr=="fx"){
                    fx(dataobj,150,0)
                }else if(attr=="msk"){
                    msk(dataobj,50,0,150)
                }
                else if(attr=="yt"){
                    cobj.drawImage(img,150,0,500,550);
                }
            }
        }





        $(document).mousemove(function(evt){
        mouseX = evt.pageX;
        mouseY = evt.pageY;
        if(mouseY<height && mouseX<width){
            $('.chalk').css('left',(mouseX-0.5*brushDiameter)+'px');
            $('.chalk').css('top',(mouseY-0.5*brushDiameter)+'px');
            if(mouseD){
                if(eraser){
                    erase(mouseX,mouseY);
                }else{
                    draw(mouseX,mouseY);
                    }
                }
        }else{
            $('.chalk').css('top',height-10);
            }
        });
    $(document).mousedown(function(evt){ 
        mouseD = true;
        xLast = mouseX;
        yLast = mouseY;
        if(evt.button == 2){
            erase(mouseX,mouseY);
            eraser = true;
            $('.chalk').addClass('eraser');
        }else{
            if(!$('.panel').is(':hover')){
                draw(mouseX+1,mouseY+1);
            }       
        }
    });

    $(document).mouseup(function(evt){ 
        mouseD = false;
        if(evt.button == 2){
            eraser = false;
            $('.chalk').removeClass('eraser');
        }
    });



})