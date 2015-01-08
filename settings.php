<?php

// Note: This is a demo only. Don't store emails
// in a text file like this on a real site!
$word="hello";
$fp = fopen ('storyTest.js', 'a');
fwrite ($fp, $word);
fclose ($fp);
echo("<script>console.log('hello');</script>");
?>