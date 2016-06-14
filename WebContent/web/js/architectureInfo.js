var domainText = getDomain();

function backToMain(){
	location.href="./main.html"
}


window.onload = function(){
	
	// Company Stakeholder
	
	var param = "relatedshUserCompany="+sessionStorage.getItem("SRClient.company");	
	
	$.ajax({
	    type: "POST",
	    url: "http://" + domainText + "/SRserver/arcinfo/CompanyStakeholder.do",
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
						html += '<tr>';
						html += '<td>' + m["relatedshName"] + '</td>';
						html += '<td>' + m["relatedshDescription"] + '</td>';
						html += '</tr>';
					
				});
				
				
				
				$("#loadCompanyStakeholder").html(html);
				//alert("Success to get the Company Stakeholder data. \n 성공적으로 가져왔습니다. ")
				}
				if(k=="fail"){
					alert("Fail to get the data. \n 정보를 가져오는데에 실패하였습니다.");
				}
			});
		},
		error: function(){
			alert("Fail to access the server \n 서버 연결 실패");
			
		}
		
	});
	
	// Company Asset
	
	param = "domainasUserID=" +  implement_pbkdf2(sessionStorage.getItem("SRClient.id"));
	
	$.ajax({
	    type: "POST",
	    url: "http://" + domainText + "/SRserver/arcinfo/CompanyAsset.do",
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
						var domainasTypeArray = m["companyAssetType"].split('_');
						var domainasType = domainasTypeArray[0] + '_' + domainasTypeArray[1] + '_' + domainasTypeArray[2];

						
						html += '<tr>';
						html += '<td>' + m["companyAssetName"] + '</td>';
						html += '<td>' + domainasType + '</td>';
						html += '<td>' + m["companyAssetCriticality"] + '</td>';
						html += '<td>' + m["companyAssetSGOALC"] + '</td>';
						html += '<td>' + m["companyAssetSGOALI"] + '</td>';
						html += '<td>' + m["companyAssetSGOALA"] + '</td>';
						html += '<td>' + m["companyAssetPlatform"] + '</td>';
						html += '<td>' + m["companyAssetRelatedStakeholder"] + '</td>';
						html += '</tr>';
					
				});
				
				
				
				$("#loadCompanyAsset").html(html);
				//alert("Success to get the Company Asset data. \n 성공적으로 가져왔습니다. ")
				}
				if(k=="fail"){
					alert("Fail to get the data. \n 정보를 가져오는데에 실패하였습니다.");
				}
			});
		},
		error: function(){
			alert("Fail to access the server \n 서버 연결 실패");
			
		}
		
	});
	
	
	param = "currentcmUserID=" +  implement_pbkdf2(sessionStorage.getItem("SRClient.id"));
	
	$.ajax({
	    type: "POST",
	    url: "http://" + domainText + "/SRserver/arcinfo/CompanyOperatingCountermeasure.do",
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
						var currentcmCMIDArray = m["currentcmCMID"].split('_');
						var relatedAsset = currentcmCMIDArray[1] + '_' + currentcmCMIDArray[2];
						var AssetProteation = currentcmCMIDArray[3];
						html += '<tr>';
						html += '<td>' + m["currentcmID"] + '</td>';
						html += '<td>' + relatedAsset + '</td>';
						html += '<td>' + AssetProteation + '</td>';
						html += '<td>' + m["currentcmImplcmName"] + '</td>';	
						html += '</tr>';
					
				});
				
				
				
				$("#loadCompanyOperatingCountermeasure").html(html);
				//alert("Success to get the Company Asset data. \n 성공적으로 가져왔습니다. ")
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




