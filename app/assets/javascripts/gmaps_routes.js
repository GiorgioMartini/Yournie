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

var rendererOptions = {
      suppressMarkers: true
      // strokeColor: '#FF0000',
      // strokeOpacity: 1.0,
      // strokeWeight: 10
    };

/*
***********************
*=Initialize
***********************
*/

function initialize() {
		//Create new DirectionsRenderer
		directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

        var mapOptions = {
          zoom: 8,
          disableDefaultUI: true,
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
 		drawDirectionRoute(stopLatLongs);
		//drawMarkers(stopLatLongs);
 		drawMarkers(data.stops );
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
  travelMode: google.maps.TravelMode.WALKING,

	
	}
	
	directionsService.route(request, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(response);

	     google.maps.event.addListenerOnce(map, 'idle', function(){
	     
	  //  var myBounds = map.getBounds();
		// myFitBounds(map,myBounds);
		// mapZoom = map.getZoom();
		// mapZoom = mapZoom+1;
		// map.setZoom(mapZoom); 

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




function myFitBounds(myMap, bounds) {
    myMap.fitBounds(bounds); // calling fitBounds() here to center the map for the bounds

    var overlayHelper = new google.maps.OverlayView();
    overlayHelper.draw = function () {
        if (!this.ready) {
            var extraZoom = getExtraZoom(this.getProjection(), bounds, myMap.getBounds());
            if (extraZoom > 0) {
                myMap.setZoom(myMap.getZoom() + extraZoom);
            }
            this.ready = true;
            google.maps.event.trigger(this, 'ready');
        }
    };
    overlayHelper.setMap(myMap);
}

function getExtraZoom(projection, expectedBounds, actualBounds) {

    // in: LatLngBounds bounds -> out: height and width as a Point
    function getSizeInPixels(bounds) {
        var sw = projection.fromLatLngToContainerPixel(bounds.getSouthWest());
        var ne = projection.fromLatLngToContainerPixel(bounds.getNorthEast());
        return new google.maps.Point(Math.abs(sw.y - ne.y), Math.abs(sw.x - ne.x));
    }

    var expectedSize = getSizeInPixels(expectedBounds),
        actualSize = getSizeInPixels(actualBounds);

    if (Math.floor(expectedSize.x) == 0 || Math.floor(expectedSize.y) == 0) {
        return 0;
    }

    var qx = actualSize.x / expectedSize.x;
    var qy = actualSize.y / expectedSize.y;
    var min = Math.min(qx, qy);

    if (min < 1) {
        return 0;
    }

    return Math.floor(Math.log(min) / Math.LN2 /* = log2(min) */);
}


function printDescription (slideNumber){
	var hiddenDescArray = $(".hiddenDescriptions");
	var descriptionHtml = hiddenDescArray[slideNumber].innerHTML;
	$(".show-description").html(descriptionHtml);
}

function printName (slideNumber){
  var hiddenNameArray = $(".hiddenName");
  var nameHtml = hiddenNameArray[slideNumber].innerHTML;
  $(".show-name").html(nameHtml);
}




google.maps.event.addDomListener(window, 'load', initialize);


// Carousel event for Gmaps
$("#stops-carousel").on("after-slide-change.fndtn.orbit", function(event, orbit) {
drawHighlightMarker(orbit.slide_number);
printDescription(orbit.slide_number);
printName(orbit.slide_number);
});







