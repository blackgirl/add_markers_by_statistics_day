// function gMapController( $scope ) {
	
	// $scope.safeApply = function (fn) {
 //        var phase = this.$root.$$phase;
 //        if (phase == '$apply' || phase == '$digest') {
 //            if (fn && (typeof (fn) === 'function')) {
 //                fn();
 //            }
 //        } else {
 //            this.$apply(fn);
 //        }
 //    };
 	var data;
    var marker;
    var markers = [];
	var iterator = 0;
	var neighborhoods = [];

	function fillLocations( d ) {
		data = d;
		for ( var i = 0; i < data.countSms; i++ ) {
			neighborhoods.push( data[i].Position );
		}
		drop();
	}

	// DROP EACH MARKER
	function drop() {
	    for ( var i = 0; i < neighborhoods.length; i++ ) {
      		setTimeout( function() {
        		addMarker();
      		}, i * 100 );
	  	}
	}

// left panel clock method
function getMarkerTime( d ) {
	// d = [day, mon, year, hours, minutes, seconds];
	var date = d;
	var hours = d[3];
	var minute = d[4];
	// var seconds = d[5];
	var hourRotate;
	var minRotate;
	// var secRotate;
	
	hours = (( hours > 12 ) ? hours - 12 : hours );
	if( minute === 0 ) {
		minRotate = 0;
	} else {
		minRotate = minute*6;
	}
	// if( seconds === 0 ) {
	// 	secRotate = 0;
	// } else {
	// 	secRotate = seconds*6;
	// }
	if( hours === 12 ) {
		hourRotate = 0;
	} else {
		hourRotate = (hours*30) + (minute/2);
	}
	//document.write( hourRotate + ":" + minRotate +  ":" + secRotate);
	// var srotate = "rotate(" + secRotate + "deg)";
	// $("#sechand").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});
	var hrotate = "rotate(" + hourRotate + "deg)";
	$("#hourhand").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});
	var mrotate = "rotate(" + minRotate + "deg)";
	$("#minhand").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});
}


	// CREATE EACH MARKER
	function addMarker() {
	  	// if( marker ) marker.setMap( null );
	  	// map.setCenter(neighborhoods[iterator]);
	  	marker = new google.maps.Marker({
		    position: neighborhoods[iterator],
		    map: map,
		    draggable: false,
		    // icon: "img/orange-circle-icon.png",
		    icon: new google.maps.MarkerImage(
		        "img/orange-circle-icon.png",
		        null, null,
		        new google.maps.Point(0, 10),
		        new google.maps.Size(10, 10)),
		    // shadow: new google.maps.MarkerImage(
		    //     "http://chart.googleapis.com/chart?chst=d_bubble_text_small_shadow&chld=bb|Label%20"+iterator,
		    //     null, null, new google.maps.Point(0, 45)),
		    animation: google.maps.Animation.DROP,
	  	});
        // markers.push(marker);
  		getMarkerTime( data[iterator].SmsDateTime );
		iterator++;
		// if(iterator == neighborhoods.length) {
			  // var markerCluster = new MarkerClusterer(map, markers);
		// }
	};
// };