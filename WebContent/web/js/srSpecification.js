var domainText = getDomain();

function Request(valuename)    //javascript로 구현한 Request
{
    var rtnval = "";
    var nowAddress = unescape(location.href);
    var parameters = (nowAddress.slice(nowAddress.indexOf("?")+1,nowAddress.length)).split("&");
   
    for(var i = 0 ; i < parameters.length ; i++){
        var varName = parameters[i].split("=")[0];
        if(varName.toUpperCase() == valuename.toUpperCase())
        {
            rtnval = parameters[i].split("=")[1];
            break;
        }
    }
    return rtnval;
}

function onLoadSRSpecification(){
    
	var recommendationParam = Request("recommendations").split(",");
	var recomresult = "";
	for (i=0; i<recommendationParam.length ; i++){
		if (i==0){
			recomresult = recommendationParam[i];
		}else{
			if (recommendationParam[i]!="")	recomresult = recomresult + "," + recommendationParam[i];
		}
	}

	var param = "cmsgoalASID=" + Request("domainasID").split("_"+sessionStorage.getItem("SRClient.company")+"_")[0]
		+ "&cmsgoalSgoal=" + recomresult;

	$.ajax({
	    type: "POST",
	    url: "http://" + domainText + "/SRserver/risk/select_RecommendingCMID.do",
	    callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
	    	$.each(data, function(k,v){
	        	if(k=="success"){
	        		var html = '';
					$.each(v, function(l,m){
	              		html += '<option value="' + m["cmsgoalCMID"] + '">'+ m["cmsgoalCMSGoal"] + ' : ' + m["cmsgoalCMName"] + '</option>';
	              	});
	        		$("#selectCM").html(html);
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

function recommendSecurityRequirements(){
	var param = "domainasID=" + Request("domainasID")
		+ "&ASID=" + Request("domainasID").split("_"+sessionStorage.getItem("SRClient.company")+"_")[0]
		+ "&threatID=" + Request("threatID")
		+ "&CAPECID=" + Request("CAPECID")
		+ "&CVEID=" + Request("CVEID")
		+ "&CWEID=" + Request("CWEID")
		+ "&CMID=" + $("#selectCM option:selected").val();
	alert (param);

	$.ajax({
	    type: "POST",
	    url: "http://" + domainText + "/SRserver/risk/select_RecommendingSR.do",
	    callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
	    	$.each(data, function(k,v){
	        	if(k=="success"){
	        		
	        		var html = '<thead><tr><th>category</th><th>Attributes</th><th>ID Number</th><th>Contents</th></tr></thead>';
	        		html += '<tbody>';
					html += '<tr><td rowspan="' + v["rsrtSRRowCount"] + '">Security Requirements </td>';
					html += '<td> name </td>';
					html += '<td>' +v["rsrtSRNameID"] + '</td>';
					html += '<td>' +v["rsrtSRNameContent"] + '</td></tr>';
					
					html += '<tr><td> Description </td>';
					html += '<td>'+v["rsrtSRDescriptionID"] + '</td>';
					html += '<td>'+v["rsrtSRDescriptionContent"] + '</td></tr>';
					html += '<tr>'
					html +=	'<td rowspan="' + v["rsrtSRSubReqRowCount"] + '"> Related Requirements </td>';
					for (var i=0; i<v["rsrtSRSubReqRowCount"]; i++){
						if (i==0){
							html += '<td>'+v["rsrtSRSubReqID" +i] + '</td>';
							html += '<td>'+v["rsrtSRSubReqName" +i] + '</td></tr>';
						}else{
							html += '<tr><td>'+v["rsrtSRSubReqID" +i] + '</td>';
							html += '<td>'+v["rsrtSRSubReqName" +i] + '</td></tr>';
						}
					}
					
					
					html += '<tr><td rowspan="' + v["rsrtCMRowCount"] + '">Countermeasure</td>';
					html += '<td> name </td>';
					html += '<td>' +v["rsrtCMNameID"] + '</td>';
					html += '<td>' +v["rsrtCMNameContent"] + '</td></tr>';
					
					html += '<tr><td> Description </td>';
					html += '<td>'+v["rsrtCMDescriptionID"] + '</td>';
					html += '<td>'+v["rsrtCMDescriptionContent"] + '</td></tr>';
					html += '<tr>'
					html +=	'<td rowspan="' + v["rsrtCMImplRowCount"] + '"> Implementable Countermeasure </td>';
					for (var i=0; i<v["rsrtCMImplRowCount"]; i++){
						if (i==0){
							html += '<td>'+v["rsrtCMImplID" +i] + '</td>';
							html += '<td>'+v["rsrtCMImplContent" +i] + '</td></tr>';
						}else{
							html += '<tr><td>'+v["rsrtCMImplID" +i] + '</td>';
							html += '<td>'+v["rsrtCMImplContent" +i] + '</td></tr>';
						}
					}
					
					
					
					html += '<tr><td rowspan="' + v["rsrtASRowCount"] + '">Asset</td>';
					html += '<td> Type </td>';
					html += '<td>' +v["rsrtASTypeID"] + '</td>';
					html += '<td>' +v["rsrtASTypeContent"] + '</td></tr>';
					
					html += '<tr><td> Protected Domain Asset</td>';
					html += '<td>'+v["rsrtASProtectDomainasID"] + '</td>';
					html += '<td>'+v["rsrtASProtectDomainasContent"] + '</td></tr>';
					
					html += '<tr><td rowspan="3"> Security Goal</td>';
					html += '<td>'+v["rsrtASAssetSGoalCID"] + '</td>';
					html += '<td>'+v["rsrtASAssetSGoalCContent"] + '</td></tr>';
					html += '<tr><td>'+v["rsrtASAssetSGoalIID"] + '</td>';
					html += '<td>'+v["rsrtASAssetSGoalIContent"] + '</td></tr>';
					html += '<tr><td>'+v["rsrtASAssetSGoalAID"] + '</td>';
					html += '<td>'+v["rsrtASAssetSGoalAContent"] + '</td></tr>';
					
					html += '<tr>'
					html +=	'<td rowspan="' + v["rsrtASRelatedSHRowCount"] + '"> Related Stakeholders </td>';
					for (var i=0; i<v["rsrtASRelatedSHRowCount"]; i++){
						if (i==0){
							html += '<td>'+v["rsrtASRelatedSHID" +i] + '</td>';
							html += '<td>'+v["rsrtASRelatedSHName" +i] + '</td></tr>';
						}else{
							html += '<tr><td>'+v["rsrtASRelatedSHID" +i] + '</td>';
							html += '<td>'+v["rsrtASRelatedSHName" +i] + '</td></tr>';
						}
					}
					
					
					
					html += '<tr><td rowspan="' + v["rsrtRFRowCount"] + '">Risk Factor</td>';
					html += '<td> Threat </td>';
					html += '<td rowspan="4">' +v["rsrtRFThreatID"] + '</td>';
					html += '<td>' +v["rsrtRFThreatContent"] + '</td></tr>';
					
					html += '<td> Threat Description</td>';
					html += '<td>' +v["rsrtRFThreatDescriptionContent"] + '</td></tr>';
					
					html += '<tr><td> Threat Activity</td>';
					html += '<td>'+v["rsrtRFThreatactDescriptionContent"] + '</td></tr>';
					
					html += '<tr><td> Malicious Goal</td>';
					html += '<td>';

					switch (v["rsrtRFThreatMGoalContent"]){
        			case "E" : 
        				html += 'Exposure';
        				break;
        			case "M" : 
        				html += 'Modification';
        				break;
        			case "D" : 
        				html += 'Destroy';
        				break;
        			case "E,M" : 
        				html += 'Exposure, Modification';
        				break;
        			case "E,D" : 
        				html += 'Exposure, Destroy';
        				break;
        			case "M,D" : 
        				html += 'Modification, Destroy';
        				break;
        			case "E,D,M" : 
        				html += 'Exposure, Modification, Destroy';
        				break;
        			}
					html += '</td></tr>';
					
					html += '<tr><td> Threat Attack Vector</td>';
					html += '<td>'+v["rsrtRFAttackVectorID"] + '</td>'
					html += '<td>'+v["rsrtRFAttackVectorContent"] + '</td></tr>';
					
					html += '<tr><td> Related Vulnerability</td>';
					if (v["rsrtRFVulnerabilityID"] != null){
						html += '<td>'+v["rsrtRFVulnerabilityID"] + '</td>'
						html += '<td>'+v["rsrtRFVulnerabilityContent"] + '</td></tr>';
					}else{
						html += '<td></td><td></td></tr>';
					}
					
					html += '<tr><td> Related Weakness</td>';
					if (v["rsrtRFWeaknessID"] != null){
						html += '<td>'+v["rsrtRFWeaknessID"] + '</td>'
						html += '<td>'+v["rsrtRFWeaknessContent"] + '</td></tr>';
					}else{
						html += '<td></td><td></td></tr>'
					}
					
					
					
					html += '<tr><td rowspan="' + v["rsrtRBRowCount"] + '">Recommendations for Business Pespective</td>';
					html += '<td rowspan="' + v["rsrtRBOrganizationRowCount"] + '"> Organization </td>';
					for (var i=0; i<v["rsrtRBOrganizationRowCount"]; i++){
						if (i==0){
							html += '<td>'+v["rsrtRBOrganizationID" +i] + '</td>';
							html += '<td>'+v["rsrtRBOrganizationContent" +i] + '</td></tr>';
						}else{
							html += '<tr><td>'+v["rsrtRBOrganizationID" +i] + '</td>';
							html += '<td>'+v["rsrtRBOrganizationContent" +i] + '</td></tr>';
						}
					}
					
					html += '<tr><td rowspan="' + v["rsrtRBRegulationRowCount"] + '"> Regulation </td>';
					for (var i=0; i<v["rsrtRBRegulationRowCount"]; i++){
						if (i==0){
							html += '<td>'+v["rsrtRBRegulationID" +i] + '</td>';
							html += '<td>'+v["rsrtRBRegulationContent" +i] + '</td></tr>';
						}else{
							html += '<tr><td>'+v["rsrtRBRegulationID" +i] + '</td>';
							html += '<td>'+v["rsrtRBRegulationContent" +i] + '</td></tr>';
						}
					}
					
					
					html += '<tr><td rowspan="' + v["rsrtRBFundRowCount"] + '"> Time </td>';
					for (var i=0; i<v["rsrtRBFundRowCount"]; i++){
						if (i==0){
							html += '<td>'+v["rsrtRBFundID" +i] + '</td>';
							html += '<td>'+v["rsrtRBFundContent" +i] + '</td></tr>';
						}else{
							html += '<tr><td>'+v["rsrtRBFundID" +i] + '</td>';
							html += '<td>'+v["rsrtRBFundContent" +i] + '</td></tr>';
						}
					}
					
					html += '<tr><td rowspan="' + v["rsrtRBTimeRowCount"] + '"> Fund </td>';
					for (var i=0; i<v["rsrtRBTimeRowCount"]; i++){
						if (i==0){
							html += '<td>'+v["rsrtRBTimeID" +i] + '</td>';
							html += '<td>'+v["rsrtRBTimeContent" +i] + '</td></tr>';
						}else{
							html += '<tr><td>'+v["rsrtRBTimeID" +i] + '</td>';
							html += '<td>'+v["rsrtRBTimeContent" +i] + '</td></tr>';
						}
					}
					
					html += '<tr><td rowspan="' + v["rsrtRBBestPracticeRowCount"] + '"> Best Practice </td>';
					for (var i=0; i<v["rsrtRBBestPracticeRowCount"]; i++){
						if (i==0){
							html += '<td>'+v["rsrtRBBestPracticeID" +i] + '</td>';
							html += '<td>'+v["rsrtRBBestPracticeContent" +i] + '</td></tr>';
						}else{
							html += '<tr><td>'+v["rsrtRBBestPracticeID" +i] + '</td>';
							html += '<td>'+v["rsrtRBBestPracticeContent" +i] + '</td></tr>';
						}
					}
					
					html += '<tr><td rowspan="' + v["rsrtRBLegalComplianceRowCount"] + '"> Law Compliance </td>';
					for (var i=0; i<v["rsrtRBLegalComplianceRowCount"]; i++){
						if (i==0){
							html += '<td>'+v["rsrtRBLegalComplianceID" +i] + '</td>';
							html += '<td>'+v["rsrtRBLegalComplianceContent" +i] + '</td></tr>';
						}else{
							html += '<tr><td>'+v["rsrtRBLegalComplianceID" +i] + '</td>';
							html += '<td>'+v["rsrtRBLegalComplianceContent" +i] + '</td></tr>';
						}
					}
					
					
					html += '<tr><td rowspan="' + v["rsrtRSRowCount"] + '">Recommendations for System Pespective</td>';
					html += '<td rowspan="' + v["rsrtRSServiceRowCount"] + '"> Service </td>';
					for (var i=0; i<v["rsrtRSServiceRowCount"]; i++){
						if (i==0){
							html += '<td>'+v["rsrtRSServiceID" +i] + '</td>';
							html += '<td>'+v["rsrtRSServiceContent" +i] + '</td></tr>';
						}else{
							html += '<tr><td>'+v["rsrtRSServiceID" +i] + '</td>';
							html += '<td>'+v["rsrtRSServiceContent" +i] + '</td></tr>';
						}
					}
					
					html += '<tr><td rowspan="' + v["rsrtRSPlatformRowCount"] + '"> Platform </td>';
					for (var i=0; i<v["rsrtRSPlatformRowCount"]; i++){
						if (i==0){
							html += '<td>'+v["rsrtRSPlatformID" +i] + '</td>';
							html += '<td>'+v["rsrtRSPlatformContent" +i] + '</td></tr>';
						}else{
							html += '<tr><td>'+v["rsrtRSPlatformID" +i] + '</td>';
							html += '<td>'+v["rsrtRSPlatformContent" +i] + '</td></tr>';
						}
					}
					
					html += '<tr><td rowspan="' + v["rsrtRTRowCount"] + '">Recommendations for Technical Pespective</td>';
					html += '<td rowspan="' + v["rsrtRTMechanismRowCount"] + '"> Security Mechanisms </td>';
					for (var i=0; i<v["rsrtRTMechanismRowCount"]; i++){
						if (i==0){
							html += '<td>'+v["rsrtRTMechanismID" +i] + '</td>';
							html += '<td>'+v["rsrtRTMechanismContent" +i] + '</td></tr>';
						}else{
							html += '<tr><td>'+v["rsrtRTMechanismID" +i] + '</td>';
							html += '<td>'+v["rsrtRTMechanismContent" +i] + '</td></tr>';
						}
					}
					
					html += '<tr><td rowspan="' + v["rsrtRTTrendRowCount"] + '"> Trends </td>';
					for (var i=0; i<v["rsrtRTTrendRowCount"]; i++){
						if (i==0){
							html += '<td>'+v["rsrtRTTrendID" +i] + '</td>';
							html += '<td>'+v["rsrtRTTrendContent" +i] + '</td></tr>';
						}else{
							html += '<tr><td>'+v["rsrtRTTrendID" +i] + '</td>';
							html += '<td>'+v["rsrtRTTrendContent" +i] + '</td></tr>';
						}
					}
					
					
					
					
					
					
					
	              	
	        		$("#SRTemplate").html(html);
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