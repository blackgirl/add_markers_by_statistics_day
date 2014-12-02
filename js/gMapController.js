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

    var neighborhoods = [];
    var marker;
	var iterator = 0;
	var neighborhoods = [];
		// DROP EACH MARKER
	function drop() {
		var data = global.scopes.formatData.fullData;
		for ( var i = 0; i < data.length; i++ ) {
			// SET MARKERS POSITION
			neighborhoods = [];

		neighborhoods = 
	[
	  new google.maps.LatLng(52.530316, 13.410286),
	  new google.maps.LatLng(52.533616, 13.407686),
	  new google.maps.LatLng(52.530216, 13.409786),
	  new google.maps.LatLng(52.528516, 13.410006),
	  new google.maps.LatLng(52.530416, 13.404786),

	  new google.maps.LatLng(52.530716, 13.410006),
	  new google.maps.LatLng(52.530416, 13.409886),
	  new google.maps.LatLng(52.530516, 13.413006),
	  new google.maps.LatLng(52.532416, 13.408986),
	  new google.maps.LatLng(52.530516, 13.406006),

	  new google.maps.LatLng(52.528416, 13.409786),
	  new google.maps.LatLng(52.531616, 13.411306),
	  new google.maps.LatLng(52.530416, 13.405886),
	  new google.maps.LatLng(52.529516, 13.414006),
	  new google.maps.LatLng(52.530416, 13.406786),

	  // new google.maps.LatLng(52.530216, 13.409906),
	  // new google.maps.LatLng(52.530416, 13.407786),
	  // new google.maps.LatLng(52.530616, 13.410106),
	  // new google.maps.LatLng(52.530316, 13.411886),
	  // new google.maps.LatLng(52.529516, 13.410000),
	];
			(function(ii){
				setTimeout( function() {
					setTimeout( function() {
						if($('.days.active').length) $('.days').removeClass('active');
						$( ".days."+ii ).addClass('active');
					}, ii * 300 );
					drop1();
				}, ii * 400 );
				
			})(i);
		}
	}
	function drop1() {
	    for ( var i = 0; i < neighborhoods.length; i++ ) {
      		setTimeout( function() {
        		addMarker();
      		}, i * 400 );
	  	}
	}

	// CREATE EACH MARKER
	function addMarker() {
		if(iterator==neighborhoods.length) {
			iterator = 0;
			marker.setMap( null );
			return false;
		}
		if(iterator%3)
	  		$('#circle').trigger('click');
	  	if( marker ) marker.setMap( null );

	  	marker = new google.maps.Marker({
		    position: neighborhoods[iterator],
		    map: map,
		    draggable: false,
		    icon: new google.maps.MarkerImage(
		        "http://chart.googleapis.com/chart?chst=d_bubble_text_small&chld=bb|Label%20"+iterator+"|FF8080|000000",
		        null, null, new google.maps.Point(0, 42)),
		    shadow: new google.maps.MarkerImage(
		        "http://chart.googleapis.com/chart?chst=d_bubble_text_small_shadow&chld=bb|Label%20"+iterator,
		        null, null, new google.maps.Point(0, 45)),
	  	});
		iterator++;
	};

// var berlin = new google.maps.LatLng( data[0][0].Latitude, data[0][0].Longitude );
// };