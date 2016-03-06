/* domain */
function getDomain(){
	return "localhost:8080";
}

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
