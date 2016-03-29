var domainText = getDomain();

// 동일한 ID 체크
function submitStakeholderInfo()
{
	var param = "relatedshUserID="+implement_pbkdf2(sessionStorage.getItem("SRClient.id"))
		+"&relatedshID=SH_"+sessionStorage.getItem("SRClient.company")+ "_" 
		+"&relatedshName="+$("#tbStakeholdersName").val()
		+"&relatedshDescription="+$("#taStakeholdersDescription").val()
		+"&relatedshCompany="+sessionStorage.getItem("SRClient.company");	
	
	if ( $("#tbStakeholdersName").val() == "")
	{
		alert("Please write down Stakeholder's Name in the text box \n 텍스트박스안의 Stakeholder 이름을 입력하세요.");
		return false;
	}

	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/arcinfo/submit_StakeholderInfo.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		alert("Success to submit. \n 성공적으로 등록하였습니다. .");
            		location.href="./stakeholdersInfo.html"
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
    return false;
}

