
// this is the writeToDOM iife

var FbAPI = ((oldFbAPI) => {

	oldFbAPI.createLogoutButton = (apiKey) => {

		let userid = FbAPI.credentialsCurrentUser().uid;

		FbAPI.getUser(apiKey, userid).then((user) => {
			let logoutButton = `<button class="btn btn-danger btn-xs" id="logoutButton">Logout</button>`;
			$('#logout-button-container').html(logoutButton);
		});
	};


	// function writes the current weather conditions to the DOM
	oldFbAPI.writeCurrent = (zipData) => {

		let windSpeedArray = zipData.wind;
		let weatherDescriptionArray = zipData.weather;
		let weatherConditionsArray = zipData.main;

		let domString = "";
		let buttonString = "";
		domString += `<span class="currentWeatherHead">${zipData.name} Weather</span></br>`;

		domString += `Current Conditions:  ${oldFbAPI.titleCase(weatherDescriptionArray[0].description)}</br>`;
		domString += `Temperature:  ${weatherConditionsArray.temp}&#176;</br>`;

		domString += `High/Low:  ${weatherConditionsArray.temp_max}&#176;/`;
		domString += `${weatherConditionsArray.temp_min}&#176;</br>`;

		domString += `Wind Speed:  ${windSpeedArray.speed} miles/hour</br>`;

		domString += `Air Pressure:  ${weatherConditionsArray.pressure}Pa</br>`;

		$("#currentOutput").append(domString);
	};


	// function writes the selected weather forecast to the DOM:
	// today's forecast <1>; three-day forecast <3>; seven-day forecast <7>
	oldFbAPI.writeForecast = (numDaysForecast, zipData, apiKey) => {

		let weatherDescriptionArray = zipData.weather;

		let domString = "";

	    domString += oldFbAPI.writeTableHeader(domString);

        // write the data output to the table
	    domString += `<tbody>`;
	    for (let i=0; i<numDaysForecast; i++) {

	    	let tempForecast = zipData[i].temp;

		    domString += `<tr>`;
		    domString += `<td class="day">${oldFbAPI.showDay(new Date(), i)}</td>`;
		    domString += `<td><button class="btn btn-success btn-xs save">Save</button></td>`;
			domString += `<td class="desc">${oldFbAPI.titleCase(zipData[i].weather[0].description)}</td>`;
			domString += `<td class="highLow">${tempForecast.max}&#176;/${tempForecast.min}&#176;</td>`;
			domString += `<td class="precip">${oldFbAPI.getPrecip(zipData[i].rain)}</td>`;
		    domString += `<td class="wind">${zipData[i].speed} mi/hr</td>`;
		    domString += `<td class="humidity">${zipData[i].humidity}&#37;</td>`; 
		    domString += `</tr>`;
		}

		domString += `</tbody>`;
		domString += `</table>`;
		domString += `</div>`;

		$("#forecastOutput").html(domString);

	};


	// function writes the current user's saved weather forecasts to the DOM
	oldFbAPI.writeSaved = (apiKeys) => {

		FbAPI.getSavedForecasts(apiKeys).then((results) => {

			let forecasts = results;
			let domString = "";

		 	domString += oldFbAPI.writeTableHeader(domString);

	        // write content of <savedForecasts> array to the table
		    domString += `<tbody>`;
		    // for (let i=0; i<forecasts.length; i++) {
		    forecasts.forEach((forecast) => {

			    domString += `<tr>`;
			    domString += `<td class="day">${forecast.Day}</td>`;
			    domString += `<td><button class="btn btn-danger btn-xs delete" id="${forecast.id}">Delete</button></td>`;
				domString += `<td class="desc">${forecast.Description}</td>`;
				domString += `<td class="highLow">${forecast.HighLow}</td>`;
				domString += `<td class="precip">${forecast.Precip}</td>`;
			    domString += `<td class="wind">${forecast.Wind}</td>`;
			    domString += `<td class="humidity">${forecast.Humidity};</td>`; 
			    domString += `</tr>`;
			});

			domString += `</tbody>`;
			domString += `</table>`;
			domString += `</div>`;

			$("#forecastOutput").html(domString);

			}).catch((error) => {
				console.log("writeDOM error", error);
			});
	};


	// writes output for weather forecasts displayed in table format
	oldFbAPI.writeTableHeader = (domString) => {

		domString += `<div class="table-responsive">`;
		domString += `<table class="table">`;
		domString += `<thead>`;
		domString += `<tr>`;
		domString += `<th>Day</th>`;
		domString += `<th></th>`;
	    domString += `<th>Description</th>`;
	    domString += `<th>High/Low</th>`;
	    domString += `<th>Precip</th>`;
	    domString += `<th>Wind</th>`;
	    domString += `<th>Humidity</th>`;
	    domString += `</tr>`;    
	    domString += `</thead>`;   

	    return domString;
	};


	// function converts first char in each word of a string to uppercase
	// RETURNS the converted string
	oldFbAPI.titleCase = (str) => {

	// splits the string delimited by space into an array of words
     str = str.toLowerCase().split(' ');                

     for(var i = 0; i < str.length; i++) {  
          // splits the array occurrence into an array of letters
          str[i] = str[i].split(''); 

          // converts the first occurrence of the array to uppercase
          str[i][0] = str[i][0].toUpperCase();

          // converts the array of letters back into a word.
          str[i] = str[i].join('');                     
     }

     //  converts the array of words back to a sentence.
     return str.join(' ');                 
	};


	oldFbAPI.showDay = (someday, dayCounter) => {

		let monthNames = [
		"Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"
		];

		someday.setDate(someday.getDate() + dayCounter);
	  	let day = someday.getDate();
	  	let monthIndex = someday.getMonth();

	  	if (dayCounter > 1) {
			return (monthNames[monthIndex] + ' ' + day);
		} else 
		if (dayCounter === 0) {
			// today's forecast
			return ("Today's Forecast");
			// return ('Tonight, ' + monthNames[monthIndex] + ' ' + day);
		} else 
		if (dayCounter === 1) {
			// today's forecast
			return ('Tomorrow, ' + monthNames[monthIndex] + ' ' + day);
		}
	};


	oldFbAPI.getPrecip = (rainForecast) => {

		if (typeof rainForecast !== "undefined") {
			return rainForecast + "&#37";
		} else {
			return "0%";
		}
	};


	return oldFbAPI;

})(FbAPI || {});