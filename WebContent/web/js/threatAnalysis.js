var domainText = getDomain();

var rowCount = 1;
var tableRowCount=1;
var threatIDresult;

function goToNextStep(){
	location.href="./riskAssessments.html"
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

function checkCAPEC()
{
	var param = "capecID=CAPEC_" + $("#tbCAPEC").val();
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/arcinfo/select_CAPECID.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		$("#tbResultCAPEC").val(v["capecName"]);
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

function checkCVE()
{
	var param = "cveID=CVE_" + $("#tbCVE").val();
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/arcinfo/select_CVEID.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		$("#tbResultCVE").val(v["cveName"]);
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

function checkCWE()
{
	var param = "cweID=CWE_" + $("#tbCWE").val();
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/arcinfo/select_CWEID.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		$("#tbResultCWE").val(v["cweName"]);
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

function get_chked_values(){
	var chked_val = "";
	$(":checkbox[name='cbMGoal']:checked").each(function(pi,po){
	chked_val += ","+po.value;
	});
	if(chked_val!="")chked_val = chked_val.substring(1);
	return chked_val;
}

function clearDiv(){
	var html="";
	$("#AssetType1 option:eq(0)").prop("selected", true);
	$("#taMActivityDescription").val("");
	$("#tbCAPEC").val("");
	$("#tbCVE").val("");
	$("#tbCWE").val("");
	$("#tbResultCAPEC").val("");
	$("#tbResultCWE").val("");
	$("#tbResultCVE").val("");
	$("#AssetType2").html(html);
	$("input[name=cbMGoal]").prop("checked", false);
}



function saveAndAddData(){
	if ( $("#AssetType2 option:selected").val() == null || get_chked_values() == ""){
		alert("You must fill the blank marked with *. \n *가 표시된 항목은 반드시 채워주세요.");
		return false;
	}
	
	if ($("#tbResultCAPEC").val() == "" && $("#tbResultCVE").val() == "" &&$("#tbResultCWE").val() == ""){
		alert("You must check at least one Malicious Concept . \n CVE, CWE, CAPEC 중 최소한 하나를 지정해 주세요.");
		return false;
	}
	subThreatActInfo();
	var html = '';
	html += '<tr>';
	html += '<td id = "tdMActSeqNum'+tableRowCount+'">'+tableRowCount+ '</td>';
	html += '<td id = "tdMActSeqNum'+tableRowCount+'">'+$("#AssetType2 option:selected").val();+ '</td>';
	html += '<td id = "tdMActGoal'+tableRowCount+'">'+ get_chked_values() + '</td>';
	if($("#tbResultCAPEC").val() != ""){
		html += '<td id = "tdCAPECID'+tableRowCount+'">CAPEC_'+ $("#tbCAPEC").val() + '</td>';
		html += '<td id = "tdCAPECName'+tableRowCount+'">'+ $("#tbResultCAPEC").val() + '</td>';
	}else{
		html += '<td id = "tdCAPECID'+tableRowCount+'"></td>';
		html += '<td id = "tdCAPECName'+tableRowCount+'"></td>';
	}
	if($("#tbResultCVE").val() != ""){
		html += '<td id = "tdCVEID'+tableRowCount+'">CVE_'+ $("#tbCVE").val() + '</td>';
		html += '<td id = "tdCVEName'+tableRowCount+'">'+ $("#tbResultCVE").val() + '</td>';
	}else{
		html += '<td id = "tdCVEID'+tableRowCount+'"></td>';
		html += '<td id = "tdCVEName'+tableRowCount+'"></td>';
	}
	if($("#tbResultCWE").val() != ""){
		html += '<td id = "tdCWEID'+tableRowCount+'">CWE_'+ $("#tbCWE").val() + '</td>';
		html += '<td id = "tdCWEName'+tableRowCount+'">'+ $("#tbResultCWE").val() + '</td>';
	}else{
		html += '<td id = "tdCWEID'+tableRowCount+'"></td>';
		html += '<td id = "tdCWEName'+tableRowCount+'"></td>';
	}
	html += '<td id = "tdMActDescription'+tableRowCount+'">'+ $("#taMActivityDescription").val() + '</td>';
	html += '</tr>';
	$("#resultMActTable").append(html);
	tableRowCount = tableRowCount+1;
	clearDiv();
}

function subThreatActInfo(){
	var param = "threatactThreatID=" + $("#tbThreatNewID").val() +
	"&threatactASID=" + $("#AssetType2 option:selected").val() +
	"&threatactMGoal=" + get_chked_values() +
	"&threatactActDescription=" + $("#taMActivityDescription").val();
	if($("#tbResultCAPEC").val() != "") param += "&threatactCAPEC=CAPEC_"+ $("#tbCAPEC").val();
	else param += "&threatactCAPEC=";
	if($("#tbResultCVE").val() != "") param += "&threatactCVE=CVE_"+ $("#tbCVE").val();
	else param += "&threatactCVE=";
	if($("#tbResultCWE").val() != "") param += "&threatactCWE=CWE_"+ $("#tbCWE").val();
	else param += "&threatactCWE=";
	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/arcinfo/submit_ThreatactInfo.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		alert("Success to register the data. \n 성공적으로 등록하였습니다.. ");
            	}
            	if(k=="fail"){
            		alert("Fail to register threat data. \n Threat 정보를 저장하는데 실패하였습니다.");
            		return false;
            	}
        	});
        },
        error: function(){
        	alert("Fail to access the server \n 서버 연결 실패");
        	return false;
        }
    });
}



function submitThreatInfo()
{
	var param = "threatName=" + $("#tbThreatNewName").val() +
		"&threatDescription=" + $("#taThreatDescription").val() + 
		"&threatUserID=" + implement_pbkdf2(sessionStorage.getItem("SRClient.id"))+
		"&threatID=TH_" + sessionStorage.getItem("SRClient.company")+"_";
	var threatPlatformResult = "";
	for (var i=1 ; i<rowCount+1 ; i++){
		threatPlatformResult += $("#platformID" + i).text() + ",";
	}
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/arcinfo/submit_ThreatInfo.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		$("#tbThreatNewID").val(v);
            		var param1 = "threatplThreatID=" + $("#tbThreatNewID").val() +"&threatplPlatformID=" + threatPlatformResult;
            		$.ajax({
            	        type: "POST",
            	        url: "http://" + domainText + "/SRserver/arcinfo/submit_ThreatPlatformInfo.do",
            	        callback:"callbak",
            			dataType: "jsonp",
            			data:param1,	
            			success:
            				function(data){
            	        	$.each(data, function(k,v){
            	            	if(k=="success"){
            	            		$("#threatActivityForm").show();
            	            		alert("Success to register the data. \n 성공적으로 등록하였습니다.. ");
            	            	}
            	            	if(k=="fail"){
            	            		alert("Fail to register threat data. \n Threat 정보를 저장하는데 실패하였습니다.");
            	            	}
            	        	});
            	        },
            	        error: function(){
            	        	alert("Fail to access the server \n 서버 연결 실패");
            	        	return false;
            	        }
            	    });
            		
            	}
            	if(k=="fail"){
            		alert("Fail to register threat data. \n Threat 정보를 저장하는데 실패하였습니다.");
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