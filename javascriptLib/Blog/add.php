<?php

require '../BlogModel/Blog.php';

//print_r($_POST);
$html=array();
$html['title']=$_POST['title'];
$html['content']=$_POST['content'];
 $html['date']=Date('Y-m-d H:i:s');
sleep(2);
echo add($html);