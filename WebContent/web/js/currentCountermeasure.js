var domainText = getDomain();

function findAssetType()
{
	var param = "assetType=AS_" + $("#AssetType1 option:selected").val();
	
	if ($("#AssetType1 option:selected").val() =="0" )
	{
		alert("Please select the asset category. \n Asset의 대분류를 반드시 선택해 주세요.");
		return false;
	}
	
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

function findRelatedDomainAsset()
{
	var param = "domainasID="  + $("#AssetType2 option:selected").val() + "_" + sessionStorage.getItem("SRClient.company")+"_";
	
	
	if ($("#AssetType2 option:selected").val() =="" )
	{
		alert("Please select the asset category. \n Asset의 중분류를 반드시 선택해 주세요.");
	}
	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/arcinfo/select_DomainAssetName.do",
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
            		$("#relatedDomainAsset").html(html);
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



function findCountermeasureType()
{
	
	if ($("CountermeasureType1 option:selected").val() =="0" )
	{
		alert("Please select the countermeasure category. \n countermeasure의 대분류를 반드시 선택해 주세요.");
		return false;
	}
	
	var resultAssetValue = $("#AssetType2 option:selected").val().replace("AS_", "");
	var param = "cmType=CM_" + resultAssetValue + "_" + $("#CountermeasureType1 option:selected").val() + "_";

	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/arcinfo/select_CountermeasureType.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		var html = '';
					$.each(v, function(l,m){
                  		html += '<option value="' + m["cmID"] + '">'+m["cmName"]+'</option>';
                	});
            		$("#CountermeasureType2").html(html);
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

function findImplementableCM()
{
	var param = "implcmType=" + $("#CountermeasureType2 option:selected").val() + "_";

	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/arcinfo/select_ImplCountermeasureType.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		var html = '';
					$.each(v, function(l,m){
                  		html += '<option value="' + m["implcmID"] + '">'+m["implcmName"]+'</option>';
                	});
            		$("#ImplCountermeasure").html(html);
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

function submitCurrentCMInfo()
{
	var param = "currentcmCMID=" + $("#CountermeasureType2 option:selected").val() 
		+ "&currentcmImplcmID=" + $("#ImplCountermeasure option:selected").val()
		+ "&currentcmUserID=" + implement_pbkdf2(sessionStorage.getItem("SRClient.id"))
		+ "&currentcmID=" + $("#ImplCountermeasure option:selected").val() 
		+ "_" + sessionStorage.getItem("SRClient.company")
		+ "&currentcmImplcmName=" + $("#ImplCountermeasure option:selected").text()
		+ "&currentcmDomainasID=" + $("#relatedDomainAsset").val()
		+ "&currentcmDomainasName=" + $("#relatedDomainAsset").text();
	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/arcinfo/submit_CurrentCMInfo.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		alert("Success to register the data. \n 성공적으로 등록하였습니다. ");
            		location.href = './currentCountermeasure.html'
            	}
            	if(k=="fail"){
            		alert("Fail to register the data. \n 정보를 가져오는데에 실패하였습니다.");
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

