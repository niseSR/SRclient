var domainText = getDomain();
//소문자만 입력가능하게 만들기
function toLower()
{
  if(event.keyCode >= 65 && event.keyCode <= 90)
  {
     event.keyCode = event.keyCode + 32;
  }
}

// 동일한 ID 체크
function submitPlatformInfo()
{
	var param = "platformPart=" + $("#tbPlatformPart").val()
		+"&platformVendor=" + $("#tbPlatformVendor").val()
		+"&platformProduct=" + $("#tbPlatformProduct").val()
		+"&platformVersion=" + $("#tbPlatformVersion").val()
		+"&platformUpdate=" + $("#tbPlatformUpdate").val()
		+"&platformEdition=" + $("#tbPlatformEdition").val()
		+"&platformLanguage=" + $("#tbPlatformLanguage").val()
		+"&platformSoftwareEdition=" + $("#tbsoftwareEdition").val()
		+"&platformTargetSoftware=" + $("#tbTargetSoftware").val()
		+"&platformTargetHardware=" + $("#tbTargetHardware").val()
		+"&platformOther=" + $("#taOther").val();
		
	if ( $("#tbPlatformPart").val() == "" || $("#tbPlatformVendor").val() == "" || $("#tbPlatformProduct").val() == "" )
	{
		alert("You must fill the blank marked with *. \n *가 표시된 항목은 반드시 채워주세요.");
		return false;
	}

	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/arcinfo/submit_PlatformInfo.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		alert("Success to submit. \n 성공적으로 등록하였습니다. .");
            		location.href="./platformInfo.html"
            	}
            	if(k=="fail"){
            		alert("There are the same info. Fail to submit. \n 중복되는 정보가 있습니다. 등록에 실패하였습니다.");
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

