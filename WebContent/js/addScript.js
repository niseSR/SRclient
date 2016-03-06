/* ifrmae resize */
function autoResize(i)
{
    var iframeHeight=
    (i).contentWindow.document.body.scrollHeight;
    (i).height=iframeHeight+20;
}

/* java의 trim */
function trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

/* 현재시간 */
function getCurrentDate(type){
	
	var d = new Date();
	var s = "";
	if(type=="min"){
		s =
		    leadingZeros(d.getFullYear(), 4) + '년 ' +
		    leadingZeros(d.getMonth() + 1, 2) + '월 ' +
		    leadingZeros(d.getDate(), 2) + '일 ' +
		    leadingZeros(d.getHours(), 2) + '시 ' +
	    	leadingZeros(d.getMinutes(), 2) + '분';
	}else if(type=="hour"){
		s =
		    leadingZeros(d.getFullYear(), 4) + '년 ' +
		    leadingZeros(d.getMonth() + 1, 2) + '월 ' +
		    leadingZeros(d.getDate(), 2) + '일 ';
	}else{
		s =
		    leadingZeros(d.getFullYear(), 4) + '년 ' +
		    leadingZeros(d.getMonth() + 1, 2) + '월 ' +
		    leadingZeros(d.getDate(), 2) + '일 ' +
		    leadingZeros(d.getHours(), 2) + '시';
	}

	return s;
}

//평수바꿔주기
function calcArea(thisVal) {
	var id = thisVal.replace("rentDData", "");

	var oriVal = document.getElementById(thisVal).value;

	if(thisVal.value != ""){
	    var width = parseInt(document.getElementById(thisVal).value);
	    
	    var area = width * 3.3058;

	    if(area != "NaN"){
	    	document.getElementById(thisVal).value = area;
	    	document.getElementById("cal"+id).innerHTML = "<span style='color: #000000;'> [<span style='color: blue;'>"+oriVal+"</span> 평]</span>";
	    }
	}
}

//hire
function calcArea2(thisVal, thisVal2) {
	var id = thisVal.replace("hireDData", "");
	var id2 = thisVal2.replace("hireDData", "");
	
	var oriVal = document.getElementById(thisVal).value;
	var oriVal2 = document.getElementById(thisVal2).value;
	
	if(thisVal.value != ""){
	    var width = parseInt(document.getElementById(thisVal).value);
	    var area = width * 3.3058;

	    if(document.getElementById(thisVal).value != "" && area != "NaN"){
	    	document.getElementById(thisVal).value = area;
	    	document.getElementById("cal"+id).innerHTML = " "+oriVal+" ";
	    }
	}
	
	if(thisVal2.value != ""){
		var width2 = parseInt(document.getElementById(thisVal2).value);
		var area2 = width2 * 3.3058;
		
		if(document.getElementById(thisVal2).value != "" && area2 != "NaN"){
	    	document.getElementById(thisVal2).value = area2;
	    	document.getElementById("cal"+id2).innerHTML = " "+oriVal2+" ";
	    }
	}
}

//금액 한글 표시(만원단위)
function num2won(chknum) {
	
	var val = chknum.value;
	var won = new Array();
	re = /^[1-9][0-9]*$/;
	if(val == ""){
		$("#"+chknum.name+"_2").html(" - ");
	}else{
		num = val.toString().split(',').join('');
		//숫자만 입력 가능
		if (!re.test(num)) {
			chknum.value = '';
			$("#"+chknum.name+"_2").html(" - ");
		} 
		else {
			var price_unit0 = new Array('', '일', '이', '삼', '사', '오', '육', '칠',
					'팔', '구');
			var price_unit1 = new Array('', '십', '백', '천');
			var price_unit2 = new Array('만', '억', '조', '경', '해', '시', '양',
					'구', '간', '정');
			for (i = num.length - 1; i >= 0; i--) {
				won[i] = price_unit0[num.substr(num.length - 1 - i, 1)];
				if (i > 0 && won[i] != '')
					won[i] += price_unit1[i % 4];
				if (i % 4 == 0)
					won[i] += price_unit2[(i / 4)];
			}
			for (i = num.length - 1; i >= 0; i--) {
				if (won[i].length == 2)
					won[i - i % 4] += '-';
				if (won[i].length == 1 && i > 0)
					won[i] = '';
				if (i % 4 != 0)
					won[i] = won[i].replace('일', '');
			}
			won = won.reverse().join('').replace(/-+/g, '');
			$("#"+chknum.name+"_2").html(won);
		}
	}
}


function leadingZeros(n, digits) {
	var zero = '';
  	n = n.toString();

//숫자 콤마 구분하기
function number_format(chknum) {
	num = chknum.value;
	num = num.split(',').join('');
	var arr = num.split('.');
	var num = new Array();
	for (i = 0; i <= arr[0].length - 1; i++) {
		num[i] = arr[0].substr(arr[0].length - 1 - i, 1);
		if (i % 3 == 0 && i != 0)
			num[i] += ',';
	}
	num = num.reverse().join('');
	if (!arr[1])
		chknum.value = num;
	else
		chknum.value = num + '.' + arr[1];
	num2won(chknum);
}

	if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}

//숫자만 입력
function inputDigit(thisVal){
	var val = thisVal.value;
	re = /^[1-9][0-9]*$/;	
	num = val.toString().split(',').join('');
	
	if (!re.test(num)) {
		thisVal.value = '';
		
		if(thisVal.name == "hireDData4"){
			$("#cal3_2").html(" - ");
		}
		if(thisVal.name == "hireDData5"){
			$("#cal3_3").html(" - ");
		}
	}
}

/* replaceAll */
function replaceAll(str, searchStr, replaceStr) {
	 while (str.indexOf(searchStr) != -1) {
		 str = str.replace(searchStr, replaceStr);
	 }
	 return str;
}
/* 전화번호 하이픈 */
function setHyphen(thisVal)
{
	var string = thisVal.value;
	var inputId = thisVal.id;
    var str;
    
    str = checkDigit(string);
    var retValue = "";
    var len = str.length;

    if (len == 10 || len == 11 || len == 12) {
        if (len == 10){ retValue = retValue + str.substring(0, 3) + "-" + str.substring(3, 6) + "-" + str.substring(6, 10); }
        else if (len == 11){ retValue = retValue + str.substring(0, 3) + "-" + str.substring(3, 7) + "-" + str.substring(7, 11); }
        else{ retValue = retValue + str.substring(0, 4) + "-" + str.substring(4, 8) + "-" + str.substring(8, 12); }
        document.getElementById(inputId).value = retValue;
    } else {
        alert("잘못입력하셨습니다.");
        document.getElementById(inputId).value = "";
        return;
    }
}


function checkDigit(num)
{
    var Digit = "1234567890";
    var string = num;
    var len = string.length
    var retVal = "";

    for (i = 0; i < len; i++) {
        if (Digit.indexOf(string.substring(i, i+1)) >= 0) {
            retVal = retVal + string.substring(i, i+1);
        }
    }
    return retVal;
}

function is_email(str) { 
	var r1 = new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
	var r2 = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$");
	return (!r1.test(str) && r2.test(str));
} 

function is_phone(str) {
	var r = new RegExp("^[0-9]{2,4}-[0-9]{2,4}-[0-9]{4,4}$");
	return r.test(str);
} 


//정보 일치율

function infoCongruence(rentSeq,hireSeq,matchingPer,step,dealMain){
	$('.comparison').popupWindow({ 
		height:800,
		width: 700,
		scrollbars:1,
		menubar:0,
		resizable:0,
		toolbar:0,
		windowURL:'../../rental/popup/comparison.html?rentSeq='+rentSeq+'&hireSeq='+hireSeq+'&matchingPer='+matchingPer+'&step='+step+'&dealMain='+dealMain, 
		windowName:'swip' 
	}); 
}

function comparison(){
	var rentSeq = location.href.split("?")[1].split("&")[0].split("=")[1].replace("#","");
	var hireSeq = location.href.split("?")[1].split("&")[1].split("=")[1].replace("#","");
	var matchingPer = location.href.split("?")[1].split("&")[2].split("=")[1].replace("#","");
	
var paraRequest = "";
	paraRequest += "hireSeq="+hireSeq+"&rentSeq="+rentSeq;

	$.ajax({
	    type: "POST",
	    url: "http://" + domainText + "/infobee_rental_server/transaction/comparison.do",
	    callback: "callbak",
		dataType: "jsonp",
		data: paraRequest,
	    success: function(data){
			var itemType = "";
			var viewHtml = "";
			var returnHTML = "";
			var returnRentHTML = "";
			$.each(data, function(k, v){
				$("#matchingPer").html(matchingPer+"%");
				$("#matchingPer2").css('width', matchingPer+'px');
				$("#innerComparison").css({"display":"inline"});
				
				if(k=="rent"){
					$("#rentUserName").html(v["rentUserName"]+"님");
					$("#rentUserName2").html(v["rentUserName"]+"님 임대물건 정보");
					$("#rentType").html(v["rentType"]);
					$("#rentItemType").html(v["rentItemType"]);
					$("#rentLocation").html(v["rentLocation"]);
					$("#rentPrice").html(v["rentPrice"]+"만원");
					$("#rentDData3").html(v["rentDData3"]+"㎡/"+v["rentDData4"]+"㎡");
					
					itemType = v["rentItemType_CD"];
					
				}else if(k=="hire"){
					$("#hireUserName").html(v["hireUserName"]+"님");
					$("#hireUserName2").html(v["hireUserName"]+"님 임차희망물건 정보");
					$("#hireRentType").html(v["hireRentType"]);
					$("#hireItemType").html(v["hireItemType"]);
					$("#hirePrice").html(v["hirePrice1"]+"만원 ~ "+v["hirePrice2"]+"만원");
					$("#hireLocation").html(v["hireLocation"].split("||")[0] + v["hireLocation"].split("||")[1] + v["hireLocation"].split("||")[2]);
					if(v["hireDData3"]=="000"){
						$("#hireDData3").html("상관없음");
					}else{
						$("#hireDData3").html(v["hireDData4"]+"㎡~"+v["hireDData5"]+"㎡");
					}
					
				}
				if(itemType){
					$.ajax({
				        type: "GET",
				        url: "../../rental/popup/comparison"+itemType.substring(1,3)+".html",
						callback:"callbak",
						dataType: "html",
				        success: function(html){
							if(itemType == "001"){returnHTML = comparison003(k,v,html);}	
							if(itemType == "002"){returnHTML = comparison003(k,v,html);}	
							if(itemType == "003"){returnHTML = comparison003(k,v,html);}	
							if(itemType == "004"){returnHTML = comparison003(k,v,html);}	
							if(itemType == "005"){returnHTML = comparison005(k,v,html);}	
							if(itemType == "006"){returnHTML = comparison003(k,v,html);}	
							if(itemType == "007"){returnHTML = comparison005(k,v,html);}	
							if(itemType == "008"){returnHTML = comparison003(k,v,html);}	
							if(itemType == "009"){returnHTML = comparison009(k,v,html);}	
							if(itemType == "010"){returnHTML = comparison009(k,v,html);}	
							if(itemType == "011"){returnHTML = comparison011(k,v,html);}	
							if(itemType == "012"){returnHTML = comparison012(k,v,html);}	
							if(itemType == "013"){returnHTML = comparison011(k,v,html);}	
							if(itemType == "014"){returnHTML = comparison003(k,v,html);}	
						
							$("#innerComparison").html(returnHTML);
							
							
							if(itemType == "001")comparison003_bg();	
							if(itemType == "002")comparison003_bg();	
							if(itemType == "003")comparison003_bg();	
							if(itemType == "004")comparison003_bg();	
							if(itemType == "005")comparison005_bg();	
							if(itemType == "006")comparison003_bg();	
							if(itemType == "007")comparison005_bg();	
							if(itemType == "008")comparison003_bg();	
							if(itemType == "009")comparison009_bg();	
							if(itemType == "010")comparison009_bg();	
							if(itemType == "011")comparison009_bg();	
							if(itemType == "012")comparison0012_bg();	
							if(itemType == "013")comparison0013_bg();	
						}
				    });
					
				}

			});
	    }
	});

}

function comparison003(k,v,html){
	if(k=="rent"){
		returnHTML = html.replace("@@rentDealType",v["rentDealType"]);
		returnHTML = returnHTML.replace("@@rentDData7",v["rentDData7"]);
		returnHTML = returnHTML.replace("@@rentDData8",v["rentDData8"]);
		returnHTML = returnHTML.replace("@@rentDData10",v["rentDData10"]);
		returnHTML = returnHTML.replace("@@rentDData11",v["rentDData11"]);
		returnHTML = returnHTML.replace("@@rentDData12",v["rentDData12"]);
		returnHTML = returnHTML.replace("@@rentDData13",v["rentDData13"]);
		returnHTML = returnHTML.replace("@@rentDData15",v["rentDData15"]);
	}
	if(k=="hire"){
		innerHTML = returnHTML.replace("@@hireDealType",v["hireDealType"]);
		if(v["hireDData6"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData7","상관없음");
			innerHTML = innerHTML.replace("@@hireDData8","");
		}
		else{
			innerHTML = innerHTML.replace("@@hireDData7",v["hireDData7"]+"층 이상 /");
			innerHTML = innerHTML.replace("@@hireDData8",v["hireDData8"]+"층 이상 ");
		}

		innerHTML = innerHTML.replace("@@hireDData10",v["hireDData10"]);
		innerHTML = innerHTML.replace("@@hireDData11",v["hireDData11"]);
		if(v["hireDData12"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData12","상관없음");
		}
		else{
			innerHTML = innerHTML.replace("@@hireDData12",v["hireDData12"]);
		}
		if(v["hireDData13"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData13","상관없음");
		}
		else{
			innerHTML = innerHTML.replace("@@hireDData13",v["hireDData13"]);
		}
		if(v["hireDData15"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData15","상관없음");
		}
		else{
			innerHTML = innerHTML.replace("@@hireDData15",v["hireDData15"]+"대 이상");
		}
	}		
	return innerHTML;
}

function comparison005(k,v,html){
	if(k=="rent"){
		returnHTML = html.replace("@@rentDealType",v["rentDealType"]);
		returnHTML = returnHTML.replace("@@rentDData6",v["rentDData6"]);
		returnHTML = returnHTML.replace("@@rentDData8",v["rentDData8"]);
		returnHTML = returnHTML.replace("@@rentDData9",v["rentDData9"]);
		returnHTML = returnHTML.replace("@@rentDData10",v["rentDData10"]);
		returnHTML = returnHTML.replace("@@rentDData11",v["rentDData11"]);
		returnHTML = returnHTML.replace("@@rentDData13",v["rentDData13"]);
	}
	if(k=="hire"){
		innerHTML = returnHTML.replace("@@hireDealType",v["hireDealType"]);
		innerHTML = innerHTML.replace("@@hireDData6",v["hireDData6"]);
		innerHTML = innerHTML.replace("@@hireDData8",v["hireDData8"]);
		innerHTML = innerHTML.replace("@@hireDData9",v["hireDData9"]);
		
		
		if(v["hireDData10"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData10","상관없음");
		}
		else{
			innerHTML = innerHTML.replace("@@hireDData10",v["hireDData10"]);
		}
		if(v["hireDData11"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData11","상관없음");
		}
		else{
			innerHTML = innerHTML.replace("@@hireDData11",v["hireDData11"]);
		}
		if(v["hireDData13"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData13","상관없음");
		}
		else{
			innerHTML = innerHTML.replace("@@hireDData13",v["hireDData13"]+"대 이상");
		}
	}	
	return innerHTML;
}

function comparison009(k,v,html){
	if(k=="rent"){
		returnHTML = html.replace("@@rentDealType",v["rentDealType"]);
		returnHTML = returnHTML.replace("@@rentDData7",v["rentDData7"]);
		returnHTML = returnHTML.replace("@@rentDData8",v["rentDData8"]);
		returnHTML = returnHTML.replace("@@rentDData11",v["rentDData11"]);
		returnHTML = returnHTML.replace("@@rentDData13",v["rentDData13"]);
		returnHTML = returnHTML.replace("@@rentDData15",v["rentDData15"]);
	}
	if(k=="hire"){
		innerHTML = returnHTML.replace("@@hireDealType",v["hireDealType"]);
		if(v["hireDData6"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData7","상관없음");
			innerHTML = innerHTML.replace("@@hireDData8","");
		}
		else{
			innerHTML = innerHTML.replace("@@hireDData7",v["hireDData7"]+"층 이상 /");
			innerHTML = innerHTML.replace("@@hireDData8",v["hireDData8"]+"층 이상 ");
		}
		if(v["hireDData11"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData11","상관없음");
		}
		else{
			innerHTML = innerHTML.replace("@@hireDData11",v["hireDData11"]);
		}
		if(v["hireDData13"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData13","상관없음");
		}
		else{
			innerHTML = innerHTML.replace("@@hireDData13",v["hireDData13"]);
		}
		if(v["hireDData15"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData15","상관없음");
		}
		else{
			innerHTML = innerHTML.replace("@@hireDData15",v["hireDData15"]+"대 이상");
		}
	}	
	return innerHTML;
}

function comparison011(k,v,html){
	if(k=="rent"){
		returnHTML = html.replace("@@rentDealType",v["rentDealType"]);
		returnHTML = returnHTML.replace("@@rentPremium",v["rentPremium"]);
		returnHTML = returnHTML.replace("@@rentDData7",v["rentDData7"]);
		returnHTML = returnHTML.replace("@@rentDData8",v["rentDData8"]);
		returnHTML = returnHTML.replace("@@rentDData11",v["rentDData11"]);
		returnHTML = returnHTML.replace("@@rentDData13",v["rentDData13"]);
	}
	if(k=="hire"){
		innerHTML = returnHTML.replace("@@hireDealType",v["hireDealType"]);
		innerHTML = innerHTML.replace("@@hirePremium",v["hirePremium"]);
		if(v["hireDData6"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData7","상관없음");
			innerHTML = innerHTML.replace("@@hireDData8","");
		}
		else{
			innerHTML = innerHTML.replace("@@hireDData7",v["hireDData7"]+"층 이상 /");
			innerHTML = innerHTML.replace("@@hireDData8",v["hireDData8"]+"층 이상 ");
		}
		if(v["hireDData11"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData11","상관없음");
		}
		else{
			innerHTML = innerHTML.replace("@@hireDData11",v["hireDData11"]);
		}
		if(v["hireDData13"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData13","상관없음");
		}
		else{
			innerHTML = innerHTML.replace("@@hireDData13",v["hireDData13"]+"대 이상");
		}
	}	
	return innerHTML;
}

function comparison012(k,v,html){
	if(k=="rent"){
		returnHTML = html.replace("@@rentDealType",v["rentDealType"]);
		returnHTML = returnHTML.replace("@@rentDData7",v["rentDData7"]);
		returnHTML = returnHTML.replace("@@rentDData8",v["rentDData8"]);
		returnHTML = returnHTML.replace("@@rentDData9",v["rentDData9"]);
		returnHTML = returnHTML.replace("@@rentDData10",v["rentDData10"]);
		returnHTML = returnHTML.replace("@@rentDData12",v["rentDData12"]);
		returnHTML = returnHTML.replace("@@rentDData13",v["rentDData13"]);
		returnHTML = returnHTML.replace("@@rentDData15",v["rentDData15"]);
	}
	if(k=="hire"){
		innerHTML = returnHTML.replace("@@hireDealType",v["hireDealType"]);
		if(v["hireDData6"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData7","상관없음");
			innerHTML = innerHTML.replace("@@hireDData8","");
		}
		else{
			innerHTML = innerHTML.replace("@@hireDData7",v["hireDData7"]+"층 이상 /");
			innerHTML = innerHTML.replace("@@hireDData8",v["hireDData8"]+"층 이상 ");
		}

		innerHTML = innerHTML.replace("@@hireDData9",v["hireDData9"]);
		innerHTML = innerHTML.replace("@@hireDData10",v["hireDData10"]);
		if(v["rentDData12"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData12","상관없음");
		}else{
			innerHTML = innerHTML.replace("@@hireDData12",v["hireDData12"]);
		}
		if(v["rentDData13"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData13","상관없음");
		}else{
			innerHTML = innerHTML.replace("@@hireDData13",v["hireDData13"]);
		}
		if(v["hireDData15"]=="000"){
			innerHTML = innerHTML.replace("@@hireDData15","상관없음");
		}
		else{
			innerHTML = innerHTML.replace("@@hireDData15",v["hireDData15"]+"대 이상");
		}
	}	
	return innerHTML;
}

function comparison003_bg(){
	if($("#hdata7").text()=="상관없음"){
		$("#classR7").css("background","#fffcdc");
		$("#classH7").css("background","#fffcdc");
		$("#classR7").css("color","#0060a9");
		$("#classH7").css("color","#0060a9");
	}else if($("#rdata7").text() >= $("#hdata7").text() && $("#rdata8").text() >= $("#hdata8").text()){
		$("#classR7").css("background","#fffcdc");
		$("#classH7").css("background","#fffcdc");
		$("#classR7").css("color","#0060a9");
		$("#classH7").css("color","#0060a9");
	}
	
	if($("#rdata10").text() >= $("#hdata10").text() && $("#rdata11").text() >= $("#hdata11").text()){
		$("#classR10").css("background","#fffcdc");
		$("#classH10").css("background","#fffcdc");
		$("#classR10").css("color","#0060a9");
		$("#classH10").css("color","#0060a9");
	}
	
	if($("#hdata12").text()=="상관없음"){
		$("#classR12").css("background","#fffcdc");
		$("#classH12").css("background","#fffcdc");
		$("#classR12").css("color","#0060a9");
		$("#classH12").css("color","#0060a9");
	}else if($("#rdata12").text() == $("#hdata12").text()){
		$("#classR12").css("background","#fffcdc");
		$("#classH12").css("background","#fffcdc");
		$("#classR12").css("color","#0060a9");
		$("#classH12").css("color","#0060a9");
	}
	
	if($("#hdata13").text()=="상관없음"){
		$("#classR13").css("background","#fffcdc");
		$("#classH13").css("background","#fffcdc");
		$("#classR13").css("color","#0060a9");
		$("#classH13").css("color","#0060a9");
	}else if($("#rdata13").text() == $("#hdata13").text()){
		$("#classR13").css("background","#fffcdc");
		$("#classH13").css("background","#fffcdc");
		$("#classR13").css("color","#0060a9");
		$("#classH13").css("color","#0060a9");
	}
	
	if($("#hdata15").text()=="상관없음"){
		$("#classR15").css("background","#fffcdc");
		$("#classH15").css("background","#fffcdc");
		$("#classR15").css("color","#0060a9");
		$("#classH15").css("color","#0060a9");
	}else if($("#rdata15").text() >= $("#hdata15").text()){
		$("#classR15").css("background","#fffcdc");
		$("#classH15").css("background","#fffcdc");
		$("#classR15").css("color","#0060a9");
		$("#classH15").css("color","#0060a9");
	}
}
function comparison005_bg(){
	if($("#rdata6").text() >= $("#hdata6").text()){
		$("#classR6").css("background","#fffcdc");
		$("#classH6").css("background","#fffcdc");
		$("#classR6").css("color","#0060a9");
		$("#classH6").css("color","#0060a9");
	}
	
	if($("#rdata8").text() >= $("#hdata8").text() && $("#rdata9").text() >= $("#hdata9").text()){
		$("#classR8").css("background","#fffcdc");
		$("#classH8").css("background","#fffcdc");
		$("#classR8").css("color","#0060a9");
		$("#classH8").css("color","#0060a9");
	}
	
	if($("#hdata10").text()=="상관없음"){
		$("#classR10").css("background","#fffcdc");
		$("#classH10").css("background","#fffcdc");
		$("#classR10").css("color","#0060a9");
		$("#classH10").css("color","#0060a9");
	}else if($("#rdata10").text() == $("#hdata10").text()){
		$("#classR10").css("background","#fffcdc");
		$("#classH10").css("background","#fffcdc");
		$("#classR10").css("color","#0060a9");
		$("#classH10").css("color","#0060a9");
	}
	
	if($("#hdata11").text()=="상관없음"){
		$("#classR11").css("background","#fffcdc");
		$("#classH11").css("background","#fffcdc");
		$("#classR11").css("color","#0060a9");
		$("#classH11").css("color","#0060a9");
	}else if($("#rdata11").text() == $("#hdata11").text()){
		$("#classR11").css("background","#fffcdc");
		$("#classH11").css("background","#fffcdc");
		$("#classR11").css("color","#0060a9");
		$("#classH11").css("color","#0060a9");
	}
	
	if($("#hdata13").text()=="상관없음"){
		$("#classR13").css("background","#fffcdc");
		$("#classH13").css("background","#fffcdc");
		$("#classR13").css("color","#0060a9");
		$("#classH13").css("color","#0060a9");
	}else if($("#rdata13").text() >= $("#hdata13").text()){
		$("#classR13").css("background","#fffcdc");
		$("#classH13").css("background","#fffcdc");
		$("#classR13").css("color","#0060a9");
		$("#classH13").css("color","#0060a9");
	}
}
function comparison009_bg(){
	if($("#hdata7").text()=="상관없음"){
		$("#classR7").css("background","#fffcdc");
		$("#classH7").css("background","#fffcdc");
		$("#classR7").css("color","#0060a9");
		$("#classH7").css("color","#0060a9");
	}else if($("#rdata7").text() >= $("#hdata7").text() && $("#rdata8").text() >= $("#hdata8").text()){
		$("#classR7").css("background","#fffcdc");
		$("#classH7").css("background","#fffcdc");
		$("#classR7").css("color","#0060a9");
		$("#classH7").css("color","#0060a9");
	}
	
	if($("#hdata11").text()=="상관없음"){
		$("#classR11").css("background","#fffcdc");
		$("#classH11").css("background","#fffcdc");
		$("#classR11").css("color","#0060a9");
		$("#classH11").css("color","#0060a9");
	}else if($("#rdata11").text() == $("#hdata11").text()){
		$("#classR11").css("background","#fffcdc");
		$("#classH11").css("background","#fffcdc");
		$("#classR11").css("color","#0060a9");
		$("#classH11").css("color","#0060a9");
	}
	
	if($("#hdata13").text()=="상관없음"){
		$("#classR13").css("background","#fffcdc");
		$("#classH13").css("background","#fffcdc");
		$("#classR13").css("color","#0060a9");
		$("#classH13").css("color","#0060a9");
	}else if($("#rdata13").text() >= $("#hdata13").text()){
		$("#classR13").css("background","#fffcdc");
		$("#classH13").css("background","#fffcdc");
		$("#classR13").css("color","#0060a9");
		$("#classH13").css("color","#0060a9");
	}
}
function comparison012_bg(){
	if($("#hdata7").text()=="상관없음"){
		$("#classR7").css("background","#fffcdc");
		$("#classH7").css("background","#fffcdc");
		$("#classR7").css("color","#0060a9");
		$("#classH7").css("color","#0060a9");
	}else if($("#rdata7").text() >= $("#hdata7").text() && $("#rdata8").text() >= $("#hdata8").text()){
		$("#classR7").css("background","#fffcdc");
		$("#classH7").css("background","#fffcdc");
		$("#classR7").css("color","#0060a9");
		$("#classH7").css("color","#0060a9");
	}
	
	if($("#rdata9").text() == $("#hdata9").text()){
		$("#classR9").css("background","#fffcdc");
		$("#classH9").css("background","#fffcdc");
		$("#classR9").css("color","#0060a9");
		$("#classH9").css("color","#0060a9");
	}
	
	if($("#rdata10").text() == $("#hdata10").text()){
		$("#classR10").css("background","#fffcdc");
		$("#classH10").css("background","#fffcdc");
		$("#classR10").css("color","#0060a9");
		$("#classH10").css("color","#0060a9");
	}
	
	if($("#hdata12").text()=="상관없음"){
		$("#classR12").css("background","#fffcdc");
		$("#classH12").css("background","#fffcdc");
		$("#classR12").css("color","#0060a9");
		$("#classH12").css("color","#0060a9");
	}else if($("#rdata12").text() >= $("#hdata12").text()){
		$("#classR12").css("background","#fffcdc");
		$("#classH12").css("background","#fffcdc");
		$("#classR12").css("color","#0060a9");
		$("#classH12").css("color","#0060a9");
	}
	
	if($("#hdata13").text()=="상관없음"){
		$("#classR13").css("background","#fffcdc");
		$("#classH13").css("background","#fffcdc");
		$("#classR13").css("color","#0060a9");
		$("#classH13").css("color","#0060a9");
	}else if($("#rdata13").text() >= $("#hdata13").text()){
		$("#classR13").css("background","#fffcdc");
		$("#classH13").css("background","#fffcdc");
		$("#classR13").css("color","#0060a9");
		$("#classH13").css("color","#0060a9");
	}
	
	if($("#hdata15").text()=="상관없음"){
		$("#classR15").css("background","#fffcdc");
		$("#classH15").css("background","#fffcdc");
		$("#classR15").css("color","#0060a9");
		$("#classH15").css("color","#0060a9");
	}else if($("#rdata15").text() >= $("#hdata15").text()){
		$("#classR15").css("background","#fffcdc");
		$("#classH15").css("background","#fffcdc");
		$("#classR15").css("color","#0060a9");
		$("#classH15").css("color","#0060a9");
	}
}

function comparison013_bg(){
	if($("#hdata7").text()=="상관없음"){
		$("#classR7").css("background","#fffcdc");
		$("#classH7").css("background","#fffcdc");
		$("#classR7").css("color","#0060a9");
		$("#classH7").css("color","#0060a9");
	}else if($("#rdata7").text() >= $("#hdata7").text() && $("#rdata8").text() >= $("#hdata8").text()){
		$("#classR7").css("background","#fffcdc");
		$("#classH7").css("background","#fffcdc");
		$("#classR7").css("color","#0060a9");
		$("#classH7").css("color","#0060a9");
	}
	if($("#hdata10").text()=="상관없음"){
		$("#classR10").css("background","#fffcdc");
		$("#classH10").css("background","#fffcdc");
		$("#classR10").css("color","#0060a9");
		$("#classH10").css("color","#0060a9");
	}else if($("#rdata10").text() == $("#hdata10").text()){
		$("#classR10").css("background","#fffcdc");
		$("#classH10").css("background","#fffcdc");
		$("#classR10").css("color","#0060a9");
		$("#classH10").css("color","#0060a9");
	}
	
	if($("#hdata11").text()=="상관없음"){
		$("#classR11").css("background","#fffcdc");
		$("#classH11").css("background","#fffcdc");
		$("#classR11").css("color","#0060a9");
		$("#classH11").css("color","#0060a9");
	}else if($("#rdata11").text() == $("#hdata11").text()){
		$("#classR11").css("background","#fffcdc");
		$("#classH11").css("background","#fffcdc");
		$("#classR11").css("color","#0060a9");
		$("#classH11").css("color","#0060a9");
	}
	
	if($("#hdata13").text()=="상관없음"){
		$("#classR13").css("background","#fffcdc");
		$("#classH13").css("background","#fffcdc");
		$("#classR13").css("color","#0060a9");
		$("#classH13").css("color","#0060a9");
	}else if($("#rdata13").text() >= $("#hdata13").text()){
		$("#classR13").css("background","#fffcdc");
		$("#classH13").css("background","#fffcdc");
		$("#classR13").css("color","#0060a9");
		$("#classH13").css("color","#0060a9");
	}
}




