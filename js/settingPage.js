
// function submit les datas
function submitForm(){

	var textData=getText();
	var textJson=JSON.stringify(textData);
	console.log(textJson);
	
	var buttonData=getJumpButton();
	var buttonJson=JSON.stringify(buttonData);
	console.log(buttonJson);
	
	var inputTextData=getInputText();
	var inputTextJson=JSON.stringify(inputTextData);
	console.log(inputTextJson);
	
	var qcmData=getQCM();
	var qcmJson=JSON.stringify(qcmData);
	console.log(qcmJson);
	
	// envoyer tous les datas a  settings.php
	$.ajax({
		url: "js/settings.php",
		dataType:'JSON',
		type:"POST",
		data:{qcmJson:qcmJson,buttonJson:buttonJson,inputTextJson:inputTextJson,textJson:textJson,realname:realname},
		success:function(data){	
		console.log(data);
		window.location.href="view.html?realname="+realname;
		}
	});
}
function getText(){
	var textData={};
	var rows=[];
	
	var textTable=$("tr.text");
	$(textTable).each(function(){
		var i=$(this).attr("id");
		rows.push({"id":i,"time":$("input[id='timeText"+i+"']").val(),"msg":$("input[id='msgText"+i+"']").val()});
	});
	textData.rows=rows;
	return textData;
}

function getJumpButton(){
	var buttonData={};
	var rows=[];
	
	var textTable=$("tr.jumpButton");
	$(textTable).each(function(){
		var i=$(this).attr("id");
		rows.push({"id":i,"time":$("input[id='timeButton"+i+"']").val(),"label":$("input[id='label"+i+"']").val(),"jumpTo":$("input[id='jumpToButton"+i+"']").val()});
	});
	
	var chapitreTable=$("tr.chapitre");
	$(chapitreTable).each(function(){
		var i=$(this).attr("id");
		rows.push({"id":i,"label":$("input[id='msgChapitre"+i+"']").val(),"jumpTo":$("input[id='jumpToChapitre"+i+"']").val()});
	});
	
	buttonData.rows=rows;
	return buttonData;
	
}
// get QCM table data
function getQCM(){
// recupere data de QCM ------------
	var qcmData={};
	// rows pour tous les QCM
	var rows=[];
	// options pour un QCM
	var options=[];
	
	// ajoute tous les QCM
	for(var j=0; j<arrayQCM.length;j++){
	var _len=$("tr."+arrayQCM[j]).length;
	var options=[];
		for(var i=1;i<=_len;i++){
			options.push({"option":$("input[id='option"+arrayQCM[j]+i+"']").val(),"jumpTo":$("input[id='jumpTo"+arrayQCM[j]+i+"']").val()});
		}
		rows.push({"id":arrayQCM[j],"time":$("input[id='time"+arrayQCM[j]+"']").val(),"msg":$("input[id='msg"+arrayQCM[j]+"']").val(),"options":options});
	}
	qcmData.rows=rows;
	return qcmData;
}

// get Input Text Table data
function getInputText(){
	var inputTextData={};
	var rows=[];
	
	var inputTable=$("tr.inputText");
	$(inputTable).each(function(){
		var i=$(this).attr("id");
		rows.push({"id":i,"time":$("input[id='time"+i+"']").val(),"msg":$("input[id='msg"+i+"']").val(),"jumpTo":$("input[id='jumpTo"+i+"']").val()});
	});
	inputTextData.rows=rows;
	return inputTextData;
}

//nombre de Question
var nbQCM=0;
//nombre de options par un QCM
var nbOptions=0;
// noter les qcm
var arrayQCM=[];
//numero inputText
var nInputText=0;
//numero Text
var nText=0;
//numero jump button
var nJump=0;
//numero chapitre
var nChapitre=0;

//ajouter un text
function AddText(){
	nText+=1;
  $("#textTable").append("<tr id="+nText+" class='text' align='center'>"
                                +"<td><input type='checkbox' name='text'/></td>"
                                +"<td><input type='text' name='timeText"+nText+"' id='timeText"+nText+"' size='5'/></td>"
								+"<td><input type='text' name='msgText"+nText+"' id='msgText"+nText+"' /></td>"	
						+"</tr>");  
}

//delete un text 
function deleteText(){ 
	var checked = $("input[type='checkbox'][name='text']"); 
	$(checked).each(function(){ 
		if($(this).attr("checked")==true)
		{ 
			$(this).parent().parent().remove(); 
		} 
	}); 
} 

// ajouter une chapitre
function AddChapitre(){ 
	nChapitre+=1;
  $("#chapitreTable").append("<tr id="+nChapitre+" class='chapitre' align='center'>"
                                +"<td><input type='checkbox' name='chapitre'/></td>"
								+"<td><input type='text' name='jumpToChapitre"+nChapitre+"' id='jumpToChapitre"+nChapitre+"' size='5' /></td>"
								+"<td><input type='text' name='msgChapitre"+nChapitre+"' id='msgChapitre"+nChapitre+"' /></td>"							
						+"</tr>");     
} 

function DeleteChapitre(){ 
	var checked = $("input[type='checkbox'][name='chapitre']"); 
	$(checked).each(function(){ 
		if($(this).attr("checked")==true)
		{ 
			$(this).parent().parent().remove(); 
		} 
	}); 
} 

// ajouter un jump button
function AddJumpTo(){ 
	nJump+=1;
  $("#buttonTable").append("<tr id="+nJump+" class='jumpButton' align='center'>"
                                +"<td><input type='checkbox' name='jumpButton'/></td>"
								+"<td><input type='text' name='timeButton"+nJump+"' id='timeButton"+nJump+"' size='5' /></td>"
								+"<td><input type='text' name='jumpToButton"+nJump+"' id='jumpToButton"+nJump+"' size='5' /></td>"
								+"<td><input type='text' name='label"+nJump+"' id='label"+nJump+"' /></td>"							
						+"</tr>");     
} 

function DeleteJumpTo(){ 
	var checked = $("input[type='checkbox'][name='jumpButton']"); 
	$(checked).each(function(){ 
		if($(this).attr("checked")==true)
		{ 
			$(this).parent().parent().remove(); 
		} 
	}); 
} 

// ajouter un input text
function AddInputText(){ 
	nInputText+=1;
  $("#inputTable").append("<tr id="+nInputText+" class='inputText' align='center'>"
                                +"<td><input type='checkbox' name='inputText'/></td>"
                                +"<td><input type='text' name='time"+nInputText+"' id='time"+nInputText+"' size='5'/></td>"
								+"<td><input type='text' name='jumpTo"+nInputText+"' id='jumpTo"+nInputText+"' size='5' /></td>"
								+"<td><input type='text' name='msg"+nInputText+"' id='msg"+nInputText+"' /></td>"							
						+"</tr>");     
} 

function deleteInputText(){ 
	var checked = $("input[type='checkbox'][name='inputText']"); 
	$(checked).each(function(){ 
		if($(this).attr("checked")==true)
		{ 
			$(this).parent().parent().remove(); 
		} 
	}); 
} 

//ajouter un option pour un QCM 
function AddOption(){ 
   nbOptions+=1;
  $("#optionsTable").append("<tr id="+nbQCM+nbOptions+" class='Q"+nbQCM+"' align='center'>"
                                +"<td></td>"
								+"<td></td>"
                                +"<td></td>"
								+"<td><input type='text'  name='optionQ"+nbQCM+nbOptions+"' id='optionQ"+nbQCM+nbOptions+"' /></td>"				
								+"<td><input type='text'  name='jumpToQ"+nbQCM+nbOptions+"' id='jumpToQ"+nbQCM+nbOptions+"' size='5' /></td>"									
						+"</tr>");     
 
} 
function deleteOption(){ 
    var checked = $("input[type='checkbox'][name='QCM']"); 
	$(checked).each(function(){ 
		if($(this).attr("checked")==true)
		{ 
			var trClass=$(this).parent().parent().attr("class");
			var qcmCheck=$("tr."+trClass);
			$(qcmCheck).each(function(){
				$(this).remove();
			});
			
			for(var i=0;i<arrayQCM.length;i++){
				if(arrayQCM[i]==trClass){
				 arrayQCM.splice(i,1);
				 console.log("arrayQCM : "+arrayQCM);
				}
			}
		} 
	}); 
} 
// ajouter un QCM
function AddQCM(){ 
 nbQCM+=1;
 arrayQCM.push("Q"+nbQCM);
 console.log("arrayQCM : "+arrayQCM)
 nbOptions=1;
  $("#optionsTable").append("<tr id="+nbQCM+nbOptions+" class='Q"+nbQCM+"' align='center'>"
                                +"<td><input type='checkbox' name='QCM' /></td>"
								+"<td><input type='text'  name='timeQ"+nbQCM+"' id='timeQ"+nbQCM+"' size='5'/></td>"
                                +"<td><input type='text'  name='msgQ"+nbQCM+"' id='msgQ"+nbQCM+"' /></td>"
								+"<td><input type='text'  name='optionQ"+nbQCM+nbOptions+"' id='optionQ"+nbQCM+nbOptions+"' /></td>"				
								+"<td><input type='text'  name='jumpToQ"+nbQCM+nbOptions+"' id='jumpToQ"+nbQCM+nbOptions+"' size='5' /></td>"								
						+"</tr>");  
  						
} 