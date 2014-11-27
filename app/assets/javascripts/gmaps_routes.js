// var artRouteCoordinates = [
//     new google.maps.LatLng( 52.503143,  13.412260),
//     new google.maps.LatLng( 52.500228,  13.423025),
//     new google.maps.LatLng( 52.501192,  13.423784),
//     new google.maps.LatLng( 52.500767,  13.425243)
//   ];
/*

***********************
*=Global Vars
***********************
*/

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var markerArray = [];
var highlightMarker;

/*
***********************
*=Initialize
***********************
*/

function initialize() {
		//Create new DirectionsRenderer
		directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers:true});

        var mapOptions = {
          zoom: 8,
          disableDefaultUI: true,
          draggable: false,
          styles: [{featureType:'all',stylers:[{saturation:-100},{gamma:0.50}]}]
        };
    // Create new Map in the map-canvas ID
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	// Directions Display
  	directionsDisplay.setMap(map);
	renderRoute();
}

/*
***********************
*=Functions
***********************
*/

function add_marker(myMarker){
	var categoryUrl = "/icons/"+ myMarker.categories[0]+".png";
	var stopPosition = new google.maps.LatLng( myMarker.stop_lat,  myMarker.stop_long);


	 var marker = new google.maps.Marker({
	      position: stopPosition,
	      map: map,
	      icon: categoryUrl
	
		});	
	 markerArray.push(marker);		
}




function renderRoute() { 
	url = '/routes/'+route_id+'.json';
	console.log(url)
	$.get(url, function(data){
		
		  stopLatLongs = makeStopArray(data.stops);
 		// draw_route( stopLatLongs );
 		drawDirectionRoute( stopLatLongs );
		//drawMarkers(stopLatLongs);
 		drawMarkers( data.stops );
 		drawHighlightMarker(0);
		printDescription(0);

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

	     google.maps.event.addListenerOnce(map, 'idle', function(){

		mapZoom = map.getZoom();
		mapZoom = mapZoom+2;
		map.setZoom(mapZoom); 

		});

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






function drawHighlightMarker (markerNumber) {
var stopPos = markerArray[markerNumber].getPosition();
	
	if (highlightMarker){
	highlightMarker.setMap(null);		
	};

	highlightMarker = new google.maps.Marker({
	      position: stopPos,
	      map: map
	      // todo: zIndex: 100
	      //icon: categoryUrl
	});
	highlightMarker.setAnimation(google.maps.Animation.BOUNCE);
}


function printDescription (slideNumber){
	var hiddenDescArray = $(".hiddenDescriptions");
	var descriptionHtml = hiddenDescArray[slideNumber].innerHTML;
	$(".show-description").html(descriptionHtml);
}


google.maps.event.addDomListener(window, 'load', initialize);


// Carousel event for Gmaps
$("#stops-carousel").on("after-slide-change.fndtn.orbit", function(event, orbit) {
drawHighlightMarker(orbit.slide_number);
printDescription(orbit.slide_number);
});







