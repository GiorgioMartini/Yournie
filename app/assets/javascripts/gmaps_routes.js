var artRouteCoordinates = [
    new google.maps.LatLng( 52.503143,  13.412260),
    new google.maps.LatLng( 52.500228,  13.423025),
    new google.maps.LatLng( 52.501192,  13.423784),
    new google.maps.LatLng( 52.500767,  13.425243)
  ];





function initialize() {
        var mapOptions = {
          center: { lat:   52.502541, lng:   13.412209},
          zoom: 14,
          styles: [{featureType:'all',stylers:[{saturation:-100},{gamma:0.50}]}]
                

        };
     
    map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

	printAllMarkers();
}


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




function makeStopArray(stops) {

	var arrayoflatlongs = stops.map(function(stop){
		return new google.maps.LatLng(stop.stop_lat,stop.stop_long);

	});
	return arrayoflatlongs;
}


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





	function add_marker(myMarker){
		var marker = new google.maps.Marker({
		      position: myMarker,
		      map: map,
	   
 		});		
	}





	function printAllMarkers () { 
		url = window.location.href+'.json';
		console.log(url);
		$.get(url, function(data){
			
			data.stops.forEach(function(stop){
				stop.stop_lat
				stop.stop_long	



				console.log(stop.stop_lat);
				console.log(stop.stop_long);

				var latlong = new google.maps.LatLng(stop.stop_lat,stop.stop_long);
				add_marker(latlong);
					


			})
			
			var stopLatLongs = makeStopArray(data.stops);

	 		draw_route( stopLatLongs );

		});
	}



   

google.maps.event.addDomListener(window, 'load', initialize);
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

	





