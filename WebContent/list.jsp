<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
 
  <head>
    <link href="http://s3.amazonaws.com/codecademy-content/courses/ltp/css/shift.css" rel="stylesheet">
    <link rel="stylesheet" href="http://s3.amazonaws.com/codecademy-content/courses/ltp/css/bootstrap.css">
    <link rel="stylesheet" href="main.css">
  </head>
 
  <body>
    <div class="PPOMPPU">
      <div class="container">
        <h1>PPOMPPU</h1>
        <p>사람이 좋아 함께하는 곳..뽐뿌!</p>
      </div>
    </div>
    
    <div class="nav2">
      <div class="container">
        <ul class="pull-left">
            <li><a href="#">뽐뿌</li>
            <li><a href="#">이벤트</li>
            <li><a href="#">정보</li>
            <li><a href="#">커뮤니티</li>
            <li><a href="#">갤러리</li>
            <li><a href="#">장터</li>
            <li><a href="#">포럼</li>
            <li><a href="#">소셜커머스</li>
        </ul>
        <ul class="pull-right">
          <li><a href="#">회원가입</a></li>
          <li><a class="login_button" id="loginButton" value="Log in" onclick=window.open("login/loginWindow.jsp","Ratting","width=550,height=170,left=150,top=200,toolbar=0,status=0,")>로그인</button></li>
          <li><a href="#">Help</a></li>
        </ul>
      </div>
    </div>
    
    <div class="apologize">
      <div class="thumbnail">
        <img src="http://img1.ppomppu.co.kr/zboard/data3/banner/main/150912213057.gif">
      </div>
    </div>
    
    <div class="jumbotron">
      <div class="container">
        <h1>look for a place to stay.</h1>
        <p>Rent from people in over 34,000 cities and 192 countries.</p>
        <a href="#">Learn More</a>
      </div>
    </div> 
    <div class="neighborhood-guides">
      <div class="container">
        <h2>Neighborhood Guides</h2>
        <p>Not sure where to stay? We've created neighborhood guides for cities all around the world</p>
        <div class="row">
          <div class="col-md-4">
            <div class="thumbnail">
              <img src="http://goo.gl/0sX3jq">
            </div>
            <div class="thumbnail">
              <img src="http://goo.gl/an2HXY">
            </div>
          </div>
          <div class="col-md-4">
            <div class="thumbnail">
              <img src="http://goo.gl/Av1pac">
            </div>
            <div class="thumbnail">
              <img src="http://goo.gl/vw43v1">
            </div>
          </div>
          <div class="col-md-4">
            <div class="thumbnail">
              <img src="http://goo.gl/0Kd7UO">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="learn-more">
	  <div class="container">
		<div class="row">
	      <div class="col-md-4">
			<h3>Travel</h3>
			<p>From apartments and rooms to treehouses and boats: stay in unique spaces in 192 countries.</p>
			<p><a href="#">See how to travel on Airbnb</a></p>
	      </div>
		  <div class="col-md-4">
			<h3>Host</h3>
			<p>Renting out your unused space could pay your bills or fund your next vacation.</p>
			<p><a href="#">Learn more about hosting</a></p>
		  </div>
		  <div class="col-md-4">
			<h3>Trust and Safety</h3>
			<p>From Verified ID to our worldwide customer support team, we've got your back.</p>
			<p><a href="#">Learn about trust at Airbnb</a></p>
		  </div>
	    </div>
	  </div>
	</div>
  </body>
</html>