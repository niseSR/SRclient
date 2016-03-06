function getDomain(){
	return "localhost:8080";
}

function check_session(){
	var sessionId = sessionStorage.getItem("secure.id");
	var sessionSeq = sessionStorage.getItem("secure.seq");
	
	if(sessionId == null)
		return "NM";
	else if(sessionId == "admin")
		return "AD";
	else
		return "TM";
}

(function($) {
    $.fn.invisible = function() {
        return this.each(function() {
            $(this).css("display", "none");
        });
    };
    $.fn.visible = function() {
        return this.each(function() {
            $(this).css("visibility", "visible");
        });
    };
}(jQuery));

function member_load(){
	var tmp = check_session();
	console.log(tmp);
	if(tmp == "TM"){
		$("#admin").invisible();
		$("#non_member").invisible();
		$("#member").visible();
	}else if(tmp == "NM"){
		$("#admin").invisible();
		$("#non_member").visible();
		$("#member").invisible();
	}else{
		$("#admin").visible();
		$("#non_member").invisible();
		$("#member").invisible();
	}
	
	$("#identify").text(sessionStorage.getItem("secure.id")+"님");
}

function logout(){
	sessionStorage.removeItem("secure.id");
	sessionStorage.removeItem("secure.seq");
	sessionStorage.removeItem("secure.auth");
	location.href="main.html";

}

function getUrlSeq(){
	var url      = window.location.href; 
	var tmpArr = url.split("?");
	var tmp1Arr = tmpArr[1].split("=");
	var seq = tmp1Arr[1];
	
	return seq;
}

function error_load(){
	alert("잘못된 접근입니다");
	sessionStorage.removeItem("secure.id");
	sessionStorage.removeItem("secure.seq");
	location.href = "main.html";
}


function implement_pbkdf2(msgdata){

	var hashdgt = CryptoJS.SHA256(msgdata);

	var key512Bits250Iterations = CryptoJS.PBKDF2(msgdata, hashdgt, { keySize: 512/32, iterations: 250 });
	
	return key512Bits250Iterations;
}