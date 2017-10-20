;(function () {
    'use strict';
    var article_data, last_id;

    window.b = {
        article_data: article_data,
        last_id: last_id,
        add: add,
        del: del,
        updata: updata,
        read: read
    };
    //....................>>>.>>..............初始化..................>....>>.....>>.....
    init_data();

    function init_data() {
        article_data = s.get('article_data');
        last_id = s.get('last_id');
        if (!article_data) {
            article_data = [];
            s.set('article_data', article_data);
        }
        if (!last_id) {
            last_id = 0;
            s.set('last_id', last_id);
        }
    }

//.............................>>....>>.......添加..........>>...>>.....................
//     var ar={
//       title:"大话西游"  ,
//         author:"小胡同",
//         content:"看着比人的爱情,咀嚼着自己的青春",
//     };
//     add(ar);
    function add(pack) {
        pack.id = s.get('last_id')+1;
        article_data.push(pack);
        updata_article_data();
        updata_last_id();
    }

//....................>...............>.....删除......................>>..>............
    //del(1);
    function del(id) {
        var article_index = search_id(id);
        if (article_index !== -1) {
            article_data.splice(article_index, 1);

        }
        updata_article_data();
    }

//....................>>...............>>...修改..............>>.............>........
    function updata(id, pack) {
        var article_index = search_id(id);
        var article = article_data[article_index];
        article_data[article_index] = Object.assign({}, article, pack);
        updata_article_data();
    }

    //....................>>................查找....>>........>>......................
    function read(id) {
        if(id){
            return find_el(id);
        }
        else {
            return article_data;
        }
    }

    //...........>>..........................查找对象.................>.........>>.....
    function find_el(id) {
        return article_data.find(function (article) {
          return article.id===id;
        })

    }

//>>.........................................查找索引..................................
    function search_id(id) {
        return article_data.findIndex(function (item) {
            if (item.id === id) {
                return true;
            }
        })
    }


//...................................更新硬盘中的数据................................
    function updata_article_data() {
        s.set('article_data', article_data);
    }

    function updata_last_id() {
        var last_id = s.get('last_id');
        s.set('last_id', last_id + 1);
    }

})();