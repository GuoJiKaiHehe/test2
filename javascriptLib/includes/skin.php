<?php

//require '../config/config.php';

$html=array('bg_color','small_bg','big_bg','bg_text');
//sleep(2);

$all_skin=select($html);
//JOSNde
$all_blog=json_encode($all_blog);
echo $all_blog;

function select($fields=array(),$where=''){
    include '../config/config.php';
     $table='blog_skin';
     $_fields='';
    // empty($where);exit;
    if(empty($where)){
        $where='';
    }else{
        $where="WHERE $where";
    }
    $html=array();
    foreach($fields as $key=>$value){
         $_fields.="{$value},";
    }
    $_fields=substr($_fields,0,-1);
    $sql="select $_fields from $table $where  ORDER BY id desc limit 0,5";
  //  echo $sql;exit;
    $result=mysql_query($sql);
   // print_r($result);
    while($row=mysql_fetch_array($result,MYSQL_ASSOC)){
        $html[]=$row;
    }

    mysql_close();
    return $html;
}