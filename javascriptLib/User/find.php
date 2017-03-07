<?php

require '../UserModel/User.php';

$html=array('user');
$user=$_POST['user'];
sleep(2);
$where="user='$user'";

if(select($html,$where)){
    echo '1';//如果有值返回1
}else{
    echo '0';
}