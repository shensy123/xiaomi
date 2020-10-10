<?php
    header('Access-Control-Allow-Origin:*');   //任意地址都可以访问
    header('Access-Control-Allow-Method:POST,GET');  //跨越请求的方式
    include "./conn.php"; //引用文件

    //获取数据库中taobaogoods表中的所有数据
    $result = $conn->query('select * from xiaomigoods');
    $arr = array(); //用于存储数据库中取出的数据
    for($i=0; $i<$result->num_rows; $i++)
        $arr[$i] = $result->fetch_assoc(); //逐行获取记录，返回数组，存储到新数组中去
    echo json_encode($arr);//将二维数组输出json格式
?>