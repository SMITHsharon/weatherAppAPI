
var FbAPI = ((oldFbAPI) => {

	oldFbAPI.getSavedForecasts = (apiKeys) => {

		// let forecasts = [];
		// savedForecasts = []; defined in main iife

		return new Promise ((resolve, reject) => {

		let uid = FbAPI.credentialsCurrentUser().uid;

// console.log("getting saved forecasts / uid :: ", uid);
// ERROR WITH THIS CALL ::
			$.ajax(`${apiKeys.databaseURL}/forecasts.json?orderBy="uid"&equalTo="${uid}"`)
			.done((data) => {
				console.log("data :: ", data);
				let response = data;
				Object.keys(response).forEach((key) => { 
					response[key].id = key;
					savedForecasts.push(response[key]);
				
			});
			resolve(savedForecasts);
			
			}).fail((error) => {
				reject(error);
			});
		});
	};


	oldFbAPI.addSavedForecast = (apiKeys, newForecast) => {

		newForecast.uid = FbAPI.credentialsCurrentUser().uid;

		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'POST',
				url: `${apiKeys.databaseURL}/forecasts/.json`,
				data: JSON.stringify(newForecast)

			}).done(() => {
				resolve();

			}).fail((error) => {
				reject(error);
			});
		});
	};


	oldFbAPI.deleteSavedForecast = (apiKeys, id) => {

		return new Promise ((resolve, reject) => {

			$.ajax({
				method: 'DELETE',
				url: '${apiKeys.databaseURL}/forecasts/${id}.json'

			}).done(() => {
				resolve();
			}).fail((error) => {
				reject(error);
			});
		});
	};


	return oldFbAPI;

})(FbAPI || {});