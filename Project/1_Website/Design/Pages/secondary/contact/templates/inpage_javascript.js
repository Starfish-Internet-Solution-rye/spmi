$(document).ready(function(){
	initializeMap();// <-- INITIALIZES THE MAP
	resetForm();
	
	if($('input[name="status"]').val() == "success")
		alert("Thank you! Your message has been sent. We will get back t o you shortly.");

	
	$('input[name="submit"]').click(function(){
		validateForm();
	});
	
	
	
});
//SCRIPT FOR GOOGLE MAPS
function initializeMap() {
	var map;
	var spmi = new google.maps.LatLng(10.652679,124.852538);
	
	var stylez = [
	              {
	                featureType: "all",
	                elementType: "all",
	              }
	          ];

	          var mapOptions = {
	              zoom: 17,
	              center: spmi,
	              panControl: false,
	              zoomControl: false,
	              scaleControl: false,
	          };

	map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

	//ADDS CUSTOM MARKER
	var companyLogo = new google.maps.MarkerImage('/Project/1_Website/Design/Pages/secondary/contact/images/mapIcon.png',
			new google.maps.Size(100,100),
			new google.maps.Point(0,0),
			new google.maps.Point(50,50)
	);
	
	var companyPos = new google.maps.LatLng(10.652679,124.852538);
	var companyMarker = new google.maps.Marker({
		position: companyPos,
		map: map,
		icon: companyLogo,
		title:"SPMI"
	});
	
	var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });    
	map.mapTypes.set('tehgrayz', mapType);
	map.setMapTypeId('tehgrayz');
}


//validate form
function resetForm(id) {
	$('#'+id).each(function(){
		this.reset();
	});
}	
function validateForm() {
	
	return $("#contact_form").validate({
		
		rules:{
			contactPerson:{
				required:true,
				},
				email:{
					required:true,
					email:true,
				},
			message:{
				required:true,
			},
			number:{
				required:true,
				digits:true,
			},
			countryCode:{
				required:true,
				digits:true,
			},
			areaCode:{
				required:true,
				digits:true,
			},
			recaptcha_response_field:{
				required:true,
			}
		},
		
		messages: {
			
			contactPerson:{
				required:"this is a required field",
			},
			email:{
				required:"Please enter a valid email address",
				email:"Please enter a valid email address",
			},
			message:{
				required:"this is a required field",
			},
			number:{
				required:"this is a required field",
			},
			countryCode:{
				required:"this is a required field",
			},
			areaCode:{
				required:"this is a required field",
			},
			recaptcha_response_field:
			{
				required:"this is a required field"
			}
		}
		
	}).form();
}