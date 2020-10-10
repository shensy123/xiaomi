<?php  /*关于连接数据库的代码*/
    header('content-type:text/html;charset:utf-8');  //设置字符编码

    //常量定义：主机名、用户名、密码、数据库名
    define('host','localhost');
    define('username','root');
    define('password','root');
    define('database','xiaomi');

    //建立数据库连接
    $conn = @new mysqli(host,username,password,database);

    //自定义错误处理
    if($conn->connect_error) die('数据库连接错误'); 

    //设置数据库中的字符编码问题
    $conn->query('set names utf8');
?>