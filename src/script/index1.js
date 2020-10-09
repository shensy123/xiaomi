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