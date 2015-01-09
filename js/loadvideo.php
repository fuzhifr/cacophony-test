<?php

$fp = fopen ('videopath.js', 'a');
$path=$_POST["inputPathTxt"];
fwrite ($fp,$path);
fclose ($fp);


?>