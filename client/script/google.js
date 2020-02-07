var marker
var map
var directionsService
var directionsRenderer
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: false,
    center: {lat: -6.2607134, lng: 106.7794221},
    
  });
  map.setZoom(20)
  marker = new google.maps.Marker({
      position: {lat: -6.2607134, lng: 106.7794221},
      map: map,
      title: "Let's Eat"
    });
    directionsRenderer.setMap(map);
}
    
    
function calcRoute(newLat,newLng) {
  myLatlng = new google.maps.LatLng(newLat,newLng);
  var request = {
    origin: {lat: -6.2607134, lng: 106.7794221},
    destination: myLatlng,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      // directionsRenderer.setDirections(result);
      new google.maps.DirectionsRenderer({
        map: map,
        directions: result,
        suppressMarkers: true
    });
    var leg = result.routes[0].legs[0];
    makeMarker(leg.start_location, iconBase + 'man.png', "title", map);
    makeMarker(leg.end_location, iconBase + 'dining.png', 'title', map);
    }
  });
}

function makeMarker(position, icon, title, map) {
  new google.maps.Marker({
      position: position,
      map: map,
      icon: icon,
      title: title
  });
}

function newLocation(newLat,newLng)
{
  myLatlng = new google.maps.LatLng(newLat,newLng);
	map.setCenter(myLatlng);
  //marker.setPosition(myLatlng)
}

