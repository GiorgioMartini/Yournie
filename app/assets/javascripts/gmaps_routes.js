// var artRouteCoordinates = [
//     new google.maps.LatLng( 52.503143,  13.412260),
//     new google.maps.LatLng( 52.500228,  13.423025),
//     new google.maps.LatLng( 52.501192,  13.423784),
//     new google.maps.LatLng( 52.500767,  13.425243)
//   ];
/*


***********************
*=Variables
***********************
*/


var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var markerArray = [];

/*
***********************
*=Initialize
***********************
*/

function initialize() {
		//Create new DirectionsRenderer
		directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers:true});

        var mapOptions = {
          center: { lat:   52.502541, lng:   13.412209},
          zoom: 14,
          styles: [{featureType:'all',stylers:[{saturation:-100},{gamma:0.50}]}]
                

        };
    // Create new Map in the map-canvas ID
    map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

	renderRoute();

	// Directions Display
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
}

/*
***********************
*=Functions
***********************
*/

function add_marker(myMarker){
	var categoryUrl = "/icons/"+ myMarker.categories[0]+".png";
	
	var stopPosition = new google.maps.LatLng( myMarker.stop_lat,  myMarker.stop_long);


	 marker = new google.maps.Marker({
	      position: stopPosition,
	      map: map,
	      icon: categoryUrl
   
		});	

	 
	 markerArray.push(marker);
		
}


function renderRoute() { 
	url = window.location.href+'.json';
	$.get(url, function(data){
		
		
		var stopLatLongs = makeStopArray(data.stops);

 		// draw_route( stopLatLongs );
 		drawDirectionRoute( stopLatLongs );
// 		drawMarkers(stopLatLongs);
 		drawMarkers( data.stops );
	});
}


// For each stopData apply the function addMarker
function drawMarkers(stopData) {
	stopData.forEach(function(stop){	
			add_marker(stop);
		})
}


function makeStopArray(stops) {

	var arrayoflatlongs = stops.map(function(stop){
		return new google.maps.LatLng(stop.stop_lat,stop.stop_long);

	});
	return arrayoflatlongs;
}


// function draw_route(listOfMarkers) {
// var routePath = new google.maps.Polyline({
// 	    path: listOfMarkers,
// 	    geodesic: true,
// 	    strokeColor: '#2cd000',
// 	    strokeOpacity: 1.0,
// 	    strokeWeight: 2
// 	  });
// 	routePath.setMap(map);
// }


function drawDirectionRoute (markers) {
	var request = {
	origin: markers[0],
	destination: markers[markers.length-1], 
	waypoints: createWaypoints(markers),
	optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.WALKING
	
	}
	
	directionsService.route(request, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(response);
	    }
	})      
}

function createWaypoints(stops){
	return stops.map(function(stop){
		var waypoint = {
			location: stop,
			stopover:false
		}
			return waypoint;

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

// Carousel event for Gmaps

$("#stops-carousel").on("after-slide-change.fndtn.orbit", function(event, orbit) {
  //console.info(event);
  //$('.stop_img_wrapper h2').html('woooohooo');

  	//console.info("slide " + orbit.slide_number + " of " + orbit.total_slides);


	

 var stopPos = markerArray[orbit.slide_number].getPosition()
	
	console.log(stopPos);
	//add_marker(stopPos);
  
  //Print out the lat of each marker depending which slide/stop is shown
  //console.log('The stop number'+orbit.slide_number+'has a lat of: '+markerArray[orbit.slide_number].getPosition().lat());
  // center on each marker depending which slide/stop is shown
  //map.setCenter(markerArray[orbit.slide_number].getPosition());
});	





