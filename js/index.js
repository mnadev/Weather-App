$(document).ready( function() {
	$("#hr").hide();

	var iploc = "https://freegeoip.net/json/"; //get location from ip address
	$.getJSON(iploc, function(json) {
		var coords = json.latitude + "," + json.longitude; //get coordinates
		console.log(coords);
		var url = "https://api.darksky.net/forecast/3ea43a2695b2c51b6cdea9820fc7aca2" + "/" + coords + '?callback=?'; //dark sky url for api call
		console.log(url)
		$.getJSON(url, function(jsonWeather) { //getting weather data in JSON format from Dark Sky API
			var weather = jsonWeather.currently.summary; //get weather summary
			var temp = jsonWeather.currently.temperature.toFixed(1); //get current temp
			var precipChance = jsonWeather.currently.precipProbability * 100; //precipiation chance in percent
			var humidity = jsonWeather.currently.humidity * 100; //humidity
			var hourlySummary = jsonWeather.hourly.summary; //weather summary i.e "partly cloudy with a chance of rain, etc."
			console.log(temp);
			console.log(weather);
			var dateObj = new Date(); //create new date object
			var monthArr = ["January", "February" , "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			var currHour = dateObj.getHours() % 12; //current hour
			var date = currHour + ":" + dateObj.getMinutes() + ",     " + monthArr[dateObj.getMonth()] + " " + dateObj.getDate(); //get hours, min, day, month
			var isFahrenheit = true; //create variable to check if temp is in fahrenheit or celcius

			var body  = document.getElementsByTagName("body")[0]; //access body element
			var mainDiv = document.getElementById("main"); // get div of id main

			$("#temp").text(temp + " °F");

			$('#date').text(date);

			$('#weather').html("The weather is " + weather);

			$("#humidity").text(humidity + "% humidity");

			$("#precip").text(precipChance + "% precipitation chance");

			$("#celcius").text("°C");

			$("#fahr").text("°F");

			$("#celcius").click(function(event) {
				if(isFahrenheit) { //check if temp is in degrees fahrenheit
					temp = (temp - 32) * (5/9); //convert function to celcius from fahrenheit
					temp = temp.toFixed(1);
					$("#temp").text(temp + "°C");
					isFahrenheit = false;
				}
			});

			$("#fahr").click(function(event) {
				if(!isFahrenheit) { //check if temp is in degrees fahrenheit
					temp = (temp * 9/5) + 32; //convert function to celcius from fahrenheit
					temp = temp.toFixed(1);
					$("#temp").text(temp + "°F");
					isFahrenheit = true;
				}
			});

			$("#hourly").text("Show next 6 hours:");

			$("#hourly").click(function(event) {
				var hourlyData = jsonWeather.hourly.data;
				var hourlyTemps = new Array(6); //array storing temperature each hour
				var hourlySummary = new Array(6);

				for(var i = 1; i < 7; i++) { //iterate through each hour, getting data
					hourlyTemps[i] = hourlyData[i].temperature;
					hourlySummary[i] = hourlyData[i].summary;
					var classHr = ".hour" + i; //html classes for each hour
					var classTemp = ".temp" + i;
					var classSumm = ".summary" + i;

					var hour = currHour + i;
					$(classHr).text(hour + " o'clock");

					$(classTemp).text(hourlyTemps[i] + " °F");
					$(classSumm).text(hourlySummary[i]);
				}

				$("#hr").show();
			});

		});
	});
});
