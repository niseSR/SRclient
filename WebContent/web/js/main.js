var domainText = getDomain();

function moveToRegistration()
{
	location.href="./userRegistration.html"
}

function onloadMain()
{
	if (check_session()=="NM") 	location.href="web/home.html";
}

function Login()
{
	var dgtPasswd = implement_pbkdf2($("#tbPassword").val());
	var dgtId = implement_pbkdf2($("#tbId").val());
	var param = "userID="+dgtId+"&userPassword="+dgtPasswd;
		
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/user/user_login.do",
        callback:"callbak",
		dataType: "jsonp",
		data:param,	
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		sessionStorage.setItem("SRClient.id", $("#tbId").val());
					sessionStorage.setItem("SRClient.seq", v["userNumSeq"]);
					sessionStorage.setItem("SRClient.name", v["userName"]);
            		sessionStorage.setItem("SRClient.company", v["userCompany"]);
            		location.href="web/home.html";
            	}
            	if(k=="fail"){
            		alert("Fail the login!! \n 로그인 실패.");
            		$("#tbId").val("");
            		$("#tbPassword").val("");
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

