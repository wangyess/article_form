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
//                 article.id= parseInt(article.id);
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
//


;(function () {
    var article_list = document.getElementById('article-list');
    var article_form = document.getElementById('article-form');
    var btn_bt = document.getElementById('btn_bt');
    var btn_b = document.getElementById('btn_b');

    init();

    function init() {
        render();
        dian_diao();
        find_you_want();
        init_all();
    }

    //添加
    function dian_diao() {
        article_form.addEventListener('submit', function (e) {
            e.preventDefault();
            var article = get_input_value();
            if (!article.id) {
                b.add(article);
            } else {
                article.id = parseInt(article.id);
                b.updata(article.id, article);
            }
            render();
        });
    }

    //获取输入的值 并封装成对象
    function get_input_value() {
        var data = {};
        var input_list = article_form.children;
        for (var i = 0; i < input_list.length; i++) {
            var input = input_list[i];
            var key = input.getAttribute('name');
            var val = input.value;
            input.value = '';
            data[key] = val;
        }
        return data;
    }

    //重置
    function init_all() {
        btn_b.addEventListener('click', function (e) {
            e.preventDefault();
            get_input_value();
            render();
        })
    }

    //查找
    function find_you_want() {
        btn_bt.addEventListener('click', function (e) {
            e.preventDefault();
            //获取到第一个输入框的值  key
            var a_article = get_input_value();
            var key = a_article.title;
            if (!key || key === '') {
                alert("先输入你要查找的关键字试试");
            }
            else {
                var b_article = b.read_1(key);
                if (b_article) {
                    render(b_article);
                } else {
                    alert("输入的信息不存在");
                }
            }
        })
    }

    //删除
    window.del_this_el = del_this_el;

    function del_this_el(obj) {
        var n = obj.id.slice(4);
        b.del(parseInt(n));
        render();
    }

    //修改
    window.updata_this_el = updata_this_el;

    function updata_this_el(obj) {
        var m = obj.id.slice(4);
        var article_up = b.read(parseInt(m));
        el_input_ye(article_up);
    }

    function el_input_ye(article) {
        for (var temp in article) {
            var val = article[temp];
            var input = article_form.querySelector('[name=' + temp + ']');
            if (!input) {
                continue;
            } else {
                input.value = val;
            }
        }
    }

//渲染到页面上  整体
    function render(article) {
        article_list.innerHTML = '';
        var comment;
        if (!article) {
            var article_all_data = b.read();
            comment = article_all_data;
        } else {
            comment = article;
        }
        comment.find(function (article) {
            var mydiv = document.createElement('div');
            mydiv.classList.add('first-div');
            mydiv.innerHTML = `
                <button id="btn-${article.id}" onclick="del_this_el(this)">X</button>
                <button id="btn-${article.id}" onclick="updata_this_el(this)" class="fa fa-edit"></button>
                <p style="text-align: center;font-size: 18px;"> ${article.title}-${article.id}</p>
                 <p style="text-align: center"> ${article.content}</p>
                <p style="text-align: center">作者: ${article.author}</p>
               
              `;
            article_list.appendChild(mydiv);
        })
    }
})();
























