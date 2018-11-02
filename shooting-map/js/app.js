/* add your script methods and logic here */

'use strict';
var map = L.map('map-container').setView([39.8282, -98.5795], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	id: 'adamsebetich.no00e6de',
	accessToken: 'pk.eyJ1IjoiYWRhbXNlYmV0aWNoIiwiYSI6ImNpZnJjYmM1MTAxN2FzN2tyaTliNThrOXgifQ.57txm2-M-Mwq5F-OyhgLxA'
}).addTo(map);

var save = function(data) {
	var Killed = L.layerGroup([]); 
	var Hit = L.layerGroup([]);
	var Unknown = L.layerGroup([]);
	var yes = document.createElement("div"); 
	var no = document.createElement("div"); 	
	var Armed = 0; 
	var Unarmed= 0; 

	for (var i = 0; i < data.length; i++) {
		var circle = L.circle([data[i].lat, data[i].lng], 10000, {
			color: 'black',
			fillColor: '#663399',
			fillOpacity: 1
		})
		var outcome = data[i].outcome; 
		var armedType = data[i].armed;
		if (outcome == "Killed") {
			if (armedType) {
				Armed += 1; 
			} else if (armedType == false) {
				Unarmed +=1; 
			}
			circle.setStyle({fillColor: '#7fffd4'}).addTo(Killed);
		} else if (outcome == "Hit") {
			if (armedType) {
				Armed += 1; 
			} else if (armedType == false) {
				Unarmed +=1; 
			}			
			circle.setStyle({fillColor: '#ffa500'}).addTo(Hit);
		} else {
			if (armedType) {
				Armed += 1; 
			} else if (armedType == false) {
				Unarmed +=1; 
			}			
			circle.addTo(Unknown);			
		}
		circle.bindPopup(data[i].summary);
	}
	yes.innerHTML = "Number of incidents with armed victim: " + Armed;
	document.getElementById("results1").appendChild(yes);
	no.innerHTML = "Number of incidents with unarmed or unknown: victim " + Unarmed;
	document.getElementById("results2").appendChild(no);


	Killed.addTo(map);
	Hit.addTo(map);
	Unknown.addTo(map);
	var arr = {"Killed": Killed, "Hit": Hit, "Unknown": Unknown};
	L.control.layers(null, arr).addTo(map);
}

$.getJSON("./data/data.min.json").then(save); 



	











