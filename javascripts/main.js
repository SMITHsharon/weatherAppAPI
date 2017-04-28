
$(document).ready(function(){

// DON'T PUSH API KEY UP TO GITHUB !!!!!
const apiKey = "";



// results.weather is an array ... 
// do a loop to get what you need for <conditions>

const writeCurrent = (zipData) => {
	console.log("writing to DOM // zipData :: ", zipData);

	// clear the <zip code> text input field
	$("#zipCode").attr("placeholder", "Zip Code");
	$("#zipCode").val("");

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

// event handler for <submit> button
// $("#sendRequest").on("click", (e) => {
// 		let thisZipCode = $("#zipCode").val();
// 		loadWeather(thisZipCode).then((data) => {
// 	}).catch((error) => {
// 		console.log(error);
// 	});
// });


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


// Promise (ajax) call
const loadCurrentWeather = (thisZipCode) => {

	return new Promise ((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${thisZipCode},us&units=imperial&appid=${apiKey}`)
		.done((data) => {resolve(data);
			console.log("in Promise / data :: ", data);
			writeCurrent(data);
		})
		.fail((error) => reject(error));
	});
};

});

