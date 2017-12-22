var api_path = 'https://fcc-weather-api.glitch.me/api/current?';
var coord;
var lon;
var lat;
var temperature;
var temperature_container = $('.temperature-container');
var temperature_units_container = $('.temperature-units-container')
var fahrenheit;

function searchSetup() {
	navigator.geolocation.getCurrentPosition(success);
}

function success(position) {
	coord = position.coords;
	lon = position.coords.longitude;
	lat = position.coords.latitude;
	apiCall();
}

function apiCall() {
	var url = api_path + 'lon=' + lon + '&lat=' + lat;
	console.log(url);
	$.ajax({
		method: 'GET',
		url: url,
		success: function(data) {
			printTemperature(data);
		},
	});
}

function printTemperature(data) {
	temperature = Math.round(data.main.temp);
	console.log(data);
	var temp_container = $('.temperature');
	temp_container.html(temperature + '° C');
	temp_container.css('background-color', 'rgba(0,0,0,.3)');
	printCity(data);
	makeTempToggle(temp_container);
	printWeatherDescription(data);
	setBackgroundImage(data);
}

function printCity(data) {
	$(".city").text('Local weather in ' + data.name);
	console.log(data.name);
}

function makeTempToggle(temp_container) {
	var temp_units = $('.temp-units')
	temp_units.html('<button class="temp-units-button">(° F)</button>');
	$('.item').css('background-color', 'rgba(0,0,0,.3)');
	$('.temp-units-button').css('color', '#B2D6FF')

	var temp_units_button = $('.temp-units-button');
	temp_units_button.click(
		function(){
			if (fahrenheit) {
				temp_units_button.html('(° F)');
				convertToC();
				temp_container.html(temperature + '° C');
				fahrenheit = false;
			}
			else {
				temp_units_button.html('(° C)');
				convertToF();
				temp_container.html(temperature + '° F');
				fahrenheit = true;
			}
		}
	)
}

function printWeatherDescription(data) {
	var weather_description_container = $('.weather-description');
	var weather_description = data.weather[0].description;
	weather_description_container.html('Expect ' + weather_description + ' today.');
}

function setBackgroundImage(data) {
	console.log('you did a thing w images');
	if (data.weather[0].main == 'Rain') {
		console.log('rainy');
		$('body').css('background-image', 'url(img/rainy.jpg)');
	}

	else if (data.weather[0].main == 'Clear') {
		console.log('clear');
		$('body').css('background-image', 'url(img/clear.jpg)');
	}

	else if (data.weather[0].main == 'Clouds') {
		console.log('clear');
		$('body').css('background-image', 'url(img/cloudy.jpg)');
	}
}

function convertToF() {
	temperature = Math.round(temperature * 1.8 + 32);
}

function convertToC() {
	temperature = Math.round((temperature - 32) / 1.8);
}

searchSetup();