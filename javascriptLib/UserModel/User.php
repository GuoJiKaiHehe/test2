<?php

function add($arr=array()){
    include '../config/config.php';
    $table='blog_user';
    $keys=implode(',',array_keys($arr));
    $values=implode("','",array_values($arr));
    $sql="insert into $table($keys) values('$values')";
    mysql_query($sql);
    $affected_rows=mysql_affected_rows();
    mysql_close();
   // echo $sql;
    return $affected_rows;
}
function delete($where){
    include '../config/config.php';
     $table='blob_user';
    $sql="delete from $table where $where";
    mysql_query($sql);
    $affected_rows=mysql_affected_rows();
    mysql_close();
    return $affected_rows;
}
function update($arr=array(),$where){
    include '../config/config.php';
    $table='blog_user';
    $set='';
    foreach($arr as $key=>$value){
        $set.="$key='$value',";
    }
    $set=substr($set,0,-1);
    $sql="update $table set $set where $where";
    mysql_query($sql);
    $affected_rows=mysql_affected_rows();
    mysql_close();
    return $affected_rows;
}
function select($fields=array(),$where=array()){
    include '../config/config.php';
     $table='blog_user';
     $_fields='';
    if(!isset($where) && empty($where)){
        $where='';
    }else{
        $where="WHERE $where";
    }
    $html=array();
    foreach($fields as $key=>$value){
         $_fields.="{$value},";
    }
    $_fields=substr($_fields,0,-1);
    $sql="select $_fields from $table $where";
    
    $result=mysql_query($sql);
   // print_r($result);
    while($row=mysql_fetch_array($result,MYSQL_ASSOC)){
        $html[]=$row;
    }

    mysql_close();
    return $html;
}