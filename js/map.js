// SET MAP CENTER
var map;
var berlin = new google.maps.LatLng( 52.530316, 13.405186 );

// CREATE THE MAP
function initialize() {
  var mapOptions = {
    zoom: 14,
    center: berlin
  };
  map = new google.maps.Map( document.getElementById( 'map-canvas' ),
          mapOptions );
}

google.maps.event.addDomListener( window, 'load', initialize );
