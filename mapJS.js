function setCookie(cname, cvalue) {
  localStorage.setItem(cname, cvalue);
}

function getCookie(cname) {
  return localStorage.getItem(cname);
}

function login(){
	var username = $("#usrnme").val();
	if (username == ""){
		$("#errMsg").html("Invalid username!");
		return;
	}
	var usrs = getCookie("users");
	usrs = JSON.parse(usrs);
	console.log(usrs);
	if (usrs[username] != null){
		if (mode != 1){
			if (usrs[username] == $("#pswrd").val()){
				window.location.href = "loggedIn.html";
				return;
			}
			$("#errMsg").html("Incorrect password!");
			return;
		}else{
			setCookie("username", username);
			setCookie("mode", "login");
			window.location.href = "mapLogin.html";
		}
	}else{
		$("#errMsg").html("Invalid username!");
	}
	
}

function register(){
	var username = $("#usrnme").val();
	if (username == ""){
		alert("Invalid username");
		return;
	}
	if (checkUserExists(username)){
		$("#errMsg").html("Username already taken!");
		return;
	}
	if (mode != 1){
		setCookie("username", username);
		var usrs = getCookie("users");
		usrs = JSON.parse(usrs);
		usrs[getCookie("username")] = $("#pswrd").val();
		setCookie("users", JSON.stringify(usrs));
		window.location.href = "loggedIn.html";
		return;
	}
	setCookie("username", username);
	setCookie("mode", "register");
	window.location.href = "mapLogin.html";
}

if (getCookie("users") == null){
	setCookie("users", "{}");
}

if (getCookie("locations") == null){
	setCookie("locations", "{}");
}

function checkUserExists(username){
	var usrs = getCookie("users");
	usrs = JSON.parse(usrs);
	return (usrs[username] != null);
}

function registerLocation(){
	if (getCookie("latLng") == ""){
		alert("Please select a location");
		return;
	}
	var locs = getCookie("locations");
	locs = JSON.parse(locs);
	locs[getCookie("username")] = getCookie("latLng");
	setCookie("locations", JSON.stringify(locs));

	var usrs = getCookie("users");
	usrs = JSON.parse(usrs);
	usrs[getCookie("username")] = getCookie("username");
	setCookie("users", JSON.stringify(usrs));

	window.location.href = "loggedIn.html";
	
}

function loginLocation(){
	if (getCookie("latLng") == ""){
		alert("Please select a location");
		return;
	}
	var locs = getCookie("locations");
	locs = JSON.parse(locs);
	var latLng = locs[getCookie("username")];
	console.log("latlng");
	console.log(JSON.parse(latLng));

	var selected = JSON.parse(getCookie("latLng"));

	latLng = JSON.parse(latLng);

	var latDist = Math.abs(selected["lat"] - latLng["lat"]);
	var lngDist = Math.abs(selected["lng"] - latLng["lng"]);

	var dist = latDist + lngDist;

	if (dist < 10){ // Set allowed distance here!
		window.location.href = "loggedIn.html";
	}else{
		$(".mapError").html("Incorrect Location!");
	}
}

var mode = 1;

function switchMode(){
	$("#pswrd").toggle();
	if (mode == 1){
		$(".modeSwitch").html("Switch to Location Mode");
		$('#pswrd').css('visibility','visible');
		$('#pswrd').css('display','block');
		mode = 2;
	}else{
		$(".modeSwitch").html("Switch to Password Mode");
		$('#pswrd').css('visibility','hidden');
		$('#pswrd').css('display','none');
		mode = 1;
	}
	
}

function logout(){
	window.location.href = "index.html";
}