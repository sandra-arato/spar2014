var map;
var geocoder;

function firstMapLoad (currentPlace) {

	var MY_MAPTYPE_ID = 'custom_style';
	var featureOpts = [
		{
			"featureType": "water",
			"stylers": [
			{ "visibility": "on" },
			{ "color": "#003466" }
			]
		},{
			"featureType": "landscape",
			"stylers": [
			{ "visibility": "on" },
			{ "color": "#ffffff" }
			]
		},{
			"featureType": "transit",
			"stylers": [
			{ "visibility": "on" },
			{ "color": "#ffffff" }
			]
		},{
			"featureType": "road",
			"stylers": [
			{ "visibility": "on" },
			{ "color": "#ffffff" }
			]
		},{
			"featureType": "administrative.province",
			"stylers": [
			{ "visibility": "on" },
			{ "color": "#ffffff" }
			]
		},{
			"featureType": "administrative.land_parcel",
			"stylers": [
			{ "visibility": "on" },
			{ "color": "#ffffff" }
			]
		},{
			"featureType": "poi",
			"stylers": [
			{ "visibility": "on" },
			{ "color": "#ffffff" }
			]
		}
	]
	
	var styledMapOptions = {
		name: 'Custom Style'
	};

	var mapOptions = {
		zoom: 1,
		center: new google.maps.LatLng(currentPlace[0],currentPlace[1]),
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		overviewMapControl: false,
		disableDoubleClickZoom: false,
		draggable: true,
		scrollwheel: true,
		mapTypeControlOptions: {
			mapTypeIds: [
				google.maps.MapTypeId.ROADMAP,
				MY_MAPTYPE_ID
			]
		},
		mapTypeId: MY_MAPTYPE_ID
	};

	var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
	placeMarkers();
}


function initialize() {
	var placeInit = [38.79555,-104.84136];
	firstMapLoad(placeInit);
	
}

$(document).ready(initialize);
