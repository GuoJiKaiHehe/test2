<?php

require '../BlogModel/Blog.php';

$html=array('title','content','date');
//sleep(2);

$all_blog=select($html);
//JOSNde
$all_blog=json_encode($all_blog);
echo $all_blog;