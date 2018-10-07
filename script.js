//map initialization, view set on Szklanych domow 3a/18
const mymap = L.map('mapid').setView([52.2510926, 21.0965627], 13);
//API TOKEN
const TOKEN = "pk.eyJ1IjoiamtyYXNpayIsImEiOiJjam15MmpyN2QweG83M3BxbGk3MDI5MXRjIn0.7MO1QibQR-tT2NHj_wVHIQ";

//add a tile layer
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + TOKEN, {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

//empty list of coordinates
const LIST = document.querySelector('.list-group')
//first marker set on Szklanych domow 3a/18
const DEFAULTMARKER = L.marker([52.2510926, 21.0965627]).addTo(mymap).bindPopup("<b>Szklanych domów 3a/18</b><br>04-346, Warszawa").openPopup();
//marker array
let markers = [];

function addMarker(e) {
  let marker = L.marker(e.latlng, {
    draggable: true
  }).addTo(mymap).bindPopup("<b>Marker number " + `${markers.length + 1}` + "</b>").openPopup();

  markers.push(marker);
  writeCords();

  //change cords on drag end
  marker.addEventListener('dragend', writeCords);
}

//creates list items with cords for each marker
function writeCords() {
  LIST.innerHTML = '';
  for (let i = 1; i <= markers.length; i++) {
    LIST.innerHTML += '<li class="list-group-item"><b>Coordinates:</b> <span class="badge badge-info">Marker number ' + i + '</span> <br>Latitude: ' + markers[i - 1]._latlng.lat.toFixed(5) + '<br>Longitude: ' + markers[i - 1]._latlng.lng.toFixed(5) + '</li>';
  }
}

mymap.addEventListener('click', addMarker);
