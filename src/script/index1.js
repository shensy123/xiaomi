/*【数据渲染】 */
;!function($){
    const tabs = $('.intelligent .title .tab li');
    const contents = $('.intelligent .content');//4个ul

    $.ajax({
        url: 'http://localhost/xiaomi/php/piclist.php',
        dataType: 'json'
    }).done(function(data){
        console.log(data); //获取的数据
        console.log(contents.length);  //4
        let str='';
        let i=0,num = 0;
        $.each(data,function(index,value){ //遍历data对象：将数据内容写入结构中
            str += `
                <li>
                    <img class="lazy" data-original="${value.url}" alt="${value.title}">
                    <h3 class="content-title">${value.title}</h3>
                    <p class="desc">${value.desc}元</p>
            `;
            if(value.price === value.org_price){  //是否添加原价删除线
                str += `
                    <p class="price">${value.price}元<del>${value.org_price}元</del></p>
                </li>
                `;
            }else{
                str += `
                    <p class="price">${value.price}元</p>
                </li>
                `;
            }
            num++; //累计添加的数据次数
            if(num!==0 && num%8===0){  //当达到当前ul中li个数（即8）时写入数据，重置str
                $(contents[i++]).html(str);
                str='';
            }
        });

        $(tabs).on('mouseover',function(){
            //为每一个元素都添加类名，选取出当前事件元素的其他兄弟节点，为他们移除类名
            $(this).addClass('active').siblings('.intelligent .title .tab li').removeClass('active');
            //获取当前事件元素的下标位置,对应找到要显示的内容块，将其显示并让其他兄弟节点的显示内容隐藏
            contents.eq($(this).index()).show().siblings('.intelligent .content').hide();
        });

        //懒加载效果
        $("img.lazy").lazyload({
            effect: "fadeIn" //图片显示方式
        });
    })
}(jQuery);

//单个tab渲染成功的代码
// ;!function($){
//     const tabs = $('.intelligent .title .tab li');
//     const contents = $('.intelligent .tab-hot');  //第一个tab对应内容元素

//     $.ajax({
//         url: 'http://localhost/xiaomi/php/piclist.php',
//         dataType: 'json'
//     }).done(function(data){
//         console.log(data);
//         console.log(contents.length);  //4
//         console.log(contents);  //第一个ul
//         let str = '';
//         $.each(data,function(index,value){ //遍历data对象：将数据内容
//             str += `
//                 <li>
//                     <img src="${value.url}" alt="${value.title}">
//                     <h3 class="content-title">${value.title}</h3>
//                     <p class="desc">${value.desc}元</p>
//                     <p class="price">${value.price}元<del>${value.org_price}元</del></p>
//                 </li>
//                 `;
//         });
//         contents.html(str);   
        
//     })
// }(jQuery);

//【轮播图】
    //1、获取元素对象
    const view = document.querySelector('.banner-box');
    const banner = document.querySelector('.banner');
    const images = document.querySelectorAll('.banner li', true); //6张广告图
    const btn = document.querySelector('.ban-btn');
    const btns = document.querySelectorAll('.ban-btn li', true);  //6个按钮
    const leftArrow = document.querySelector('#ban-left-arrow');
    const rightArrow = document.querySelector('#ban-right-arrow');
    let num = 0;

    //2、为六个按钮添加事件（鼠标移入）
    // btn.onmouseover = function(ev){
    //     var ev = ev || event;
    //     if(ev.target.nodeName === 'LI'){
    //         ev.target.className
    //         console.log(ev.target);
    //     }
    // }
    for(let i=0; i< btns.length; i++){
        btns[i].onmouseover = function(){
            num = i;
            tabswitch(); //当前图片和按钮相关属性变化处理函数
        }
    }
    //当前图片和按钮相关属性变化处理函数：类名激活，对应图片显示
    function tabswitch(){
        for(let i=0; i< btns.length; i++){  //其他选项清空
            btns[i].className = '';
            bufferMove(images[i], {opacity:0});
        }
        btns[num].className = 'active';
        bufferMove(images[num], {opacity:100});
    }

    //3、view鼠标移入移出事件：显示左右箭头，移出时定时让右箭头按下事件主动触发
    view.onmouseover = function(){
        leftArrow.style.display = 'block';
        rightArrow.style.display = 'block';
        clearInterval(timer);
    }
    view.onmouseout = function(){
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'none';
        timer = setInterval(() => {
            rightArrow.onclick();
        },3000);
    }

    //4、左右箭头点击事件
    leftArrow.onclick = function(){
        num>0 ? num-- : num=btns.length-1;
        tabswitch();
    }  
    rightArrow.onclick = function(){
        num<btns.length-1 ? num++ : num=0;
        tabswitch();
    }

    //5、自动轮播：设置定时器3秒调用一次右箭头点击事件
    timer = setInterval(() => {
        rightArrow.onclick();
    },3000);