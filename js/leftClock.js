function getTime() {
	var d = new Date();
	var hours = d.getHours();
	var minute = d.getMinutes();
	var seconds = d.getSeconds();	
	var hourRotate;
	var minRotate;
	var secRotate;
	
	hours = (( hours > 12 ) ? hours - 12 : hours );
	if( minute === 0 ) {
		minRotate = 0;
	} else {
		minRotate = minute*6;
	}
	if( seconds === 0 ) {
		secRotate = 0;
	} else {
		secRotate = seconds*6;
	}
	if( hours === 12 ) {
		hourRotate = 0;
	} else {
		hourRotate = (hours*30) + (minute/2);
	}
	//document.write( hourRotate + ":" + minRotate +  ":" + secRotate);
	var srotate = "rotate(" + secRotate + "deg)";
	$("#sechand").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});
	var hrotate = "rotate(" + hourRotate + "deg)";
	$("#hourhand").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});
	var mrotate = "rotate(" + minRotate + "deg)";
	$("#minhand").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});
}