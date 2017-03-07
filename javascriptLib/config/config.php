<?php

header('content-type:text/html;charset=utf-8');
define('PATH_ROOT',dirname(dirname(__FILE__)).'\\' );

//session_start();
define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PASS','');
define('DB_NAME','blog');
$link=@mysql_connect(DB_HOST,DB_USER,DB_PASS) or die('lianjieshibai');
mysql_select_db(DB_NAME);
mysql_query('SET NAMES UTF8');
