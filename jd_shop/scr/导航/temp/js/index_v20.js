$(function () {
    $('#q_product').hover(function () {
        if ($('#q_prd_wrap').length != 0) {
            $(this).append($($('#q_prd_wrap').text()));
            $('#q_prd_wrap').remove();
        } else {
            $(this).find('.menu-bd').show()
        }

    }, function () {
        $(this).find('.menu-bd').hide();
    });

    $(".js_toggle").Jdropdown({
        delay: 10
    }, function (e) {

    })
});

// 延时切换
(function (a) {
    a.fn.Jdropdown = function (d, e) {
        if (!this.length) {
            return
        }
        if (typeof d == "function") {
            e = d;
            d = {}
        }
        var c = a.extend({
            event: "mouseover",
            current: "hover",
            delay: 0,
            fun: "default"
        }, d || {});
        var b = (c.event == "mouseover") ? "mouseout" : "mouseleave";
        a.each(this, function () {
            var h = null,
                g = null,
                f = false;
            a(this).bind(c.event, function () {
                if (f) {
                    clearTimeout(g)
                } else {
                    var j = a(this);
                    h = setTimeout(function () {
                        if (c.fun == "default") {
                            var menu_item_wrap = j.find('.menu-item-wrap');
                            if (menu_item_wrap.length != 0) {
                                var o_menu_in = $(menu_item_wrap.text());
                                j.append(o_menu_in);
                                menu_item_wrap.remove();
                                _flag_temp = 1;
                            }
                            j.addClass(c.current).children(".menu-in").show();
                            j.find('.shadow-bg').show();
                        }
                        f = true;
                        if (e) {
                            e(j)
                        }
                    }, c.delay)
                }
            }).bind(b, function () {
                if (f) {
                    var j = a(this);
                    g = setTimeout(function () {
                        if (c.fun == "default") {
                            j.removeClass(c.current).children(".menu-in").hide();
                            j.find('.shadow-bg').hide();
                        }
                        if (c.fun == 'hover_mask') {
                            j.parents("li").find('.mask').removeClass("op3");
                        }
                        f = false
                    }, c.delay)
                } else {
                    clearTimeout(h)
                }
            })
        })
    }
})(jQuery);