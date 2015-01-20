<?php
	$realname=$_POST["realname"];
	$dir_file= '../js/StoryFile/Info_'.$realname.'.json';
	if(file_exists($dir_file)){
		$json=file_get_contents($dir_file);
		print_r($json);
	}else{
		echo "no exists";
	}
?>