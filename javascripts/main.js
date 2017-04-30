
$(document).ready(function(){

// DON'T PUSH API KEY UP TO GITHUB !!!!!
const apiKey = "";

const writeCurrent = (zipData) => {

console.log("writing to DOM // zipData :: ", zipData);


	$("#today").removeClass("hide");
	$("#threeDay").removeClass("hide");
	$("#sevenDay").removeClass("hide");
	$("#clearAll").removeClass("hide");


	let weatherConditionsArray = zipData.main;
	let windSpeedArray = zipData.wind;
	let weatherDescriptionArray = zipData.weather;

	let domString = "";
	let buttonString = "";
	domString += `Current Weather Conditions:  ${zipData.name}`;

	domString += `<ul>`;
	domString += `<li>Current Conditions:  ${weatherDescriptionArray[0].main}`;
	domString += `<li>Temperature:  ${weatherConditionsArray.temp}&#176;</li>`;

	domString += `<li>The Low:  ${weatherConditionsArray.temp_min}&#176;</li>`;
	domString += `<li>The High:  ${weatherConditionsArray.temp_max}&#176;</li>`;

	domString += `<li>Humidity:  ${weatherConditionsArray.humidity}&#37;</li>`;

	domString += `<li>Air Pressure:  ${weatherConditionsArray.pressure}Pa</li>`;

	domString += `<li>Wind Speed:  ${windSpeedArray.speed} miles/hour</li>`;
	domString += `</ul>`;

	buttonString += `<button type="button" id="currentDay" class="btn btn-xs" value="submit">Today's Forecast</button>`;
	buttonString += `<button type="button" id="threeDay" class="btn btn-xs" value="submit">3-Day Forecast</button>`;
	buttonString += `<button type="button" id="sevenDay" class="btn btn-xs" value="submit">7-Day Forecast</button>`;

	// $("#buttonString").append(buttonString);
	$("#currentOutput").append(domString);
};


const writeForecast = (numDaysForecast, zipData) => {
console.log("writing Forecast / numDaysForecast, zipData :: ", numDaysForecast, zipData);

console.log("zipData[0] :: ", zipData[0]);
console.log("zipData[0].temp :: ", zipData[0].temp);

	let domString = "";

	if (numDaysForecast === 3) {
		domString += `<div class="col-sm-3">${numDaysForecast}-Day Forecast`;

	} else { // 7-day forecast
		domString += `<div class="col-sm-1"></div>`;
		domString += `<div class="col-sm-2">${numDaysForecast}-Day Forecast`;
	}
	
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

		if (numDaysForecast === 3) {
			domString += `<div class="col-sm-2">`;
		} else {
			domString += `<div class="col-sm-1">`;
		}

		domString += `</br>${zipData[i].clouds}&#37;</br>`;

		let tempForecast = zipData[i].temp;
		domString += `${tempForecast.day}&#37;</br>`;
		domString += `${tempForecast.min}&#37;</br>`;
		domString += `${tempForecast.max}&#37;</br>`;
		domString += `${zipData[i].humidity}&#37;</br>`;
		domString += `${zipData[i].pressure}Pa</br>`;
		domString += `${zipData[i].speed} mi/hr</br>`;
		domString += `</div>`;
	}

	domString += `</ul>`;

	if (numDaysForecast === 1) {
		$("#todayForecast").append(domString);
	} else 
	if (numDaysForecast === 3) {
		$("#threeDayForecast").append(domString);
	} else {
		$("#sevenDayForecast").append(domString);
	}
};


// const getDayTemp = (loopIndex) => {

// 	if (loopIndex === 0) {
// 		return `${day1TempForecast.day}&#176;</br>`;
// 		// return "day1TempForecast." + tempType;
// 	} else 
// 	if (loopIndex === 1) {
// 		return `${day2TempForecast.day}&#176;</br>`;
// 		// return "day2TempForecast." + tempType;
// 	} else 
// 	if (loopIndex === 2) {
// 		return `${day3TempForecast.day}&#176;</br>`;
// 		// return "day3TempForecast." + tempType;
// 	} else
// 	if (loopIndex === 3) {
// 		return `${day4TempForecast.day}&#176;</br>`;
// 	} else
// 	if (loopIndex === 4) {
// 		return `${day5TempForecast.day}&#176;</br>`;
// 	} else
// 	if (loopIndex === 5) {
// 		return `${day6TempForecast.day}&#176;</br>`;
// 	} else {
// 		return `${day7TempForecast.day}&#176;</br>`;
// 	}
// };

// const getMinTemp = (loopIndex) => {

// 	if (loopIndex === 0) {
// 		return `${day1TempForecast.min}&#176;</br>`;
// 		// return "day1TempForecast." + tempType;
// 	} else 
// 	if (loopIndex === 1) {
// 		return `${day2TempForecast.min}&#176;</br>`;
// 		// return "day2TempForecast." + tempType;
// 	} else 
// 	if (loopIndex === 2) {
// 		return `${day3TempForecast.min}&#176;</br>`;
// 		// return "day3TempForecast." + tempType;
// 	} else 
// 	if (loopIndex === 3) {
// 		return `${day4TempForecast.min}&#176;</br>`;
// 	} else 
// 	if (loopIndex === 4) {
// 		return `${day5TempForecast.min}&#176;</br>`;
// 	} else 
// 	if (loopIndex === 5) {
// 		return `${day6TempForecast.min}&#176;</br>`;
// 	} else {
// 		return `${day7TempForecast.min}&#176;</br>`;
// 	}
// };

// const getMaxTemp = (loopIndex) => {

// 	if (loopIndex === 0) {
// 		return `${day1TempForecast.max}&#176;</br>`;
// 		// return "day1TempForecast." + tempType;
// 	} else 
// 	if (loopIndex === 1) {
// 		return `${day2TempForecast.max}&#176;</br>`;
// 		// return "day2TempForecast." + tempType;
// 	} else 
// 	if (loopIndex === 2) {
// 		return `${day3TempForecast.max}&#176;</br>`;
// 		// return "day3TempForecast." + tempType;
// 	} else 
// 	if (loopIndex === 3) {
// 		return `${day4TempForecast.max}&#176;</br>`;
// 	} else 
// 	if (loopIndex === 4) {
// 		return `${day5TempForecast.max}&#176;</br>`;
// 	} else 
// 	if (loopIndex === 5) {
// 		return `${day6TempForecast.max}&#176;</br>`;
// 	} else {
// 		return `${day4TempForecast.max}&#176;</br>`;
// 	}
// };



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
$(".zipInput").click(() => {
		let thisZipCode = $("#zipCode").val();
		loadForecast(1, thisZipCode).then((data) => {
	}).catch((error) => {
		console.log(error);
	});
});

// event handler for <3-Day Forecase> button
$(".zipInput").on("click", "#threeDay", (e) => {
		let thisZipCode = $("#zipCode").val();
		loadForecast(3, thisZipCode).then((data) => {
	}).catch((error) => {
		console.log(error);
	});
});


// event handler for <7-Day Forecase> button
$(".zipInput").on("click", "#sevenDay", (e) => {
		let thisZipCode = $("#zipCode").val();
		loadForecast(7, thisZipCode).then((data) => {
	}).catch((error) => {
		console.log(error);
	});
});


// event handler for <clear all> button
$("#clearAll").on("click", (e) => {

	// clear the <zip code> text input field
	$("#zipCode").attr("placeholder", "Zip Code");
	$("#zipCode").val("");
	$("#threeDayForecast").empty();
	$("#sevenDayForecast").empty();
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
			resolve(data.temp);
			writeForecast(numDaysForecast, data.list);
		})
		.fail((error) => reject(error));
	});
};


});

