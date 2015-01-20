<!DOCTYPE html>
<?php
session_start();
if(!isset($_SESSION['user'])){
	header('Location: index.html');
}
?>
<html>
<head>
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
	
	<title>Création de pages synchronisées sur des vidéos</title>
	<!--[if IE]>
      <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
	
	<script src="build/jquery-1.11.1.min.js"></script>
	<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
	<script type='text/javascript'>
		$(document).ready(function(){
	  $.ajax({
		url: "utils/repertoire.php",
		dataType:'JSON',
		type:"POST",
		data:{repertoire:""},
		success:function(data){	
		 var webPath=getWebPath();
		 webPath=webPath+"/view.php?realname=";
		 $(data).each(function(){
			var html="<tr><td>"+this+"</td><td>"+webPath+this+"</td></tr>";
			$("#table").append(html);
		 })
		}
	});
	});
	
	function getWebPath(){
        var strFullPath=window.document.location.href; 
        var strPath=window.document.location.pathname; 
        var pos=strFullPath.indexOf(strPath); 
        var prePath=strFullPath.substring(0,pos); 
        var postPath=strPath.substring(0,strPath.substr(1).indexOf('/')+1); 
        return(prePath+postPath); 
    }

	</script>
	<style>
	body { 
    width: 70%; margin: 40px auto 5px; background: #91c7ff; 
    padding: 8px;
    background: #ECECEC;
	-webkit-border-radius: 16px;
	-moz-border-radius: 16px;
	}
	</style>
</head>

<body>
 <div class="container">
	<div class="row">
	  <h2>Pages créées</h2>
	  <br>
	  <div>
		<table class="table" id="table">
		<tr>
			<th>Nom de video</th>
			<th>lien de video</th>
		<tr>
		</table>
	  </div>
	</div>
</div>
</div>	

</body>

</html>