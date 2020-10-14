! function($) {
    //1.获取cookie渲染对应的商品列表
    //2.获取所有的接口数据，判断取值。

    function showlist(sid, num) { //sid：编号  num：数量
        $.ajax({
            url: 'http://localhost/xiaomi/php/piclist.php',
            dataType: 'json'
        }).done(function(data) {
            $.each(data, function(index, value) {
                if (sid == value.sid) {
                    var $clonebox = $('.list-item:hidden').clone(true, true); //克隆隐藏元素
                    console.log(value);
                    $clonebox.find('.col-img').find('img').attr('src', value.url); //图片
                    $clonebox.find('.col-img').find('img').attr('sid', value.sid);
                    $clonebox.find('a').html(value.title); //名称
                    $clonebox.find('.col-price').find('.num').html(value.price);//单价
                    $clonebox.find('.col-num').html(num); //数量
                    $clonebox.find('.col-total').find('.num').html((value.price * num).toFixed(2)); //总价
                    $clonebox.css('display', 'block');
                    console.log($clonebox.html());
                    $('.list-body').append($clonebox);
                    calcprice(); //计算总价
                }
            });

        });
    }

    //2.获取cookie渲染数据
    if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {
        let s = jscookie.get('cookiesid').split(','); //获取cookie转换数组
        let n = jscookie.get('cookienum').split(','); //获取cookie转换数组
        $.each(s, function(index, value) {
            showlist(s[index], n[index]);
            console.log('数据渲染中');
        });
    }

    //3.计算总价--使用次数很多--函数封装
    function calcprice() {
        var total_num = 0; //商品总件数
        var total_price = 0; //商品的总价
        var checked_num = 0; //已选商品的件数
        $('.list-item:visible').each(function(index, ele) {
            // console.log($(ele).find('.row').html());
            total_num += parseInt($(ele).find('.col-num').html());
            if ($(ele).find('.col-check').find('.checked').html()) { //复选框勾选
                total_price += parseInt($(ele).find('.col-total .num').html());
                checked_num += parseFloat($(ele).find('.col-num').html());
            }
        });
        // console.log('总数' + total_num);
        // console.log('件数' + checked_num);
        // console.log('总价' + total_price.toFixed(2));
        $('.in-total').html(total_num);
        $('.total-price .price').html(total_price.toFixed(2));
        $('.selected').html(checked_num);
    }

    //4.全选
    $('.all').on('click', function() {
        // console.log('全选点击了');
        // console.log($('list-head .col-check').find('.no-check').html());
        if($('.list-head .col-check').find('.no-check').html()){
            // console.log('全选选中');
            $('.all').addClass('checked').removeClass('no-check');
            $('.list-item:visible').find('.check').addClass('checked').removeClass('no-check');
        }else{
            // console.log('全选取消选中');
            $('.all').addClass('no-check').removeClass('checked');
            $('.list-item:visible').find('.check').addClass('no-check').removeClass('checked');
        }
        calcprice(); //计算总价
    });

    var $check = $('.list-item:visible').find('.check');
    $('.list-item .check').on('click', $check, function() {
        //$(this):被委托的元素，checkbox
        console.log($('.list-item:visible').find('.check').length);
        console.log($('.list-item:visible').find('.checked').length);

        //改变当前选项的状态
        console.log($(this).parent().html());
        if($(this).parent().find('.no-check').html()) $(this).addClass('checked').removeClass('no-check');
        else $(this).addClass('no-check').removeClass('checked');

        //判断是否全选，改变全选按钮的状态
        if ($('.list-item:visible').find('.check').length === $('.list-item:visible').find('.checked').length) {
            $('.all').addClass('checked').removeClass('no-check');
        } else {
            $('.all').addClass('no-check').removeClass('checked');
        }
        calcprice(); //计算总价
    });

    // //5.数量的改变
    // $('.quantity-add').on('click', function() {
    //     let $num = $(this).parents('.goods-item').find('.quantity-form input').val();
    //     $num++;
    //     $(this).parents('.goods-item').find('.quantity-form input').val($num);

    //     $(this).parents('.goods-item').find('.b-sum strong').html(calcsingleprice($(this)));
    //     calcprice(); //计算总价
    //     setcookie($(this));
    // });


    // $('.quantity-down').on('click', function() {
    //     let $num = $(this).parents('.goods-item').find('.quantity-form input').val();
    //     $num--;
    //     if ($num < 1) {
    //         $num = 1;
    //     }
    //     $(this).parents('.goods-item').find('.quantity-form input').val($num);
    //     $(this).parents('.goods-item').find('.b-sum strong').html(calcsingleprice($(this)));
    //     calcprice(); //计算总价
    //     setcookie($(this));
    // });


    // $('.quantity-form input').on('input', function() {
    //     let $reg = /^\d+$/g; //只能输入数字
    //     let $value = $(this).val();
    //     if (!$reg.test($value)) { //不是数字
    //         $(this).val(1);
    //     }
    //     $(this).parents('.goods-item').find('.b-sum strong').html(calcsingleprice($(this)));
    //     calcprice(); //计算总价
    //     setcookie($(this));
    // });

    // //计算单价
    // function calcsingleprice(obj) { //obj元素对象
    //     let $dj = parseFloat(obj.parents('.goods-item').find('.b-price strong').html());
    //     let $num = parseInt(obj.parents('.goods-item').find('.quantity-form input').val());
    //     return ($dj * $num).toFixed(2)
    // }


    //将改变后的数量存放到cookie中
    let arrsid = []; //存储商品的编号。
    let arrnum = []; //存储商品的数量。
    function cookietoarray() {
        if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {
            arrsid = jscookie.get('cookiesid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
            arrnum = jscookie.get('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
        } else {
            arrsid = [];
            arrnum = [];
        }
    }

    // function setcookie(obj) {
    //     cookietoarray();
    //     let $sid = obj.parents('.goods-item').find('img').attr('sid');
    //     arrnum[$.inArray($sid, arrsid)] = obj.parents('.goods-item').find('.quantity-form input').val();
    //     jscookie.add('cookienum', arrnum, 10);
    // }


    //6.删除
    function delcookie(sid, arrsid) { //sid:当前删除的sid  arrsid:存放sid的数组[3,5,6,7]
        let $index = -1; //删除的索引位置
        $.each(arrsid, function(index, value) {
            if (sid === value) $index = index;
        });
        arrsid.splice($index, 1); //从$index开始移除1
        arrnum.splice($index, 1);

        jscookie.add('cookiesid', arrsid, 10);
        jscookie.add('cookienum', arrnum, 10);
    }
    // 删除按钮事件：移除父元素，删除cookie中父元素图片对应的sid数据，计算总价
    $('.col-action span').on('click', function() {
        cookietoarray();
        if (window.confirm('你确定要删除吗?')) {
            $(this).parents('.list-item').remove();
            delcookie($(this).parents('.list-item').find('.col img').attr('sid'), arrsid);
            calcprice(); //计算总价
        }
    });

    // $('.operation a').on('click', function() {
    //     cookietoarray();
    //     if (window.confirm('你确定要全部删除吗?')) {
    //         $('.goods-item:visible').each(function() {
    //             if ($(this).find(':checkbox').is(':checked')) { //判断复选框是否选中
    //                 $(this).remove();
    //                 delcookie($(this).find('img').attr('sid'), arrsid);
    //             }
    //         });
    //         calcprice(); //计算总价
    //     }
    // });
}(jQuery);