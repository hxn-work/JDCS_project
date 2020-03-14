/*
 totop  //返回顶部按钮
 fixedevery   // 左侧固定导航的每一项
 louceng  //模块的每一项
 header   //头部
 */
var totop = document.querySelector(".totop")
function floor(fixedevery, louceng, header) {
    this.fixedevery = fixedevery;
    this.louceng = louceng;
    this.header = header;
}
floor.prototype = {
    init: function () {
        var that = this;
        that.start();
        this.fixedeveryClick();
    },
    start: function () {
        var that = this;
        $(window).scroll(function () {
            var winH = $(window).height();
            var iTop = $(window).scrollTop();//鼠标滚动的距离
            if (iTop > $(that.header).height()) {
                $(that.fixedevery).parent().fadeIn();
                // $(totop).fadeIn();
                $(that.louceng).each(function () {
                    if (winH + iTop - $(this).offset().top > winH / 2) {
                        $(that.fixedevery).removeClass('active');
                        $(that.fixedevery).eq($(this).index()).addClass('active');
                    }
                })
            } else {
                $(that.fixedevery).parent().fadeOut();
                // $(totop).fadeOut();
            }
        });
    },

    fixedeveryClick: function () {
        var that = this;
        $(that.fixedevery).click(function () {
            var t = $(that.louceng).eq($(this).index()).offset().top;
            $('body,html').animate({ "scrollTop": t }, 300);
            $(this).addClass('active').siblings().removeClass('active');
        });
    },
}


$(totop).click(function () {
    $('body,html').animate({ "scrollTop": 0 }, 300)
})





