/**
 * Created by Administrator on 2016/12/15.
 */
var img6=document.querySelector('img:nth-of-type(6)')
img6.onmousemove=function () {
    img6.style.transform='scale(2)'
}
img6.onmouseout=function () {
    img6.style.transform='scale(1)'
}
function aav() {
    var contentEle=document.getElementById("content");
    var str="　　新年的钟声是催人奋进的号角，朋友，别再沉湎于往事，不要虚度光阴，快带着理想上路吧！" +
        "在元旦这个充满喜悦的日子里，愿新年的钟声能带给你一份宁静和喜悦，以及我最真诚的祝福:平安结，平安心，平安夜，平平安安一生一世。快乐日，快乐月，快乐年，快快乐乐一年一年。" +
        "人生相遇是缘，相离亦是缘，缘起缘散，都应持一份感恩之心。愿每一个人快乐进入人生道，事业登上好运岛!" +
        "‘世有愚者，读方三年，便谓天下无病可治’，这句作来共勉，希望永葆平常心。";
        
    var i=0;
    var flag=null;
    function done(){
        if(i<str.length){
            contentEle.innerHTML=str.substring(0,i+1);
            i=i+1;
        }
        else{
            clearInterval(flag);
        }
    }
    flag=setInterval(done,100)
}
setTimeout(aav,11000)