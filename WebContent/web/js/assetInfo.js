var domainText = getDomain();

var rowCount = 1;
// Asset의 대분류에 따라 Asset의 세부분류 정보 가져오기
function loadAssetInfoPage(){
	if (check_session()=="RL") 	location.href="../main.html";
	member_load();
	
	var param = "relatedshUserID="+implement_pbkdf2(sessionStorage.getItem("SRClient.id"));
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/arcinfo/bring_StakeholderInfo.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		var html = '';
					$.each(v, function(l,m){
                  		html += '<input type="checkbox" name="chkSHList" id="chk_info" value="'+m["relatedshID"]+'">' + m["relatedshName"] + '</input></br>';
                	});
            		$("#RelatedSTakeholdersInfo").html(html);
            		alert("Success to get the data. \n 성공적으로 가져왔습니다. ");
            		
            	}
            	if(k=="fail"){
            		alert("Fail to submit. \n 등록에 실패하였습니다.");
            	}
        	});
        },
        error: function(){
        	alert("Fail to access the server \n 서버 연결 실패");
        	return false;
        }
    });
    return true;
	
}

function selectSubAssetType()
{
	var param = "assetType=" + $("#AssetType1 option:selected").val();
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/arcinfo/select_AssetType.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		var html = '';
					$.each(v, function(l,m){
                  		html += '<option value="' + m["assetID"] + '">'+m["assetName"]+'</option>';
                	});
            		$("#AssetType2").html(html);
            		alert("Success to get the data. \n 성공적으로 가져왔습니다. ");
            	}
            	if(k=="fail"){
            		alert("Fail to get the data. \n 정보를 가져오는데에 실패하였습니다.");
            	}
        	});
        },
        error: function(){
        	alert("Fail to access the server \n 서버 연결 실패");
        	return false;
        }
    });
    return true;
}
// Security Goal을 계산하기 위한 로직 
function goalCalculating(resultM, resultP, resultR){
	var resultSGoal;
	if (resultM == "C" || resultP =="C" || resultR =="C"){
		if (resultM == "C" && resultP =="C" && resultR =="C") return resultSGoal = "C";
		if (resultM == "C" && resultP =="C") return resultSGoal = "RMRP";
		if (resultM == "C" && resultR =="C") return resultSGoal = "RMRR";
		if (resultP == "C" && resultR =="C") return resultSGoal = "RPRR";
		if (resultM == "C") return resultSGoal = "RM";
		if (resultP == "C") return resultSGoal = "RP";
		if (resultR == "C") return resultSGoal = "RR";
	}else if (resultM == "R" || resultP =="R" || resultR =="R"){
		return resultSGoal = "R";
	}else{
		return resultSGoal = "N";
	}	
}
// Security Goal 계산을 위해 데이터를 각 Row로 부터 가져오고 결과값을 나타내느 로직
function calculatingCSgoal(){
	var resultM = $("#monitoringConfidentiality option:selected").val();
	var resultP = $("#preventingConfidentiality option:selected").val();
	var resultR = $("#RecoveryConfidentiality option:selected").val();
	var resultCSgoal = goalCalculating(resultM, resultP, resultR);
	$("#ConfidentialitySecurityGoal").text(resultCSgoal); 
}
function calculatingISgoal(){
	var resultM = $("#monitoringIntegrity option:selected").val();
	var resultP = $("#preventingIntegrity option:selected").val();
	var resultR = $("#RecoveryIntegrity option:selected").val();
	var resultCSgoal = goalCalculating(resultM, resultP, resultR);
	$("#IntegritySecurityGoal").text(resultCSgoal); 
}
function calculatingASgoal(){
	var resultM = $("#monitoringAvailability option:selected").val();
	var resultP = $("#preventingAvailability option:selected").val();
	var resultR = $("#RecoveryAvailability option:selected").val();
	var resultCSgoal = goalCalculating(resultM, resultP, resultR);
	$("#AvailabilitySecurityGoal").text(resultCSgoal); 
}

function showPlatformID(rowData)
{
	var param = "platformPart=" + $("#tbPlatformPart" + rowData).val()
	+"&platformVendor=" + $("#tbPlatformVendor" + rowData).val()
	+"&platformProduct=" + $("#tbPlatformProduct" + rowData).val()
	+"&platformVersion=" + $("#tbPlatformVersion" + rowData).val()
	+"&platformUpdate=" + $("#tbPlatformUpdate" + rowData).val()
	+"&platformEdition=" + $("#tbPlatformEdition" + rowData).val()
	+"&platformLanguage=" + $("#tbPlatformLanguage" + rowData).val()
	+"&platformSoftwareEdition=" + $("#tbsoftwareEdition" + rowData).val()
	+"&platformTargetSoftware=" + $("#tbTargetSoftware" + rowData).val()
	+"&platformTargetHardware=" + $("#tbTargetHardware" + rowData).val()
	+"&platformOther=" + $("#taOther" + rowData).val();
	
	if ( $("#tbPlatformPart" + rowData).val() == "" || $("#tbPlatformVendor" + rowData).val() == "" || $("#tbPlatformProduct"+rowData).val() == "" )
	{
		alert("You must fill the blank marked with *. \n *가 표시된 항목은 반드시 채워주세요.");
		return false;
	}

	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/arcinfo/select_PlatformInfo.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		alert("Success to bring the data. \n 데이터를 성공적으로 가져왔습니다.");
            		$("#btshowplatform"+ rowData).hide();
            		$("#platformID"+ rowData).text(v);
            	}
            	if(k=="fail"){
            		alert("There is no related information. Please make sure to input the platform data. \n 관련 정보가 없습니다. 플랫폼 정보 입력에서 한번더 확인해 주세요.");
            	}
        	});
        },
        error: function(){
        	alert("Fail to access the server \n 서버 연결 실패");
        	return false;
        }
    });
    return true;
}

function addRow(){
	rowCount = rowCount+1;
	var html = '';
	html += '<tr>';
	html += '<td style="border:1px solid silver;text-align:center;padding-right:8px;padding-left:8px">'+rowCount+ '</td>'
	html += '<td style="border:1px solid silver;text-align:center;padding-right:8px;padding-left:8px"><input style="width:100%" type="text" id="tbPlatformPart'+rowCount+'" /></td>';
	html += '<td style="border:1px solid silver;text-align:center;padding-right:8px;padding-left:8px"><input style="width:100%" type="text" id="tbPlatformVendor'+rowCount+'" /></td>';
	html += '<td style="border:1px solid silver;text-align:center;padding-right:8px;padding-left:8px"><input style="width:100%" type="text" id="tbPlatformProduct'+rowCount+'" /></td>';
	html += '<td style="border:1px solid silver;text-align:center;padding-right:8px;padding-left:8px"><input style="width:100%" type="text" id="tbPlatformVersion'+rowCount+'" value = "*"/></td>';
	html += '<td style="border:1px solid silver;text-align:center;padding-right:8px;padding-left:8px"><input style="width:100%" type="text" id="tbPlatformUpdate'+rowCount+'" value = "*"/></td>';
	html += '<td style="border:1px solid silver;text-align:center;padding-right:8px;padding-left:8px"><input style="width:100%" type="text" id="tbPlatformEdition'+rowCount+'" value = "*"/></td>';
	html += '<td style="border:1px solid silver;text-align:center;padding-right:8px;padding-left:8px"><input style="width:100%" type="text" id="tbPlatformLanguage'+rowCount+'" value = "*"/></td>';
	html += '<td style="border:1px solid silver;text-align:center;padding-right:8px;padding-left:8px"><input style="width:100%" type="text" id="tbsoftwareEdition'+rowCount+'" value = "*"/></td>';
	html += '<td style="border:1px solid silver;text-align:center;padding-right:8px;padding-left:8px"><input style="width:100%" type="text" id="tbTargetSoftware'+rowCount+'" value = "*"/></td>';
	html += '<td style="border:1px solid silver;text-align:center;padding-right:8px;padding-left:8px"><input style="width:100%" type="text" id="tbTargetHardware'+rowCount+'" value = "*"/></td>';
	html += '<td style="border:1px solid silver;text-align:center;padding-right:8px;padding-left:8px"><input style="width:100%" type="text" id="taOther'+rowCount+'" value = "*"/></td>';
	html += '<td style="border:1px solid silver;text-align:center;padding-right:8px;padding-left:8px" id="platformID'+rowCount+'"><input style="width:100%" type="button" value="platformID" id = "btshowplatform'+rowCount+'" onclick = "showPlatformID('+rowCount+')"/></td>';
	html += '</tr>';
	$("#platformTable").append(html);
}

function get_chked_values(){
	var chked_val = "";
	$(":checkbox[name='chkSHList']:checked").each(function(pi,po){
	chked_val += ","+po.value;
	});
	if(chked_val!="")chked_val = chked_val.substring(1);
	return chked_val;
}

function submitAssetInfo(){
	var domainAssetID;
	var param = "domainasName=" + $("#tbAssetName").val()
	+"&domainasID=" + $("#AssetType2 option:selected").val() + "_" + sessionStorage.getItem("SRClient.company") + "_"
	+"&domainasUserID=" + implement_pbkdf2(sessionStorage.getItem("SRClient.id"))
	+"&domainasCriticality=" + $("#AssetCriticality option:selected").val()
	+"&domainasDescription=" + $("#taAssetDescription").val()
	+"&domainasSGoalC=" + $("#ConfidentialitySecurityGoal").text()
	+"&domainasSGoalI=" + $("#IntegritySecurityGoal").text()
	+"&domainasSGoalA=" + $("#AvailabilitySecurityGoal").text();	
	var param1;
	if ($("#tbAssetName").val() == "" || $("#AssetType2 option:selected").val() == null || $("#AssetCriticality option:selected").val() == "0" ||$("#ConfidentialitySecurityGoal").text() == ""||$("#IntegritySecurityGoal").text()==""|| $("#AvailabilitySecurityGoal").text()=="")
	{
		alert("You must fill the whole blank. \n 모든 항목은 반드시 채워주세요.");
		return false;
	}
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/arcinfo/submit_DomainAssetInfo.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		// 비동기 방식으로 작동하지 않도록 Success 확인 이후 다음 단계 진행(플랫폼 정보와 Stakeholder정보 입력)
            		domainAssetID = v;
            		var checkboxValue = get_chked_values();
            		var domainAssetPlatformID="";
            		param1 = "domainasplDomainasID="+ domainAssetID + "&domainasplPlatformID="
            		for (var i=1 ; i<rowCount+1 ; i++){
            			domainAssetPlatformID += $("#platformID" + i).text() + ",";
            			alert(domainAssetPlatformID);
            		}
            		param1 += domainAssetPlatformID;
            		param1 += "&domainasrelatedshDomainasID="+domainAssetID + "&domainasrelatedshRelatedshID="+checkboxValue;
            		$.ajax({
            	        type: "POST",
            	        url: "http://" + domainText + "/SRserver/arcinfo/submit_DomainAssetPLSHInfo.do",
            	        callback:"callbak",
            			dataType: "jsonp",
            			data:param1,	
            			success:
            				function(data){
            	        	$.each(data, function(k,v){
            	            	if(k=="success"){
            	            		alert("Success to register asset information. \n 데이터를 성공적으로 등록했습니다..");
            	            		
            	            	}
            	            	if(k=="fail"){
            	            		alert("Fail to register asset information. \n Asset 정보를 등록하는데 실패했습니다. .");
            	            	}
            	        	});
            	        },
            	        error: function(){
            	        	alert("Fail to access the server \n 서버 연결 실패");
            	        	return false;
            	        }
            	    });
            		//location.href="./assetInfo.html";
            	}
            	if(k=="fail"){
            		alert("Fail to register asset information. \n Asset 정보를 등록하는데 실패했습니다.");
            	}
        	});
        },
        error: function(){
        	alert("Fail to access the server \n 서버 연결 실패");
        	return false;
        }
    });
    
}

