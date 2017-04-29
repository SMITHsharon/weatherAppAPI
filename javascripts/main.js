
$(document).ready(function(){

// DON'T PUSH API KEY UP TO GITHUB !!!!!
const apiKey = "";

let day1TempForecast;
let day2TempForecast;
let day3TempForecast;
let day4TempForecast;
let day5TempForecast;
let day6TempForecast;
let day7TempForecast;

// results.weather is an array ... 
// do a loop to get what you need for <conditions>

const writeCurrent = (zipData) => {
	console.log("writing to DOM // zipData :: ", zipData);

	// clear the <zip code> text input field
	// $("#zipCode").attr("placeholder", "Zip Code");
	// $("#zipCode").val("");

	let weatherConditionsArray = zipData.main;
	let windSpeedArray = zipData.wind;
	let weatherDescriptionArray = zipData.weather;
console.log("weatherConditionsArray", weatherConditionsArray);
console.log("windSpeedArray", windSpeedArray);

	let domString = "";
	domString += `Current Weather Conditions:  ${zipData.name}`;

	domString += `<ul>`;
	domString += `<li>Current Conditions:  ${weatherDescriptionArray[0].main}`;
	domString += `<li>Temperature:  ${weatherConditionsArray.temp}&#176;</li>`;

	domString += `<li>Min Temp:  ${weatherConditionsArray.temp_min}&#176;</li>`;
	domString += `<li>Max Temp:  ${weatherConditionsArray.temp_max}&#176;</li>`;

	domString += `<li>Humidity:  ${weatherConditionsArray.humidity}&#37;</li>`;

	domString += `<li>Air Pressure:  ${weatherConditionsArray.pressure}Pa</li>`;

	domString += `<li>Wind Speed:  ${windSpeedArray.speed} miles/hour</li>`;
	domString += `</ul>`;

	domString += `<button type="submit" id="threeDay" value="submit">3-Day Forecast</button>`;
	domString += `<button type="submit" id="sevenDay" value="submit">7-Day Forecast</button>`;

	$("#currentOutput").append(domString);
};


const writeForecast = (numDaysForecast, zipData) => {
	console.log("writing Forecast / numDaysForecast, zipData :: ", numDaysForecast, zipData);

	let forecastResults = zipData.list;
	day1TempForecast = forecastResults[0].temp;
	day2TempForecast = forecastResults[1].temp;
	day3TempForecast = forecastResults[2].temp;

	if (numDaysForecast === 7) {
		day4TempForecast = forecastResults[3].temp;
		day5TempForecast = forecastResults[4].temp;
		day6TempForecast = forecastResults[5].temp;
		day7TempForecast = forecastResults[6].temp;
	}

console.log("forecastResults :: ", forecastResults);
console.log("day1TempForecast :: ", day1TempForecast);
console.log("forecastResults[0].humidity :: ", forecastResults[0].humidity);

	let domString = "";

	domString += `<div class="col-sm-3">${numDaysForecast}-Day Forecast`;
	domString += `<ul>`;
	domString += `<li>Clouds:</li>`;
	domString += `<li>Temp:</li>`;
	domString += `<li>Min Temp:</li>`;
	domString += `<li>Max Temp:</li>`;
	domString += `<li>Humidity:</li>`;
	domString += `<li>Air Pressure:</li>`;
	domString += `<li>Wind Speed:</li>`;
	domString += `</ul></div>`;


	
	for (let i=0; i<numDaysForecast; i++) {
		domString += `<div class="col-sm-2">`;
		domString += `</br>${forecastResults[i].clouds}&#37;</br>`;

		// domString += `${forecastResults[i][temp].day}&#37;</br>`;
		// let todayTemp = getArray(i, "day");
		domString += getDayTemp(i);
		domString += getMinTemp(i);
		domString += getMaxTemp(i);
		// domString += `${todayTemp}&#176;</br>`;
// console.log("getArray(i) :: ", getArray(i));
// console.log("getArray(i, day) :: ", getArray(i, "day"));
// console.log("day1TempForecast.day :: ", day1TempForecast.day);

		// domString += `${getArray(i, "min")}&#176;</br>`;
		// domString += `${getArray(i, "max")}&#176;</br>`;
		domString += `${forecastResults[i].humidity}&#37;</br>`;
		domString += `${forecastResults[i].pressure}Pa</br>`;
		domString += `${forecastResults[i].speed} mi/hr</br>`;
		domString += `</div>`;
	}

	domString += `</ul>`;

	if (numDaysForecast === 3) {
		$("#threeDayForecast").append(domString);
	} else {
		$("#sevenDayForecast").append(domString);
	}
};


const getDayTemp = (loopIndex) => {

	if (loopIndex === 0) {
		return `${day1TempForecast.day}&#176;</br>`;
		// return "day1TempForecast." + tempType;
	} else 
	if (loopIndex === 1) {
		return `${day2TempForecast.day}&#176;</br>`;
		// return "day2TempForecast." + tempType;
	} else 
	if (loopIndex === 2) {
		return `${day3TempForecast.day}&#176;</br>`;
		// return "day3TempForecast." + tempType;
	} else
	if (loopIndex === 3) {
		return `${day4TempForecast.day}&#176;</br>`;
	} else
	if (loopIndex === 4) {
		return `${day5TempForecast.day}&#176;</br>`;
	} else
	if (loopIndex === 5) {
		return `${day6TempForecast.day}&#176;</br>`;
	} else {
		return `${day7TempForecast.day}&#176;</br>`;
	}
};

const getMinTemp = (loopIndex) => {

	if (loopIndex === 0) {
		return `${day1TempForecast.min}&#176;</br>`;
		// return "day1TempForecast." + tempType;
	} else 
	if (loopIndex === 1) {
		return `${day2TempForecast.min}&#176;</br>`;
		// return "day2TempForecast." + tempType;
	} else 
	if (loopIndex === 2) {
		return `${day3TempForecast.min}&#176;</br>`;
		// return "day3TempForecast." + tempType;
	} else 
	if (loopIndex === 3) {
		return `${day4TempForecast.min}&#176;</br>`;
	} else 
	if (loopIndex === 4) {
		return `${day5TempForecast.min}&#176;</br>`;
	} else 
	if (loopIndex === 5) {
		return `${day6TempForecast.min}&#176;</br>`;
	} else {
		return `${day7TempForecast.min}&#176;</br>`;
	}
};

const getMaxTemp = (loopIndex) => {

	if (loopIndex === 0) {
		return `${day1TempForecast.max}&#176;</br>`;
		// return "day1TempForecast." + tempType;
	} else 
	if (loopIndex === 1) {
		return `${day2TempForecast.max}&#176;</br>`;
		// return "day2TempForecast." + tempType;
	} else 
	if (loopIndex === 2) {
		return `${day3TempForecast.max}&#176;</br>`;
		// return "day3TempForecast." + tempType;
	} else 
	if (loopIndex === 3) {
		return `${day4TempForecast.max}&#176;</br>`;
	} else 
	if (loopIndex === 4) {
		return `${day5TempForecast.max}&#176;</br>`;
	} else 
	if (loopIndex === 5) {
		return `${day6TempForecast.max}&#176;</br>`;
	} else {
		return `${day4TempForecast.max}&#176;</br>`;
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
$("#sendRequest").on("click", (e) => {
		let thisZipCode = $("#zipCode").val();
		if (validZipCode(thisZipCode)) {
			loadCurrentWeather(thisZipCode).then((data) => {
			}).catch((error) => {
				console.log(error);
			});
		}
});

// event handler for <3-Day Forecase> button
$("body").on("click", "#threeDay", (e) => {
		let thisZipCode = $("#zipCode").val();
		loadForecast(3, thisZipCode).then((data) => {
	}).catch((error) => {
		console.log(error);
	});
});


// event handler for <7-Day Forecase> button
$("body").on("click", "#threeDay", (e) => {
		let thisZipCode = $("#zipCode").val();
		loadForecast(7, thisZipCode).then((data) => {
	}).catch((error) => {
		console.log(error);
	});
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
			console.log("in loadCurrentWeather / data :: ", data);
			writeCurrent(data);
		})
		.fail((error) => reject(error));
	});
};

const loadForecast = (numDaysForecast, thisZipCode) => {

	return new Promise ((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${thisZipCode},us&units=imperial&cnt=${numDaysForecast}&appid=${apiKey}`)
		.done((data) => {resolve(data);
			console.log("in loadForecast // numDaysForecast :: ", numDaysForecast, thisZipCode);
			writeForecast(numDaysForecast, data);
		})
		.fail((error) => reject(error));
	});
};


});

