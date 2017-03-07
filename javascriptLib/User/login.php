<?php

require '../UserModel/User.php';

$html=array('user');
$user=$_POST['user'];
$password=sha1(trim($_POST['pass']));
sleep(2);
$where="user='$user' and pass='$password'";

if(select($html,$where)){
    echo '1';//如果有值返回1
}else{
    echo '0';
}