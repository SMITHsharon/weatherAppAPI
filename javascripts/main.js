
$(document).ready(function(){

// DON'T PUSH API KEY UP TO GITHUB !!!!!
// weather app API Key
const apiKey = "";

let apiKeys; // firebase credentials

FbAPI.firebaseCredentials().then((keys) => {
	apiKeys = keys;
	// gets the apiKeys.json object
	// hat has the firebase API key et al
	firebase.initializeApp(apiKeys);

	// FbAPI.writeCurrent(apiKeys);
	}).catch((error) => {
		console.log("key errors", error);
});



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
$("#sendZip").click(() => {
	let thisZipCode = $("#zipCode").val();
	if (validZipCode(thisZipCode)) {
console.log("calling loadCurrentWeather :: ", thisZipCode);
		loadCurrentWeather(thisZipCode).then((data) => {
console.log("data :: ", data);
		}).catch((error) => {
			console.log(error);
		});
	}
});


// event handler for <1-Day Forecast> button
$("#today").click(() => {
	let thisZipCode = $("#zipCode").val();
	loadForecast(1, thisZipCode).then((data) => {
	}).catch((error) => {
		console.log(error);
	});
});


// event handler for <3-Day Forecast> button
$("#threeDay").click(() => {
	let thisZipCode = $("#zipCode").val();
	loadForecast(4, thisZipCode).then((data) => {
	}).catch((error) => {
		console.log(error);
	});
});


// event handler for <7-Day Forecast> button
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
	// $("#viewSaved").addClass("hide");
});


// event handler for <Save Forecast> buttons
$("#forecastOutput").on('click', '.save', (event) => {

	let forecastDate = $(event.target).closest("td").siblings('.day').html();
	let forecastDesc = $(event.target).closest("td").siblings('.desc').html();
	let forecastTemps = $(event.target).closest("td").siblings('.highLow').html();
	let forecastPrecip = $(event.target).closest("td").siblings('.precip').html();
	let forecastWind = $(event.target).closest("td").siblings('.wind').html();
	let forecastHumidity = $(event.target).closest("td").siblings('.humidity').html();
// console.log("forecastDate :: ", forecastDate);
// console.log("forecastDesc :: ", forecastDesc);
// console.log("forecastTemps :: ", forecastTemps);
// console.log("forecastPrecip :: ", forecastPrecip);
// console.log("forecastWind :: ", forecastWind);
// console.log("forecastHumidity :: ", forecastHumidity);

const user = FbAPI.credentialsCurrentUser();
// console.log("user :: ", user);
const userID = user.uid;
// console.log("user.uid :: ", userID);
	let thisForecast = {
			Day: forecastDate,
			Description: forecastDesc,
			HighLow: forecastTemps,
			Humidity: forecastHumidity,
			Precip: forecastPrecip,
			Wind: forecastWind
	};
console.log("thisForecast :: ", thisForecast);

	FbAPI.addSavedForecast(apiKeys, thisForecast).then((response) => {
		console.log("added Forecast to this user", userID);
	}).catch((error) => {
		console.log("error in adding saved forecast", error);
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
console.log("loadCurrentWeather // data :: ", data);
			FbAPI.writeCurrent(data);
		})
		.fail((error) => reject(error));
	});
};

const loadForecast = (numDaysForecast, thisZipCode) => {

	return new Promise ((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${thisZipCode},us&units=imperial&cnt=${numDaysForecast}&appid=${apiKey}`)
		.done((data) => {resolve(data.list);
			FbAPI.writeForecast(numDaysForecast, data.list, apiKey);
		})
		.fail((error) => reject(error));
	});
};


// login event handlers and functions
$('#registerButton').click(() => {

	let email = $('#inputEmail').val();
	let password = $('#inputPassword').val();

	// ES6 notation when key & value are the same
	// otherwise, have to break out the 
	// key: value pairs
	let user = {email, password}; 
	FbAPI.registerUser(user).then((response) => {
		console.log("register response", response);
		let newUser = {
			uid: response.uid
		};

		FbAPI.addUser(apiKeys, newUser).then((response) => {
			clearLogin();
			$('#login-container').addClass('hide');
			// $('main-container').removeClass('hide');

			showNavbar();
			FbAPI.createLogoutButton(apiKeys);

		}).catch((error) => {
			console.log("error in addUser", error);
		});
	}).catch((error) => {
		console.log("error in registerUser", error);
	});
});



$('#loginButton').click(() => {

	let email = $('#inputEmail').val();
	let password = $('#inputPassword').val();

	let user = {email, password};

	FbAPI.loginUser(user).then((response) => {
		clearLogin();
		$('#login-container').addClass('hide');
		// $('main-container').removeClass('hide');
		
		showNavbar();
		FbAPI.createLogoutButton(apiKeys);

	}).catch((error) => {
		console.log("error in loginUser", error);
	});
});


// function clears the login user input fields
let clearLogin = () => {
	$('#inputEmail').val("");
	$('#inputPassword').val("");
};


// function displays the navbar items 
// once user has logged in
let showNavbar = () => {

	$("#zipCode").removeClass("hide");
	$("#sendZip").removeClass("hide");

	$("#today").removeClass("hide");
	$("#threeDay").removeClass("hide");
	$("#sevenDay").removeClass("hide");
	$("#clearAll").removeClass("hide");

	$("#social-media-icons").removeClass("hide");

	$("#viewSaved").removeClass("hide");
	$("#logout-button-container").removeClass("hide");
};


// function hids the navbar items
// when the user logs out
let hideNavbar = () => {

	$("#zipCode").addClass("hide");
	$("#sendZip").addClass("hide");

	$("#today").addClass("hide");
	$("#threeDay").addClass("hide");
	$("#sevenDay").addClass("hide");
	$("#clearAll").addClass("hide");

	$("#social-media-icons").addClass("hide");

	$("#viewSaved").addClass("hide");
	$("#logout-button-container").addClass("hide");
};


// function logs the user out of the Weather App
$('#logout-button-container').on('click', '#logoutButton', () => {

	clearLogin();
	$('#zipCode').val("");
	FbAPI.logoutUser();	
	$('#currentOutput').addClass('hide');
	$('#forecastOutput').addClass('hide');
	$('#login-container').removeClass('hide');
	hideNavbar();
});



});

