<?php

// Note: This is a demo only. Don't store emails
// in a text file like this on a real site!

$fp = fopen ('story.js', 'w');
fwrite ($fp, "_s[0] = [
	{a:'bg_fade_in'}];");
fclose ($fp);

$fp = fopen ('story.js', 'a');
fwrite ($fp, "\n");

$tableData=json_decode($_POST["tabledata"]);
$type=$_POST["type"];
$rows=$tableData->rows;

if($type=="inputText"){
	foreach($rows as $row){
	 $write="_s[".$row->time."]=[{a:'input_text', d:{msg:\"";
	 $write.=$row->msg;
	 $write.="\",thanks:\"Thanks for your input\",
		save_to: 'save_input.php',jump_to:";
	 $write.=$row->jumpTo."}},
		{a:'pause'}]; \n";
	 fwrite ($fp,$write);
	}
	fclose ($fp);
}else if($type=="QCM"){
	$options=$tableData->options;
	$nb=count($options);
	$write="_s[".$rows[0]->time."]=[{a:'input_branching', d:{msg:\"";
	$write.=$rows[0]->msg;
	$write.="\",options:[";
	$i=0;
	while($i<$nb-1){
		$write.="{choice:\"".$options[$i]->option."\",jump_to:".$options[$i]->jumpTo."},";
		$i++;
	}
	$write.="{choice:\"".$options[$i]->option."\",jump_to:".$options[$i]->jumpTo."}]}},{a:'pause'}];\n";
	fwrite ($fp,$write);
	fclose ($fp);
}
?>