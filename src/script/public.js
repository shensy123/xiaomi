//获取随机数
const rannum = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

//获取任意css属性值（带单位）getStyle(obj对象, attr属性)———— 兼容写法
function getStyle(obj, attr){
    if(window.getComputedStyle) return window.getComputedStyle(obj)[attr];
    else return obj.currentStyle[attr];
}

//缓冲运动bufferMove（obj运动元素，json对象：目标属性的集合，fn回调函数）
function bufferMove(obj, json, fn){ 
    let speed = 0;
    let flag = true;
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        for(let attr in json){
            var currentValue = null;
            if(attr === 'opacity') currentValue = Math.round(getStyle(obj, attr)*100);
            else currentValue = parseInt(getStyle(obj, attr));

            speed = (json[attr] - currentValue) / 10;
            speed = speed>0 ? Math.ceil(speed) : Math.floor(speed); 
            
            if(currentValue !== json[attr]){
                if(attr === 'opacity') obj.style[attr] = (currentValue + speed)/100;
                else obj.style[attr] = currentValue + speed + 'px',console.log(speed);
                flag = false;
            }
        }
        if(flag){
            clearInterval(obj.timer);
            fn && (typeof fn === 'function') && fn();
        }

    },1000/60);
}

//获取元素对象
function $(selector, bool){
    if(!bool) return document.querySelector(selector);
    else return document.querySelectorAll(selector);
}