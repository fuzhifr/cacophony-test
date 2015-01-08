
// function submit les datas
function submitForm(){

	var inputTextData={};
	var rows=[];
	
	var inputTable=$("tr.inputText");
	$(inputTable).each(function(){
		var i=$(this).attr("id");
		rows.push({"id":i,"time":$("input[id='time"+i+"']").val(),"msg":$("input[id='msg"+i+"']").val(),"jumpTo":$("input[id='jumpTo"+i+"']").val()});
	});
	inputTextData.rows=rows;
	var inputTextJson=JSON.stringify(inputTextData);
	console.log(inputTextJson);

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
	var qcmJson=JSON.stringify(qcmData);
	console.log(qcmJson);
	
	// envoyer tous les datas a  settings.php
	$.ajax({
		url: "js/settings.php",
		dataType:'JSON',
		type:"POST",
		data:{qcmJson:qcmJson,inputTextJson:inputTextJson},
		success:function(data){	
		console.log(data);
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
//nombre de Question
var nbQCM=0;
//nombre de options par un QCM
var nbOptions=0;
// noter les qcm
var arrayQCM=[];
//numero inputText
var nInputText=0;
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