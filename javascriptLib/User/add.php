<?php

require '../UserModel/User.php';

//print_r($_POST);
$html=array();
$html['birthday']=$_POST['year'].'-'.$_POST['month'].'-'.$_POST['day'];
$html['user']=$_POST['user'];
$html['pass']=sha1($_POST['pass']);
$html['ques']=$_POST['ques'];
$html['ans']=$_POST['ans'];
$html['email']=$_POST['email'];
$html['ps']=$_POST['ps'];
sleep(2);
echo add($html);