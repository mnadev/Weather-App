$(document).ready( function() {

	var iploc = "https://freegeoip.net/json/"; //get location from ip address

	$.getJSON(iploc, function(json) {
		var coords = json.latitude + "," + json.longitude; //get coordinates

		var url = "https://api.darksky.net/forecast/" + config.API_KEY + "/" + coords + '?callback=?'; //dark sky url for api call

		$.getJSON(url, function(jsonWeather) { //getting weather data in JSON format from Dark Sky API
			var weather = jsonWeather.currently.summary; //get weather summary
			var temp = jsonWeather.currently.temperature; //get current temp
			var precipChance = jsonWeather.currently.precipProbability * 100; //precipiation chance in percent
			var humidity = jsonWeather.currently.humidity; //humidity
			var hourlySummary = jsonWeather.hourly.summary; //weather summary i.e "partly cloudy with a chance of rain, etc."

			var dateObj = new Date(); //create new date object
			var date = dateObj.getHours() + ":" + dateObj.getMinutes() + " " + dateObj.getMonth() + " " + dateObj.getDate(); //get hours, min, day, month
			var isFahrenheit = true; //create variable to check if temp is in fahrenheit or celcius

			var body  = document.getElementsByTagName("body")[0]; //access body element
			var mainDiv = document.getElementById("main"); // get div of id main

			$("#temp").text(temp);
			//var tempDisp = document.getElementById("temp"); //access element to display temp
			//tempDisp.innerHTML = temp + " °F"; //display temp

			$('#date').text(date);
			//var dateDisp = document.getElementById("date"); //access element to display date
			//dateDisp.innerHTML = date; //add date to html

			$('#weather').text(weather);
			//var weatherDisp = document.getElementById("weather"); //access element to display weather
			//weatherDisp.innerHTML = weather; //add weather text to div

			$("#humidity").text(humidity);
			//var humidDisp = document.getElementById("humidity"); //access element to display humidity
			//humidDisp.innerHTML = humidity + "%"; //add humidity text to html

			$("#precip").text(precipChance);
			//var precipDisp = document.getElementById("precip"); //access element to display precipitation
			//precipDisp.innerHTML = precipChance + "%"; //add precipitation chance to html

			$("#celcius").text("°C");
			//var btnCelcius = document.getElementById("celcius"); //access button to change temp to celcius
			//btnCelcius.innerHTML = "°C";//adding text showing celcius

			$("#fahr").text("°F");
			//var btnFahr = document.getElementById("fahr"); //access button to change temp to fahrenheit
			//btnFahr.innerHTML = "°F";//adding text showing fahrenheit

			$("#celcius").click(function(event) {
				if(isFahrenheit) { //check if temp is in degrees fahrenheit
					temp = (temp - 32) * (5/9); //convert function to celcius from fahrenheit
					$("#temp").text(temp + "°C");
					isFahrenheit = false;
				}
			});
			//btnCelcius.addEventListener("click", function(event) { //change temp if button clicked
				//if(isFahrenheit) { //check if temp is in degrees fahrenheit
					//temp = (temp - 32) * (5/9); //convert function to celcius from fahrenheit
					//isFahrenheit = false;
				//}
			//});

			$("#fahr").click(function(event) {
				if(!isFahrenheit) { //check if temp is in degrees fahrenheit
					temp = (temp * 9/5) + 32; //convert function to celcius from fahrenheit
					$("#temp").text(temp + "°F");
					isFahrenheit = true;
				}
			});

			//btnFahr.addEventListener("click", function(event) { //change temp if button clicked
				//if(!isFahrenheit) { //check if temp is already fahrenheit
					//temp = (temp * 9/5) + 32; //convert function from celcius to fahrenheit
					//isFahrenheit = true;
				//}
			//});

			$("#hourly").text("Hourly Weather");
			//var btnHour = document.getElementById("hourly"); //creating button to show hourly weather
			//btnHour.innerHTML = "Hourly Weather";

			$("#hourly").click(function(event) {
				var hourlyData = jsonWeather.hourly.data;
				var hourlyTemps = new Array(hourlyData.length); //array storing temperate each hour
				var hourlySummary = new Array(hourlyData.length);

				for(var i = 0; i < hourlyData.length; i++) { //iterate through each hour, getting data
					hourlyTemps[i] = hourlyData[i].temperature; //FIX FIX FIX FIX FIX FIX FIX FIX FIX
					hourlySummary[i] = hourlyData[i].summary;
				}


			});

			//btnHour.addEventListener("click", function(event) {//event listener for hourly weather button
				//var hourlyData = data.hourly.data;
				//var hourlyTemps = []; //array storing temperate each hour

				//for(var i = 0; i < hourlyData.length; i++) { //iterate through each hour, getting data
					//alert(hourlyData[i]);
				//}

			//});

		});
	});
});
