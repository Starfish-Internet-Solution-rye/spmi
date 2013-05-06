$(document).ready(function(){
	Cufon.replace('h1,h2', { fontFamily: 'HoeflerTitling' });
	Cufon.replace('h3 small,.pageLinks', { fontFamily: 'DIN Medium Bold' });
	
	initializeMap();// <-- INITIALIZES THE MAP
});


//SCRIPT FOR GOOGLE MAPS
function initializeMap() {
	var map;
	var starfish = new google.maps.LatLng(14.5635,121.012220);
	
	var stylez = [
	              {
	                featureType: "all",
	                elementType: "all",
	                stylers: [
	                  { saturation: -100 } // <-- THIS MAKES THE MAP BLACK AND WHITE
	                ]
	              }
	          ];

	          var mapOptions = {
	              zoom: 17,
	              center: starfish,
	              panControl: false,
	              zoomControl: false,
	              scaleControl: false,
	              mapTypeControlOptions: {
	                   mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'tehgrayz']
	              }
	          };

	map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

	//ADDS CUSTOM MARKER
	var companyLogo = new google.maps.MarkerImage('/Project/1_Website/Design/Main_Layout/images/starfish-marker.png',
			new google.maps.Size(100,100),
			new google.maps.Point(0,0),
			new google.maps.Point(50,50)
	);
	
	var companyPos = new google.maps.LatLng(14.563974,121.012774);
	var companyMarker = new google.maps.Marker({
		position: companyPos,
		map: map,
		icon: companyLogo,
		title:"Starfish Internet Solutions"
	});
	
	
	var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });    
	map.mapTypes.set('tehgrayz', mapType);
	map.setMapTypeId('tehgrayz');
	
}
	