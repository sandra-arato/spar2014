var map;
var companyList = [];
var infowindow = null;

function placeCompanyMarkers () {

	for (var i = 0, len = companyList.length; i < len; i++) {
		var thisItem = companyList[i];
		var thisLocation = companyList[i].location;


		if (thisLocation && thisLocation.length > 0) {
			var marker = new google.maps.Marker({
				map: map,
				icon: "img/marker-24.ico",
				position: companyList[i].geoloc,
				html:
					"<div>" + thisItem.companyName + "</div>" +
					"<a href='" + thisItem.url + "'>" + "Company website" + "</a>"
			});
			console.log(i, this);
			infowindow = new google.maps.InfoWindow({
				content: "placeholder"
			});
			google.maps.event.addListener(marker, 'click', function(thisItem) {
				infowindow.setContent(this.html);
				infowindow.open(map, this);
			}); 
		};

	};
}

function getDataFromSpreadsheet(json) {

	var feed = json.feed;
	var entries = feed.entry || [];
	// console.log(json)
	for (var i = 0; i < entries.length; ++i) {
		var entry = entries[i];
		var company = (entry.title.type == 'text') ? entry.title.$t : escape(entry.title.$t);
		var website = (entry['gsx$website']) ? entry.gsx$website.$t :  escape(entry.gsx$website.$t);
		var location = (entry['gsx$location']) ? entry.gsx$location.$t :  escape(entry.gsx$location.$t);
		var lng =(entry['gsx$geolongitude']) ? entry.gsx$geolongitude.$t :  escape(entry.gsx$geolongitude.$t);
		var lat = (entry['gsx$geolatitude']) ? entry.gsx$geolatitude.$t :  escape(entry.gsx$geolatitude.$t);
		var geoloc = new google.maps.LatLng(lat, lng);

		var thisCompany = {
			"companyName": company,
			"url": "http://" + website,
			"location": location,
			"geoloc": geoloc
		}
		companyList.push(thisCompany);
	}
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
}


function initialize() {
	var placeInit = [38.79555,-104.84136];
	firstMapLoad(placeInit);
	placeCompanyMarkers();
	
}

$(document).ready(initialize);
