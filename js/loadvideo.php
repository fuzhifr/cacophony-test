<?php

$fp = fopen ('videopath.js', 'w');
$path=$_POST["inputPathTxt"];
$write="var path=\"".$path."\";";
fwrite ($fp,$write);
fclose ($fp);


?>