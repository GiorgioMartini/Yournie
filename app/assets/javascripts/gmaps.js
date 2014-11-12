function init_map(){
	map_element = $('#map')[0];

	var opts = {
		zoom:5,
		center: new google.maps.LatLng(52,13)
	};

	map = new google.maps.Map(map_element,opts);
}