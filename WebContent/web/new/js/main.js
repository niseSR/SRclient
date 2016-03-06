var domainText = getDomain();


function jenatest1(){
	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/test/test_jena1.do",
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		console.log(v);
            	}

            	if(k=="fail"){
            	}
        	});
        },
        
        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
        error: function(){
        	alert("서버 연결 실패");
        }
		
    });
}

function jenatest2(){
	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/test/test_jena2.do",
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		console.log(v);
            	}

            	if(k=="fail"){
            	}
        	});
        },
        
        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
        error: function(){
        	alert("서버 연결 실패");
        }
		
    });
}

function jenatest3(){
	
	$.ajax({
        type: "POST",
        url: "http://" + domainText + "/SRserver/test/test_jena3.do",
        callback:"callbak",
		dataType: "jsonp",
		success:
			function(data){
        	$.each(data, function(k,v){
            	if(k=="success"){
            		console.log(v);
            	}

            	if(k=="fail"){
            	}
        	});
        },
        
        //404에러와 같이 서버응담이 없는경우 실패 alert만 생성하고 현재 페이지에 위치함
        error: function(){
        	alert("서버 연결 실패");
        }
		
    });
}