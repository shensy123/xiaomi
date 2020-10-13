/*【数据渲染】-------------------------------------------------------------- */
;!function($){
    //排序
    let array_default = []; //排序前的li数组
    let array = []; //排序中的数组
    //冒泡排序，比较相邻的两个数字。
    let prev = null; //前一个商品价格
    let next = null; //后一个商品价格


    //1.渲染列表页的数据-默认渲染第一页
    const contents = $('.list');

    $.ajax({
        url: 'http://localhost/xiaomi/php/listdata.php',
        dataType: 'json'
    }).done(function(data){
        console.log(data); //获取的数据
        console.log(contents.length);
        let str='';
        $.each(data,function(index,value){ //遍历data对象：将数据内容写入结构中
            str += `
            <a href="detail.html?sid=${value.sid}">
                <li class="list-item">
                    <img class="lazy" data-original="${value.url}" alt="${value.title}">
                    <h3 class="content-title">${value.title}</h3>
                    <p class="desc">${value.desc}元</p>
            `;
            if(value.price === value.org_price){  //是否添加原价删除线
                str += `
                            <p class="price"><em>${value.price}</em>元</p>
                        </li>
                    </a>
                `;
            }else{
                str += `
                        <p class="price"><em>${value.price}</em>元<del>${value.org_price}元</del></p>
                    </li>
                </a>
                `;
            }
        });
        contents.html(str);

        
        array_default = []; //排序前的li数组
        array = []; //排序中的数组
        prev = null;
        next = null;
        
        //【懒加载效果】---------------------------------------------------------------
        $("img.lazy").lazyload({
            effect: "fadeIn" //图片显示方式
        });


        //将页面的li元素加载到两个数组中
        $('.list li').each(function(index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    })




    // 2.分页思路:根据传输的页码，后端返回对应的接口数据，渲染出来。
    $('.page').pagination({
        pageCount: 4, //总的页数
        jump: true, //是否开启跳转到指定的页数，布尔值。
        prevContent: '上一页', //将图标改成上一页下一页。
        nextContent: '下一页',
        callback: function(api) {
            console.log(api.getCurrent()); //获取当前的点击的页码。
            $.ajax({
                url: 'http://localhost/xiaomi/php/listdata.php',
                data: {
                    page: api.getCurrent() //传输数据
                },
                dataType: 'json'
            }).done(function(data) {
                console.log(data); //获取的数据
                console.log(contents.length);
                let str='';
                $.each(data,function(index,value){ //遍历data对象：将数据内容写入结构中
                    str += `
                    <a href="detail.html?sid=${value.sid}">
                        <li class="list-item">
                            <img class="lazy" data-original="${value.url}" alt="${value.title}">
                            <h3 class="content-title">${value.title}</h3>
                            <p class="desc">${value.desc}元</p>
                    `;
                    if(value.price === value.org_price){  //是否添加原价删除线
                        str += `
                                    <p class="price"><em>${value.price}</em>元</p>
                                </li>
                            </a>
                        `;
                    }else{
                        str += `
                                <p class="price"><em>${value.price}</em>元<del>${value.org_price}元</del></p>
                            </li>
                        </a>
                        `;
                    }
                });
                contents.html(str);

                
                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                prev = null;
                next = null;
                
        
                //【懒加载效果】---------------------------------------------------------------
                $("img.lazy").lazyload({
                    effect: "fadeIn" //图片显示方式
                });
                //将页面的li元素加载到两个数组中
                $('.list li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            });
        }
    });
    


    
    //3.排序，排序前的数组都已经具有li元素
    // 默认
    $('.default-sort').on('click', function() {
        $.each(array_default, function(index, value) {
            $('.list').append(value);
        });
        return;
    });
    // 升序
    $('.ascending-sort').on('click', function() {
        console.log('升序点击了');
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price em').html()); //取上个价格
                next = parseFloat(array[j + 1].find('.price em').html()); //下一个的价格
                // console.log(parseFloat(array[j].find('.price em').html()));
                //通过价格的判断，改变的是数组li的位置。
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        $('.list').empty(); //清空原来的列表
        $.each(array, function(index, value) {
            $('.list').append(value);
        });
    });
        
    // 降序
    $('.descending-sort').on('click', function() {
        console.log('降序点击了');
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price em').html()); //取上个价格
                next = parseFloat(array[j + 1].find('.price em').html()); //下一个的价格
                // console.log(parseFloat(array[j].find('.price em').html()));
                //通过价格的判断，改变的是数组li的位置。
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        $('.list').empty(); //清空原来的列表
        $.each(array, function(index, value) {
            $('.list').append(value);
        });
    });

}(jQuery);