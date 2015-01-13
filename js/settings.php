<?php

// Note: This is a demo only. Don't store emails
// in a text file like this on a real site!

$realname=$_POST["realname"];

$filename='StoryFile/story'.$realname.'.js';
$fp= fopen ($filename, 'w');
fwrite ($fp, "_s[0] = [
	{a:'bg_fade_in'}];");
fclose ($fp);

$fp = fopen ($filename, 'a');
fwrite ($fp, "\n");

$text=json_decode($_POST["textJson"]);
writeText($text,$fp);

$inputText=json_decode($_POST["inputTextJson"]);
writeInputText($inputText,$fp);

$qcm=json_decode($_POST["qcmJson"]);
writeQCM($qcm,$fp);

fclose ($fp);

function writeText($text,$fp){
	$textRows=$text->rows;

	foreach($textRows as $row){
	 $write="_s[".$row->time."]=[{a:'lyrics', d:{txt:\"";
	 $write.=$row->msg."\",x: 100, y: 100,
	 colour:'rgba(0, 0, 0, 1)' }}];\n";
	 fwrite ($fp,$write);
	}
}

function writeInputText($inputText,$fp){
	
	$inputTextRows=$inputText->rows;

	foreach($inputTextRows as $row){
	 $write="_s[".$row->time."]=[{a:'input_text', d:{msg:\"";
	 $write.=$row->msg;
	 $write.="\",thanks:\"Thanks for your input\",
		save_to: 'save_input.php',jump_to:";
	 $write.=$row->jumpTo."}},
		{a:'pause'}]; \n";
	 fwrite ($fp,$write);
	}
}

function writeQCM($qcm,$fp){
	
$qcmRows=$qcm->rows;	
    foreach($qcmRows as $row){
		// pour tous les rows
		$options=$row->options;
		print_r($options);
		$nb=count($options);
		$write="_s[".$row->time."]=[{a:'input_branching', d:{msg:\"";
		$write.=$row->msg;
		$write.="\",options:[";
		$i=0;
		while($i<$nb-1){
			$write.="{choice:\"".$options[$i]->option."\",jump_to:".$options[$i]->jumpTo."},";
			$i++;
		}
		$write.="{choice:\"".$options[$i]->option."\",jump_to:".$options[$i]->jumpTo."}]}},{a:'pause'}];\n";
		fwrite ($fp,$write);
	}
}
?>