var artRouteCoordinates = [
    new google.maps.LatLng( 52.503143,  13.412260),
    new google.maps.LatLng( 52.500228,  13.423025),
    new google.maps.LatLng( 52.501192,  13.423784),
    new google.maps.LatLng( 52.500767,  13.425243)
  ];



function initialize() {
        var mapOptions = {
          center: { lat:   52.502541, lng:   13.412209},
          zoom: 12,
          styles: [{featureType:'all',stylers:[{saturation:-100},{gamma:0.50}]}]
                

        };
     
    map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);


    getStopLatAndAddMarker();



	draw_route(artRouteCoordinates);
	// artRouteCoordinates.forEach(add_marker);
	getAllStops();
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

	function add_marker(myMarker){
		var marker = new google.maps.Marker({
		      position: myMarker,
		      map: map,
	   
 		});		
	}



	function getAllStops () { 
		url = window.location.href+'.json';
		console.log(url);
		$.get(url, function(data){
	
			data.stops.forEach(function(stop){

				stop.stop_lat
				stop.stop_long	

				console.log(stop.stop_lat);
				console.log(stop.stop_long);
				latlong = new google.maps.LatLng(stop.stop_lat,stop.stop_long);
				add_marker(latlong);
			})

		});
	}



    function getStopLatAndAddMarker(){
	    $.get('http://localhost:3000/routes/70.json', function(data){
			console.log(data.stops[4].stop_lat);
			console.log(data.stops[4].stop_long);

			latlong = new google.maps.LatLng( data.stops[4].stop_lat,
			data.stops[4].stop_long);

			add_marker(latlong);

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

	





