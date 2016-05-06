var domainText = getDomain();

var rowCount = 1;

function goForRecommendingCM(){
	location.href="./srSpecification.html"
}

function selectSubAssetType()
{
	if ($("#AssetType1 option:selected").val() == "0"){
		alert ("Please select the asset type! \n 자산의 종류를 반드시 지정해 주세요!");
		return false;
		
	}
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

function selectDomainAsset(){
	var param = "domainasID=" + $("#AssetType2 option:selected").val()+"_" + sessionStorage.getItem("SRClient.company") +  
		"&domainasUserID=" + implement_pbkdf2(sessionStorage.getItem("SRClient.id"));
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/risk/select_DomainAssetID.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		var html = '';
					$.each(v, function(l,m){
                  		html += '<option value="' + m["domainasID"] + '">'+m["domainasName"]+'</option>';
                  	});
				
            		$("#AssetType3").html(html);
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

function findThreatByName(){
	if ($("#tbThreatName").val() == ""){
		alert("Please write down the threat name. \n 위협의 이름을 반드시 적어주세요.")
		return false;
	}
	
	var param = "threatName=" + $("#tbThreatName").val();
	$.ajax({
	    type: "POST",
	    url: "http://" + domainText + "/SRserver/risk/select_ThreatID.do",
	    callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
	    	$.each(data, function(k,v){
	        	if(k=="success"){
	        		var html = '';
					$.each(v, function(l,m){
	              		html += '<option value="' + m["threatID"] + '">'+ m["threatID"] + ' : ' + m["threatName"] + '</option>';
	              	});
				
	        		$("#sbThreatID").html(html);
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


function calculatingCM(){
	if ($("#AssetType3 option:selected").val() == "0" || $("#sbThreatID option:selected").val() == "0"){
		alert("Please select the threat and asset. \n 자산과 위협을 반드시 지정해 주세요.");
		return false;
	}
	
	var param = "domainasID=" + $("#AssetType3 option:selected").val() 
		+ "&asID=" + $("#AssetType2 option:selected").val()
		+ "&threatactThreatID=" + $("#sbThreatID option:selected").val()
		+ "&domainCompany=" + sessionStorage.getItem("SRClient.company")
		+ "&UserID=" + implement_pbkdf2(sessionStorage.getItem("SRClient.id"));

	$.ajax({
	    type: "POST",
	    url: "http://" + domainText + "/SRserver/risk/calculate_RiskFactor.do",
	    callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
	    	$.each(data, function(k,v){
	        	if(k=="success"){
	        		var html = '';
	        		$.each(v, function(l,m){
	        			var mIntentIndex;
	        			if (m["risktemplateDomainasCriticality"] == "H") html += '<tr class="danger">';
	        			else if (m["risktemplateDomainasCriticality"] == "M")html += '<tr class="success">';
	        			else html += '<tr>';
	        			html += '<td id="tdDomainasID' +rowCount+ '">' + m["risktemplateDomainasID"] + '</td>';
	        			html += '<td id="tdDomainasName' +rowCount+ '">' + m["risktemplateDomainasName"] + '</td>';
	        			html += '<td id="tdSGoalC' +rowCount+ '">' + m["risktemplateDomainasSGoalC"] + '</td>';
	        			html += '<td id="tdSGoalI' +rowCount+ '">' + m["risktemplateDomainasSGoalI"] + '</td>';
	        			html += '<td id="tdSGoalA' +rowCount+ '">' + m["risktemplateDomainasSGoalA"] + '</td>';
	        			html += '<td id="tdThreatID' +rowCount+ '">' + $("#sbThreatID option:selected").val() + '</td>';
	        			html += '<td id="tdCAPEC' +rowCount+ '">' + m["risktemplateThreatCAPEC"] + '</td>';
	        			html += '<td id="tdCVE' +rowCount+ '">' + m["risktemplateThreatCVE"] + '</td>';
	        			html += '<td id="tdCWE' +rowCount+ '">' + m["risktemplateThreatCWE"] + '</td>';
	        			switch (m["risktemplateThreatMGoal"]){
	        			case "E" : 
	        				html += '<td>V</td><td></td><td></td>';
	        				break;
	        			case "M" : 
	        				html += '<td></td><td>V</td><td></td>';
	        				break;
	        			case "D" : 
	        				html += '<td></td><td></td><td>V</td>';
	        				break;
	        			case "E,M" : 
	        				html += '<td>V</td><td>V</td><td></td>';
	        				break;
	        			case "E,D" : 
	        				html += '<td>V</td><td></td><td>V</td>';
	        				break;
	        			case "M,D" : 
	        				html += '<td></td><td>V</td><td>V</td>';
	        				break;
	        			case "E,D,M" : 
	        				html += '<td>V</td><td>V</td><td>V</td>';
	        				break;
	        			}
	        			
	        			html += '<td>' + m["risktemplateCMstatesCMID"] + '</td>';
	        			html += '<td>' + m["risktemplateCMstatesCPID"] + '</td>';
	        			html += '<td>' + m["risktemplateCMstatesCRID"] + '</td>';
	        			html += '<td>' + m["risktemplateCMstatesIMID"] + '</td>';
	        			html += '<td>' + m["risktemplateCMstatesIPID"] + '</td>';
	        			html += '<td>' + m["risktemplateCMstatesIRID"] + '</td>';
	        			html += '<td>' + m["risktemplateCMstatesAMID"] + '</td>';
	        			html += '<td>' + m["risktemplateCMstatesAPID"] + '</td>';
	        			html += '<td>' + m["risktemplateCMstatesARID"] + '</td>';
	        			
	        			switch (m["risktemplateThreatMGoal"]){
	        			case "E" : 
	        				html += '<td>'+calculatingRiskFactor(m["risktemplateDomainasSGoalC"], m["risktemplateCMstatesCMID"], m["risktemplateCMstatesCPID"], m["risktemplateCMstatesCRID"])+'</td>';
	        				html += '<td></td>';
	        				html += '<td></td>';
	        				break;
	        			case "M" : 
	        				html += '<td></td>';
		        			html += '<td>'+calculatingRiskFactor(m["risktemplateDomainasSGoalI"], m["risktemplateCMstatesIMID"], m["risktemplateCMstatesIPID"], m["risktemplateCMstatesIRID"])+'</td>';
		        			html += '<td></td>';
	        				break;
	        			case "D" : 
	        				html += '<td></td>';
	        				html += '<td></td>';
		        			html += '<td>'+calculatingRiskFactor(m["risktemplateDomainasSGoalA"], m["risktemplateCMstatesAMID"], m["risktemplateCMstatesAPID"], m["risktemplateCMstatesARID"])+'</td>';
	        				break;
	        			case "E,M" : 
	        				html += '<td>'+calculatingRiskFactor(m["risktemplateDomainasSGoalC"], m["risktemplateCMstatesCMID"], m["risktemplateCMstatesCPID"], m["risktemplateCMstatesCRID"])+'</td>';
		        			html += '<td>'+calculatingRiskFactor(m["risktemplateDomainasSGoalI"], m["risktemplateCMstatesIMID"], m["risktemplateCMstatesIPID"], m["risktemplateCMstatesIRID"])+'</td>';
		        			html += '<td></td>';
	        				break;
	        			case "E,D" : 
	        				html += '<td>'+calculatingRiskFactor(m["risktemplateDomainasSGoalC"], m["risktemplateCMstatesCMID"], m["risktemplateCMstatesCPID"], m["risktemplateCMstatesCRID"])+'</td>';
	        				html += '<td></td>';
		        			html += '<td>'+calculatingRiskFactor(m["risktemplateDomainasSGoalA"], m["risktemplateCMstatesAMID"], m["risktemplateCMstatesAPID"], m["risktemplateCMstatesARID"])+'</td>';
	        				break;
	        			case "M,D" : 
	        				html += '<td></td>';
		        			html += '<td>'+calculatingRiskFactor(m["risktemplateDomainasSGoalI"], m["risktemplateCMstatesIMID"], m["risktemplateCMstatesIPID"], m["risktemplateCMstatesIRID"])+'</td>';
		        			html += '<td>'+calculatingRiskFactor(m["risktemplateDomainasSGoalA"], m["risktemplateCMstatesAMID"], m["risktemplateCMstatesAPID"], m["risktemplateCMstatesARID"])+'</td>';
	        				break;
	        			case "E,D,M" : 
	        				html += '<td>'+calculatingRiskFactor(m["risktemplateDomainasSGoalC"], m["risktemplateCMstatesCMID"], m["risktemplateCMstatesCPID"], m["risktemplateCMstatesCRID"])+'</td>';
		        			html += '<td>'+calculatingRiskFactor(m["risktemplateDomainasSGoalI"], m["risktemplateCMstatesIMID"], m["risktemplateCMstatesIPID"], m["risktemplateCMstatesIRID"])+'</td>';
		        			html += '<td>'+calculatingRiskFactor(m["risktemplateDomainasSGoalA"], m["risktemplateCMstatesAMID"], m["risktemplateCMstatesAPID"], m["risktemplateCMstatesARID"])+'</td>';
	        				break;
	        			}
	        			html += '<td  id="tdRecommendation' +rowCount+ '">'+calculatingRecommendations(m["risktemplateThreatMGoal"], m["risktemplateDomainasSGoalC"], m["risktemplateDomainasSGoalI"], m["risktemplateDomainasSGoalA"], m["risktemplateCMstatesCMID"], m["risktemplateCMstatesCPID"], m["risktemplateCMstatesCRID"], m["risktemplateCMstatesIMID"], m["risktemplateCMstatesIPID"], m["risktemplateCMstatesIRID"], m["risktemplateCMstatesAMID"], m["risktemplateCMstatesAPID"], m["risktemplateCMstatesARID"]);
	        			html += '<input type="button" value="Specification" onclick = "moveToNextStage('+rowCount+')"/></td>';
	        			
	        			rowCount = rowCount+1;
	        			
	        				
	        		});
	        		$("#riskAssessmentsTemplateBody").html(html);
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


function calculatingRiskFactor(sGoal, mIndex, pIndex, rIndex){
	if (sGoal == "C"){
		if (mIndex == "" || pIndex == "" || rIndex == "") return "V";
		else return "clear";
	}else if (sGoal == "RMRP"){
		if (mIndex == "" || pIndex == "" ) return "V";
		else return "clear";
	}else if (sGoal == "RPRR"){
		if (pIndex == "" || rIndex == "" ) return "V";
		else return "clear";
	}else if (sGoal == "RMRR"){
		if (mIndex == "" || rIndex == "" ) return "V";
		else return "clear";
	}else if (sGoal == "RM"){
		if (mIndex == "" ) return "V";
		else return "clear";
	}else if (sGoal == "RP"){
		if (pIndex == "" ) return "V";
		else return "clear";
	}else if (sGoal == "RR"){
		if (rIndex == "" ) return "V";
		else return "clear";
	}else if (sGoal == "R"){
		if (mIndex == "" && pIndex == "" && rIndex == "") return "V";
		else if(mIndex != "" || pIndex != "" || rIndex != "") return "clear";
	}else {
		return "clear";
	}
}

function calculatingRecommendations(mGoal, sGoalC, sGoalI, sGoalA, indexMC, indexPC, indexRC, indexMI, indexPI, indexRI, indexMA, indexPA, indexRA){
	var sGoalIndex;
	var result = "";
	switch (mGoal){
	case "E" : 
		sGoalIndex = 1;
		result += calculatingSubRecommendation(sGoalIndex, sGoalC, indexMC, indexPC, indexRC);
		break;
	case "M" : 
		sGoalIndex = 2;
		result += calculatingSubRecommendation(sGoalIndex, sGoalI, indexMI, indexPI, indexRI);
		break;
	case "D" : 
		sGoalIndex = 3;
		result += calculatingSubRecommendation(sGoalIndex, sGoalA, indexMA, indexPA, indexRA);
		break;
	case "E,M" : 
		sGoalIndex = 1;
		result += calculatingSubRecommendation(sGoalIndex, sGoalC, indexMC, indexPC, indexRC);
		sGoalIndex = 2;
		result += calculatingSubRecommendation(sGoalIndex, sGoalI, indexMI, indexPI, indexRI);
		break;
	case "E,D" : 
		sGoalIndex = 1;
		result += calculatingSubRecommendation(sGoalIndex, sGoalC, indexMC, indexPC, indexRC);
		sGoalIndex = 3;
		result += calculatingSubRecommendation(sGoalIndex, sGoalA, indexMA, indexPA, indexRA);
		break;
	case "M,D" : 
		sGoalIndex = 2;
		result += calculatingSubRecommendation(sGoalIndex, sGoalI, indexMI, indexPI, indexRI);
		sGoalIndex = 3;
		result += calculatingSubRecommendation(sGoalIndex, sGoalA, indexMA, indexPA, indexRA);
		break;
	case "E,D,M" : 
		sGoalIndex = 1;
		result += calculatingSubRecommendation(sGoalIndex, sGoalC, indexMC, indexPC, indexRC);
		sGoalIndex = 2;
		result += calculatingSubRecommendation(sGoalIndex, sGoalI, indexMI, indexPI, indexRI);
		sGoalIndex = 3;
		result += calculatingSubRecommendation(sGoalIndex, sGoalA, indexMA, indexPA, indexRA);
		break;
	}
	return result;
}


function calculatingSubRecommendation(sGoalIndex, sGoal, mIndex, pIndex, rIndex){
	var result = "";
	var indexResult ="";
	
	switch (sGoalIndex){
	case 1 : 
		indexResult = "C";
		break;
	case 2 : 
		indexResult = "I";
		break;
	case 3 :
		indexResult = "A";
		break;
	}
	
	if (sGoal == "C"){
		if (mIndex == "") result +="M"+indexResult+",";
		if (pIndex == "") result +="P"+indexResult+",";
		if (rIndex == "") result +="R"+indexResult+",";
	}else if (sGoal == "RMRP"){
		if (mIndex == "") result +="M"+indexResult+",";
		if (pIndex == "") result +="P"+indexResult+",";
	}else if (sGoal == "RPRR"){
		if (pIndex == "") result +="P"+indexResult+",";
		if (rIndex == "") result +="R"+indexResult+",";
	}else if (sGoal == "RMRR"){
		if (mIndex == "") result +="M"+indexResult+",";
		if (rIndex == "") result +="R"+indexResult+",";
	}else if (sGoal == "RM"){
		if (mIndex == "") result +="M"+indexResult+",";
	}else if (sGoal == "RP"){
		if (pIndex == "" ) result +="P"+indexResult+",";
	}else if (sGoal == "RR"){
		if (rIndex == "" ) result +="R"+indexResult+",";
	}else if (sGoal == "R"){
		if (mIndex == "") result +="M"+indexResult+",";
		if (pIndex == "") result +="P"+indexResult+",";
		if (rIndex == "") result +="R"+indexResult+",";
	}else {
		return false;
	}
	return result;
}

function moveToNextStage(rowNum){
	var param = "domainasID=" + $("#tdDomainasID" + rowNum).text()
		+ "&threatID=" + $("#tdThreatID"+ rowNum).text()
		+ "&CAPECID=" + $("#tdCAPEC"+ rowNum).text() 
		+ "&CVEID=" + $("#tdCVE"+ rowNum).text() 
		+ "&CWEID=" + $("#tdCWE"+ rowNum).text() 
		+ "&recommendations=" + $("#tdRecommendation"+ rowNum).text();     
	alert(param);
	location.href= "./srSpecification.html?" + param;
}


