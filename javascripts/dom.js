
// this is the writeToDOM iife

var FbAPI = ((oldFbAPI) => {

	oldFbAPI.createLogoutButton = (apiKey) => {

		let userid = FbAPI.credentialsCurrentUser().uid;

		FbAPI.getUser(apiKey, userid).then((user) => {
			let logoutButton = `<button class="btn btn-danger btn-xs" id="logoutButton">Logout</button>`;
			$('#logout-button-container').html(logoutButton);
		});
	};


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


	return oldFbAPI;

})(FbAPI || {});