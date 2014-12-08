// SET MAP CENTER
var map;
// var markers;
// var center = global.scopes.formatData.center;
center = new google.maps.LatLng( 60.943107, 6.811523 );

// CREATE THE MAP
function initialize() {
  var mapOptions = {
    zoom: 6,
    disableDefaultUI: true,
    center: center,
    noClear: true,
  };
  map = new google.maps.Map( document.getElementById( 'map-canvas' ),
          mapOptions );

  // var markerCluster = new MarkerClusterer(map, markers);
  // var content = /** @type {HTMLInputElement} */(
  //     document.getElementById('wrapper'));
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(content);
}

google.maps.event.addDomListener( window, 'load', initialize );