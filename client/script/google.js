var marker
var map
var directionsService
var directionsRenderer
function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: false,
    center: {lat: -6.2607134, lng: 106.7794221},
    zoom: 18
  });
  
  marker = new google.maps.Marker({
      position: {lat: -6.2607134, lng: 106.7794221},
      map: map,
      title: 'Hello World!'
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
      directionsRenderer.setDirections(result);
    }
  });
}

function newLocation(newLat,newLng)
{
  myLatlng = new google.maps.LatLng(newLat,newLng);
	map.setCenter(myLatlng);
  marker.setPosition(myLatlng)
}

