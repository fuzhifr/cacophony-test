<?php
	$username=$_COOKIE['username'];
	$current_dir = '../server/php/StoryFile/'.$username.'/';
	$dir = opendir($current_dir);
	$fileList=array();
	while(false !== ($file=readdir($dir))){
	if($file != "." && $file != ".."){
	 $filename=pathinfo($file);
		if($filename['extension']=="js"){
			$realname=basename($file,'.js');
			$isExist=isExistFile($realname,$username);
			$resultat=array(
				"isExist"=>$isExist,
				"realname"=>$realname
			);
			array_push($fileList,$resultat);
		}
	 }
	}
	closedir($dir);

	echo json_encode($fileList);
	
	function isExistFile($realname,$username){
			$dir = "../server/php/inputTextResultat/".$username."/".$realname."/";
			if (is_dir($dir)){
			  if ($dh = opendir($dir)){
				while (($file = readdir($dh)) !== false){
				if($file != "." && $file != ".."){					  
					 return "true";
				  }
				}
				return "false";
			  }
			}else{
				return "false";
			}
	}
?>