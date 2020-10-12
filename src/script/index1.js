/*【数据渲染】-------------------------------------------------------------- */
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

        //【tab切换】------------------------------------------------------------------
        $(tabs).on('mouseover',function(){
            //为每一个元素都添加类名，选取出当前事件元素的其他兄弟节点，为他们移除类名
            $(this).addClass('active').siblings('.intelligent .title .tab li').removeClass('active');
            //获取当前事件元素的下标位置,对应找到要显示的内容块，将其显示并让其他兄弟节点的显示内容隐藏
            contents.eq($(this).index()).show().siblings('.intelligent .content').hide();
        });

        //【懒加载效果】---------------------------------------------------------------
        $("img.lazy").lazyload({
            effect: "fadeIn" //图片显示方式
        });



        //【轮播图】-------------------------------------------------------------------
        class Lunbo{
            constructor(){ //构造函数
                this.lunbo = $('.banner-box');
                this.images = $('.banner li'); //6张广告图
                this.btns = $('.ban-btn li');  //6个按钮
                this.leftArrow = $('#ban-left-arrow');
                this.rightArrow = $('#ban-right-arrow');
                this.index = 0;
                this.timer = null;
            }

            //初始化：
            /* 1、移入移出（左右箭头显示/隐藏、移出后设置定时右箭头触发）*/
            /* 2、小圆圈按钮点击事件（切换banner）*/
            /* 3、左右箭头点击事件（切换banner）*/
            /* 4、自动轮播 */
            init(){
                let _this=this;

                /* 1、移入移出（左右箭头显示/隐藏、移出后设置定时右箭头触发）*/
                this.lunbo.hover(function(){
                    _this.leftArrow.show();
                    _this.rightArrow.show();
                    clearInterval(this.timer);
                    clearInterval(_this.timer);
                },function(){
                    _this.leftArrow.hide();
                    _this.rightArrow.hide();
                    this.timer = window.setInterval(function(){
                        _this.rightArrowClick();
                    },7000);
                });

                /* 2、小圆圈按钮点击事件（切换banner）*/
                this.btns.on('click',function(){
                    _this.index = $(this).index(); //存储当前按下的按钮索引
                    _this.tabswitch();
                });

                /* 3、左右箭头点击事件（切换banner）*/
                this.leftArrow.on('click', function(){
                    _this.leftArrowClick();
                });
                this.rightArrow.on('click', function(){
                    _this.rightArrowClick();
                });

                //4、自动轮播：设置定时器3秒调用一次右箭头点击事件
                this.timer = window.setInterval(function(){
                    _this.rightArrowClick();
                    },7000);
            }

            //当前图片和按钮相关属性变化处理函数：类名激活，对应图片显示
            tabswitch(){
                this.btns.eq(this.index).addClass('active').siblings().removeClass('active');
                this.images.eq(this.index).stop(true).animate({opacity:1})
                                .siblings().stop(true).animate({opacity:0});
            }

            //左右箭头按下后的行为：调整到要显示的banner下标，调用显示处理方法
            leftArrowClick(){
                this.index>0 ? this.index-- : this.index=this.btns.size()-1;
                this.tabswitch();
            }
            rightArrowClick(){
                this.index<this.btns.size()-1 ? this.index++ : this.index=0;
                this.tabswitch();
            }
        }

        new Lunbo().init();
    })
}(jQuery);