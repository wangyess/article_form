// ;(function () {
//     'use strict';
//
// //...............................获取HTML文件中的表单以及盒子
//     var article_list = document.getElementById('article-list');
//     var article_form = document.getElementById('article-form');
//
// //...........................................获取到输入的值
//     listener_1();
//
//     function listener_1() {
//         render();
//         bind_submit();
//     }
//
// //........................................获取输入的内容 并封装成对象....................................
//     function input_object(item) {
//         var data = {};
//         var input_list = item.children;
//         for (var i = 0; i < input_list.length; i++) {
//             var input = input_list[i];
//             if(input.nodeName == 'INPUT' || input.nodeName == 'TEXTAREA'){
//                 var key = input.getAttribute('name');
//                 var val = input.value;
//                 input.value='';
//                 data[key] = val;
//             }
//
//         }
//         return data;
//     }
//
//     //.........................................添加到页面上的事件..................................
//     function bind_submit() {
//         article_form.addEventListener('submit', function (e) {
//             e.preventDefault();
//             var article = input_object(article_form);
//             if(article.id){
//              b.updata(parseInt(article.id),article)
//             }else{
//                 b.add(article);
//             }
//             render();
//
//         })
//     }
//
// //.............................................删除............................................
//     window.diao_del = diao_del;
//
//     function diao_del(obj) {
//         var n = obj.id.slice(4);
//         var nn = parseInt(n);
//         b.del(nn);
//         render();
//     }
//
// //............................................修改.............................................
//     window.bian_j = bian_j;
//
//     function bian_j(obj) {
//         var m = obj.id.slice(4);
//         var mm = parseInt(m);
//         var article__12 = b.read(mm);
//         set_form_value(article_form,article__12);
//     }
//
//     function set_form_value(el,pack) {
//         for(var key in pack ){
//            var val = pack[ key ];
//            var input = el.querySelector('[name=' + key + ']');
//            if(!input){
//                continue;
//            }
//            else{
//                input.value=val;
//            }
//
//         }
//     }
//
// //.............................................渲染到页面上
//     function render() {
//         //页面上显示的清空
//         article_list.innerHTML = '';
//         //获取所有数据
//         var article_data_1 = b.read();
//         //遍历每一个对象
//         article_data_1.forEach(function (item) {
// //...................................新建div 并给一个类去更改样式.................................
//             var mydiv = document.createElement('div');
//             mydiv.classList.add('first-div');
// //...................................在div中间入动态的信息显示在页面上.............................
//             mydiv.innerHTML = `
//            <button id="btn-${item.id}" onclick="diao_del(this)">X</button>
//            <p style="font-size: 18px; font-weight: 600; text-align: center;"> ${item.title} - ${item.id} </p>
//            <p style="text-align: center"> ${item.author} </p>
//            <p style="text-align: center"> 作者: ${item.content} </p>
//            <button id="btn-${item.id}" onclick="bian_j(this)">编辑</button>
//            `;
// //..................................传入到页面的盒子中...........................................
//             article_list.appendChild(mydiv);
//         })
//     }
//
// })();

;(function () {
    'use strict';

    var article_list = document.getElementById('article-list');
    var article_form = document.getElementById('article-form');

    init();

    function init() {
        render();
        bind_event();
    }

//添加
    function bind_event() {
        article_form.addEventListener('submit', function (e) {
            e.preventDefault();
            var article = change_object();
            if (article.id) {
                b.updata(parseInt(article.id), article);
            }
            else {
                b.add(article);
            }
            render();
        })
    }

    //获取值变成对象
    function change_object() {
        var data = {};
        var input_list = article_form.children;
        for (var i = 0; i < input_list.length; i++) {
            var input = input_list[i];
            var key = input.getAttribute('name');
            var val = input.value;
            data[key] = val;
        }
        return data;
    }

    //删除
    window.on_del_click = on_del_click;

    function on_del_click(obj) {
        var n = obj.id;
        var nn = n.slice(4);
        b.del(parseInt(nn));
        render();
    }

    //修稿
    window.on_x_click = on_x_click;

    function on_x_click(obj) {
        var m = obj.id;
        var mm = m.slice(4);
        var article_s = b.read(parseInt(mm));
        input_search(article_s);
    }

    //把找到的对象传到输入框中
    function input_search(pack) {
        for (var key in pack) {
            var val = pack[key];
            var input = article_form.querySelector('[name=' + key + ']');
            if (!input) {
                continue;
            }
            else {
                input.value = val;
            }

        }
    }

    //所有东西渲染到页面上

    function render() {
        article_list.innerHTML = '';
        var article_data_1 = b.read();
        article_data_1.forEach(function (article) {
            var mydiv = document.createElement('div');
            mydiv.classList.add('first-div');
            mydiv.innerHTML = `
               <button id="btn-${article.id}" onclick=on_del_click(this)>X</button>
               <button id="btn-${article.id}" onclick=on_la_click(this)>v</button>
               <p style="text-align: center; width:880px;">${article.title}</p>            
               <p style="text-align: center; width:880px; ">${article.author}</p>            
               <p style="text-align: center; width:880px; ">${article.content}</p>    
               <button id="btn-${article.id}" onclick="on_x_click(this)">编辑</button>
            `;
            article_list.appendChild(mydiv);
        })

    }


})();


























