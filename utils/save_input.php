<?php
//save les inputs dans le fichier csv


$username=$_GET['username'];
$realname=$_GET['realname'];
$questionName=$_GET['questionName'];

$dir = '../server/php/inputTextResultat/'.$username.'/';

if(!file_exists($dir)){
	mkdir($dir);
}
$dirVideo=$dir.$realname.'/';

if(!file_exists($dirVideo)){
	mkdir($dirVideo);
}
$file=$questionName.".csv";

$fp = fopen ($dirVideo.$file, 'a');

if(flock($fp, LOCK_EX | LOCK_NB)){
	fputcsv ($fp, array($_POST['input']));
	flock($fp,LOCK_UN);
}else{
	echo "Error ecrit le fichier";
}
	fclose ($fp);
	
	
?>