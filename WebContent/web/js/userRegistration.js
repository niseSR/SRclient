var domainText = getDomain();

var validIdCheck = 0;
var validCompanyCheck = 0;
var reg_pwd = /^.*(?=.{8,16})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;


// 동일한 ID 체크
function checkUniqueId()
{
	var param = "userID="+$("#tbId").val();	

	if ( $("#tbId").val() == "")
	{
		alert("Please write down your ID in the ID text box \n ID를 입력하세요.");
		return false;
	}
	if ($("#tbId").val().length < 4) 
	{
		alert("Please fill the ID over 4 characters. \n 아이디는 영문,숫자로 4자 이상 입력해주세요.");
		return false;
	} 

	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/user/user_checkUniqueId.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		alert("You can use this ID. \n ID가 중복되지 않았습니다.");
            		validIdCheck = validIdCheck + 1;
            		$("#btnId").attr("disabled","true");
            		$("#tbId").attr("readonly", true);
            	}
            	if(k=="fail"){
            		alert("There are already registered ID \n 동일한 ID가 있습니다.");
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


// 동일한 회사명 확인
function checkUniqueCompany()
{
	var param = "userCompany="+$("#tbCompany").val();	

	if ( $("#tbCompany").val() == "")
	{
		alert("Please write down your company name in the company name text box \n 회사명을 입력하세요.");
		return false;
	}

	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/user/user_checkUniqueCompany.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		alert("You can use this company name. \n 회사명이 중복되지 않았습니다.");
            		validCompanyCheck = validCompanyCheck + 1;
            		$("#btnCompany").attr("disabled","true");
            		$("#tbCompany").attr("readonly", true);
            	}
            	
            	if(k=="fail"){
            		alert("There are already registered company name \n 동일한 회사 이름이 있습니다.");
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


function submitUserInfo(){

	// 필수 항목 기입 여부 점검
	if(!reg_pwd.test($("#tbPassword1").val())){
		alert("Please write the password mixing with characters, numbers, and symbols ranged from 8 to 16. \n 비밀번호는 영문, 숫자, 기호를 혼합하여 8자 이상 16자 이하로 만들어주세요.");
		return false;
	}
	if ($("#tbPassword2").val() == "") {
		alert("Please confirm the password mixing with characters, numbers, and symbols ranged from 8 to 16. \n 비밀번호는 영문, 숫자, 기호를 혼합하여 8자 이상 16자 이하로 만들어주세요.");
		return false;
	}
	if ($("#tbPassWord1").val() != $("#tbPassWord2").val()) {
		alert("Password Confirmation fails. \n 입력하신 비밀번호가 다릅니다.");
		return false;
	}
	if ( $("#tbUserName").val() == "")
	{
		alert("Please fill with the name text box. \n 이름을 입력하세요");
		return false;
	} 
	
	if (validIdCheck == 0 || validCompanyCheck == 0)
	{
		alert("Please check the ID and Company Name. \n 아이디 및 회사 이름 중복체크를 해주세요");
		return false;
	}

	var dgtPasswd = implement_pbkdf2($("#tbPassword1").val());
	var dgtId = implement_pbkdf2($("#tbId").val());
	var param = "userID="+dgtId+"&userPassword="+dgtPasswd
		+"&userName="+$("#tbUserName").val()+"&userCompany="+$("#tbCompany").val();
		
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/user/user_registration.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		alert("Success the registration!! \n 등록 성공");
            		location.href="./main.html"
            	}
            	if(k=="fail"){
            		alert("Fail the registration!! \n 사용자 등록에 실패하였습니다.");
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


