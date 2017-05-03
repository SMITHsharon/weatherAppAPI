
$(document).ready(function(){

// how to get date output ? 
// how to test if zipData[i].rain exists ? 
// how to display a background image using SASS ? 


// DON'T PUSH API KEY UP TO GITHUB !!!!!
const apiKey = "63335b97514443314e85c737030fb8f9";

const writeCurrent = (zipData) => {

	$("#today").removeClass("hide");
	$("#threeDay").removeClass("hide");
	$("#sevenDay").removeClass("hide");
	$("#clearAll").removeClass("hide");

	let weatherConditionsArray = zipData.main;
	let windSpeedArray = zipData.wind;
	let weatherDescriptionArray = zipData.weather;

	let domString = "";
	let buttonString = "";
	domString += `<span class="currentWeatherHead">${zipData.name} Weather</span></br>`;

	// domString += `<ul>`;
	domString += `Current Conditions:  ${titleCase(weatherDescriptionArray[0].description)}</br>`;
	domString += `Temperature:  ${weatherConditionsArray.temp}&#176;</br>`;

	domString += `High/Low:  ${weatherConditionsArray.temp_max}&#176;/`;
	domString += `${weatherConditionsArray.temp_min}&#176;</br>`;

	domString += `Wind Speed:  ${windSpeedArray.speed} miles/hour</br>`;

	domString += `Air Pressure:  ${weatherConditionsArray.pressure}Pa</br>`;
	// domString += `</ul>`;

	$("#currentOutput").append(domString);
};


const writeForecast = (numDaysForecast, zipData) => {

// console.log("writing Forecast / numDaysForecast, zipData :: ", numDaysForecast, zipData);

// console.log("zipData[0] :: ", zipData[0]);
// console.log("zipData[0].temp :: ", zipData[0].temp);
// console.log("zipData[0].weather[0].description :: ", zipData[0].weather[0].description);

let weatherDescriptionArray = zipData.weather;
// console.log("weatherDescriptionArray ::", weatherDescriptionArray);

	// clear prior ouputs;
	$("#forecastOutput").empty();

	let domString = "";

	// write table header for Forecast
	domString += `<div class="table-responsive">`;
	domString += `<table class="table">`;
	domString += `<thead>`;
	domString += `<tr>`;
	domString += `<th>Day</th>`;
    domString += `<th>Description</th>`;
    domString += `<th>High/Low</th>`;
    domString += `<th>Precip</th>`;
    domString += `<th>Wind</th>`;
    domString += `<th>Humidity</th>`;
    domString += `</tr>`;    
    domString += `</thead>`;   

    // write the data output to the table
    domString += `<tbody>`;
    for (let i=0; i<numDaysForecast; i++) {

    	let tempForecast = zipData[i].temp;

	    domString += `<tr>`;
	    domString += `<td>${getDay(i)}</td>`;
		domString += `<td>${titleCase(zipData[i].weather[0].description)}</td>`;
		domString += `<td>${tempForecast.max}&#176;/${tempForecast.min}&#176;</td>`;
		domString += `<td>${getPrecip(zipData[i].rain)}</td>`;
		// domString += `<td>${zipData[i].rain}&#37;</td>`;
		// domString += `<td>${precipStr(zipData[i].rain)}</td>`;
	    domString += `<td>${zipData[i].speed} mi/hr</td>`;
	    domString += `<td>${zipData[i].humidity}&#37;</td>`; 
	    domString += `</tr>`;
	}

	domString += `</tbody>`;
	domString += `</table>`;
	domString += `</div>`;

	$("#forecastOutput").append(domString);

};


const getDay = (dayCounter) => {

	if (dayCounter === 0) {
		return "Today's Forecast";
	} else
	if (dayCounter === 1) {
		return "Tomorrow's Forecast";
	} else {
		return "Day " + dayCounter ;
	}
};


const getPrecip = (rainForecast) => {

	if (typeof rainForecast !== "undefined") {
		return rainForecast + "&#37";
	} else {
		return "0%";
	}
};


const titleCase = (str) => {

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


// how to catch the condition when the .rain attribute does not exist ???
const precipStr = (apiResult) => {

	if (apiResult(hasOwnProperty("rain"))) {
		return "zipData[i].rain}&#37;" ;
	} else {
		return "0&#37;" ;
	}
};



//********************************************
// EVENT HANDLERS AND PROMISE FUNCTIONS
//********************************************

// event handler for <enter> key
$("#zipCode").on("keyup", (e) => {
     e.which = e.which || e.keyCode;
     if (e.which === 13) {
		let thisZipCode = $("#zipCode").val();
		loadCurrentWeather(thisZipCode).then((data) => {
	}).catch((error) => {
		console.log(error);
	});
     } else {
          return false;
     }
});

// event handler for <submit> button
$("#sendRequest").click(() => {
	let thisZipCode = $("#zipCode").val();
	if (validZipCode(thisZipCode)) {
		loadCurrentWeather(thisZipCode).then((data) => {
		}).catch((error) => {
			console.log(error);
		});
	}
});

// event handler for <1-Day Forecase> button
$("#today").click(() => {
	let thisZipCode = $("#zipCode").val();
	loadForecast(1, thisZipCode).then((data) => {
	}).catch((error) => {
		console.log(error);
	});
});

// event handler for <3-Day Forecase> button
$("#threeDay").click(() => {
	let thisZipCode = $("#zipCode").val();
	loadForecast(4, thisZipCode).then((data) => {
	}).catch((error) => {
		console.log(error);
	});
});


// event handler for <7-Day Forecase> button
$("#sevenDay").click(() => {
	let thisZipCode = $("#zipCode").val();
	loadForecast(8, thisZipCode).then((data) => {
	}).catch((error) => {
		console.log(error);
	});
});


// event handler for <clear all> button
$("#clearAll").click(() => {

	// reinitialize user input field
	$("#zipCode").attr("placeholder", "Zip Code");
	$("#zipCode").val("");

	// clear output data from DOM
	$("#currentOutput").empty();
	$("#forecastOutput").empty();

	// hide the buttons that appear only when a Weather request 
	// has been made and Current Weather Conditions are displayed
	$("#today").addClass("hide");
	$("#threeDay").addClass("hide");
	$("#sevenDay").addClass("hide");
	$("#clearAll").addClass("hide");
});


// function validates <zipCode> data entered by user in input field
const validZipCode = (userZipInput) => {

	const reg = /^[0-9]+$/; // test function
	let errorMessage = "";

	if (userZipInput === ""){
		errorMessage = "Zip Code is required!";
	}
	else if ((userZipInput.length)< 5 || (userZipInput.length)>5 ) {
		errorMessage = "Zip Code should be five digits.";
	}
	else if (!reg.test(userZipInput)){
		errorMessage = "Zip Code should be only numbers.";
	}

	
	if (errorMessage === "") {
		return true;
	} else {
		alert(errorMessage);
		return false;
	}
};


// Promise (ajax) calls
const loadCurrentWeather = (thisZipCode) => {

	return new Promise ((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${thisZipCode},us&units=imperial&appid=${apiKey}`)
		.done((data) => {resolve(data);
			writeCurrent(data);
		})
		.fail((error) => reject(error));
	});
};

const loadForecast = (numDaysForecast, thisZipCode) => {

	return new Promise ((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${thisZipCode},us&units=imperial&cnt=${numDaysForecast}&appid=${apiKey}`)
		.done((data) => {resolve(data.list);
			writeForecast(numDaysForecast, data.list);
		})
		.fail((error) => reject(error));
	});
};


});

