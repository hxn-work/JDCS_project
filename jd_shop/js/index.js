window.onload = function () {
    var cityPicker = new HzwCityPicker({
        data: data,
        target: 'cityChoice',
        valType: 'k-v',
        hideCityInput: {
            name: 'city',
            id: 'city'
        },
        hideProvinceInput: {
            name: 'province',
            id: 'province'
        },
        callback: function () {
            // alert('OK');
        }
    });

    cityPicker.init();
}


// console.log($('#nav'))



function byClassName(sClassName) {
    if (document.getElementsBYClassName) {
        return document.getElementsByClassName(sClassName);
    } else {
        var allTagsName = document.getElementsByTagName('*');
        var result = [];
        for (var i = 0; i < allTagsName.length; i++) {
            if (allTagsName[i].className === sClassName) {
                result.push(allTagsName[i]);
            }
        }
        return result;
    }
}

var oTxt = byClassName('txt')[0];
var oBtn = byClassName('btn_search')[0];
var oList = byClassName('list')[0];
var form = document.querySelector('form');
var oDiv = document.createElement('div');
oTxt.onpropertychange = oTxt.oninput = function () {
    //    创建一个script标签,引入接口
    oList.style.display = "block";
    var oScript = document.createElement('script');
    oScript.src = 'https://suggest.taobao.com/sug?code=utf-8&q=' + this.value + '&_ksTS=1519875402602_594&callback=callback&area=c2c';
    //    将script标签添加到页面中
    document.body.appendChild(oScript);
    //    移除标签
    document.body.removeChild(oScript);
}

//创建回调函数接收数据
function callback(data) {

    oList.innerHTML = '';//清空数据
    data.result.forEach(value => {
        oList.innerHTML += `<li class="lis"><a id="oClick" href="https://s.taobao.com/search?imgfile=&q=${value[0]}&suggest=0_3&_input_charset=utf-8&wq=a&suggest_query=a"  target="_blank">${value[0]}</a></li>`
        var oA = document.querySelectorAll('#oClick');
        var lis = document.querySelectorAll('.lis');

        for (let i = 0; i < oA.length; i++) {
            oA[i].onclick = function () {
                oTxt.value = this.innerHTML;
            }
            lis[i].onmouseout = function () {
                oDiv.style.display = "none";
            }
        }
    });
    // var cont = data.result.length;
}



//回车搜索功能 等事件
(() => {
    oTxt.onclick = function () {
        oList.style.display = "block";
    };


    oTxt.onblur = function () {
        setTimeout(() => {
            oList.style.display = "none";
        }, 1000);

    };

    oTxt.onkeydown = function (e) {  //回车搜索
        if (e.keyCode == 13) {
            window.open("https://s.taobao.com/search?imgfile=&q=" + this.value + "&suggest=0_3&_input_charset=utf-8&wq=a&suggest_query=a" + ">" + this.value, "_blank");
            oList.style.display = "none";
        }
    }
    oBtn.onclick = function () {  //按钮搜索
        window.open("https://s.taobao.com/search?imgfile=&q=" + oTxt.value + "&suggest=0_3&_input_charset=utf-8&wq=a&suggest_query=a" + ">" + oTxt.value, "_blank");
        oList.style.display = "none";
    }


})();

