/**
 * Created by Chris on 2016/4/4.
 */
var project_info  = function () {

//        当前活动标签
  var current = 1;

  display($('#rotmenu li:first'));
  $('#rotmenu li').bind('click', function (e) {
    display($(this));
    e.preventDefault();
  });
  function display(elem) {
    var $this = elem;
    var repeat = false;

    $this.parent().find('li:nth-child(' + current + ') a')
      .stop()
      .animate({'marginRight': '-20px'}, 300, function () {
        $(this).animate({'opacity': '0.7'}, 700);
      });

    //重置当前current
    current = parseInt($this.index() + 1);

    // 把a往外移动效果显示
    var elem = $('a', $this);
    elem.stop().animate({'marginRight': '0px', 'opacity': '1.0'}, 300);

    // 信息展示
    var info_elem = elem.next();
    $('#rot1 .heading').stop().animate({'left': '-420px'}, 500, 'easeOutCirc', function () {
      $('h1', $(this)).html(info_elem.find('.info_heading').html());
      $(this).animate({'left': '0px'}, 400, 'easeInOutQuad');
    });

    $('#rot1 .description').stop().animate({'bottom': '-270px'}, 500, 'easeOutCirc', function () {
      $('p', $(this)).html(info_elem.find('.info_description').html());
      $(this).animate({'bottom': '0px'}, 400, 'easeInOutQuad');
    })

    $('#rot1').prepend(
      $('<img/>', {
        style: 'opacity:0',
        className: 'bg'
      }).load(
        function () {
          $(this).animate({'opacity': '1'}, 600);
          $('#rot1 img:first').next().animate({'opacity': '0'}, 700, function () {
            $(this).remove();
          });
        }
      ).attr('src', 'images/' + info_elem.find('.info_image').html()).attr('width', '100%').attr('height', '300')
    );
  }

}

function aav() {
    var contentEle=document.getElementById("content");
    var str="                  参与WEB项目的页面布局，进行前台页面技术研究开发，利用less写12栅格化响应式页面；"+
            "负责利用JS实现Web中的交互效果；"+
            "根据产品设计文档，解决浏览器兼容问题；"+
            "基于HTML5、CSS3进行页面制作。"
        
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
    flag=setTimeout(function(){setInterval(done,50)},1000)
}
aav();
