let map;
let directionsService;
let directionsRenderer;

let currentLocation;
let destination = null;

function initMap(){

map = new google.maps.Map(document.getElementById("map"),{
zoom:12,
center:{lat:7.1907,lng:125.4553}
});

directionsService = new google.maps.DirectionsService();
directionsRenderer = new google.maps.DirectionsRenderer();

directionsRenderer.setMap(map);

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(

(position)=>{

currentLocation={
lat:position.coords.latitude,
lng:position.coords.longitude
};

map.setCenter(currentLocation);

new google.maps.Marker({
position:currentLocation,
map:map,
title:"Your Current Location"
});

}

);

}

map.addListener("click",(event)=>{

destination={
lat:event.latLng.lat(),
lng:event.latLng.lng()
};

new google.maps.Marker({
position:destination,
map:map,
title:"Destination"
});

});

}

function calculateRoute(){

if(!currentLocation){
alert("Location not available");
return;
}

if(!destination){
alert("Click on the map to choose destination");
return;
}

const request={
origin:currentLocation,
destination:destination,
travelMode:"DRIVING"
};

directionsService.route(request,(result,status)=>{

if(status==="OK"){
directionsRenderer.setDirections(result);
}else{
alert("Route failed: "+status);
}

});

}