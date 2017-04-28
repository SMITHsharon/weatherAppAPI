
$(document).ready(function(){

// DON'T PUSH API KEY UP TO GITHUB !!!!!
const apiKey = "";



// results.weather is an array ... 
// do a loop to get what you need for <conditions>

const writeToDOM = (zipData) => {
	console.log("writing to DOM // zipData :: ", zipData);

	$("#zipCode").attr("placeholder", "Zip Code");
	$("#zipCode").val("");
};


// event handler for <enter> key
$("#zipCode").on("keyup", (e) => {
     e.which = e.which || e.keyCode;
     if (e.which === 13) {
		let thisZipCode = $("#zipCode").val();
// console.log("thisZipCode from Enter Key :: ", thisZipCode);
		loadWeather(thisZipCode).then((data) => {
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
		loadWeather(thisZipCode).then((data) => {
	}).catch((error) => {
		console.log(error);
	});
});


// Promise (ajax) call
const loadWeather = (thisZipCode) => {

	return new Promise ((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${thisZipCode},us&units=imperial&appid=${apiKey}`)
		.done((data) => {resolve(data);
			console.log("in Promise / data :: ", data);
			writeToDOM(data);
		})
		.fail((error) => reject(error));
	});
};

});