$(document).ready(function () {
	loading_loginCh();
});

function loading_loginCh(){
	if(document.getElementById("main") == null){
		var userSeq = sessionStorage.getItem("neopad.infobee_seq");
		if(!userSeq){
			if(opener){
				alert("로그인 후 이용해 주세요");
				window.close();
				window.opener.top.location.href = "../../index.html";
			}else{
				window.location.href="./../../index.html";
				alert("로그인 후 이용해 주세요");
			}
		}
	}
	
}



