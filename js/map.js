// SET MAP CENTER
var map;
// var center = global.scopes.formatData.center;
center = new google.maps.LatLng( 52.530316, 13.405186 );

// CREATE THE MAP
function initialize() {
  var mapOptions = {
    zoom: 14,
    center: center
  };
  map = new google.maps.Map( document.getElementById( 'map-canvas' ),
          mapOptions );
}

google.maps.event.addDomListener( window, 'load', initialize );