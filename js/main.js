var map;
var geocoder;
var companyList = [];

function callBackFunction(json) {
	console.log("hello call back function");

	var feed = json.feed;
    var entries = feed.entry || [];
    var html = ['<ul>'];

    for (var i = 0; i < entries.length; ++i) {
      var entry = entries[i];
      var company = (entry.title.type == 'html') ? entry.title.$t : escape(entry.title.$t);
      var website = (entry['gsx$website']) ? entry.gsx$website.$t :  escape(entry.gsx$website.$t);
      var location = (entry['gsx$location']) ? entry.gsx$location.$t :  escape(entry.gsx$location.$t);
      var thisCompany = {
      	"companyName": company,
      	"url": "http://" + website,
      	"location": location 
      }
      companyList.push(thisCompany);
    }

    console.log(companyList);
}

function codeAddress(place) {
	
	geocoder.geocode( { 'address': place}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			});
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}

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
		zoom: 2,
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
	geocoder = new google.maps.Geocoder();
	codeAddress("Colorado Springs, Colorado");
}


function initialize() {
	var placeInit = [38.79555,-104.84136];
	firstMapLoad(placeInit);
	
}

$(document).ready(initialize);
