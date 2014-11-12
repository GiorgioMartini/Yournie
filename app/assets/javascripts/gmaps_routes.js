	var artRouteCoordinates = [
	    new google.maps.LatLng( 52.503143,  13.412260),
	    new google.maps.LatLng( 52.500228,  13.423025),
	    new google.maps.LatLng( 52.501192,  13.423784),
	    new google.maps.LatLng( 52.500767,  13.425243)
	  ];


function initialize() {
        var mapOptions = {
          center: { lat:   52.502541, lng:   13.412209},
          zoom: 12
        };
     
    var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
	draw_route(artRouteCoordinates);
}


	// function to draw lines
function draw_route(listOfMarkers) {
var routePath = new google.maps.Polyline({
	    path: listOfMarkers,
	    geodesic: true,
	    strokeColor: '#2cd000',
	    strokeOpacity: 1.0,
	    strokeWeight: 2
	  });
	routePath.setMap(map);
}


	// var routePath = new google.maps.Polyline({
	//     path: artRouteCoordinates,
	//     geodesic: true,
	//     strokeColor: '#2cd000',
	//     strokeOpacity: 1.0,
	//     strokeWeight: 2
	//   });


	// var marker = new google.maps.Marker({
 //      position: artRouteCoordinates[0],
 //      map: map,
 //      title: 'Hello World!'
 //  });

	
	// artRouteCoordinates.forEach(function(myMarker){
	// var marker = new google.maps.Marker({
	//       position: myMarker,
	//       map: map,
	   
	// });
 //  });



google.maps.event.addDomListener(window, 'load', initialize);






