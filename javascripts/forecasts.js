
var FbAPI = ((oldFbAPI) => {

	oldFbAPI.getSavedForecasts = (apiKeys) => {

		let forecasts = [];

		return new Promise ((resolve, reject) => {

		let uid = FbAPI.credentialsCurrentUser().uid;

			$.ajax(`${apiKeys.databaseURL}/forecasts.json?orderBy="uid"&equalTo="${uid}"`)
			.done((data) => {
				console.log("data :: ", data);
				let response = data;
				Object.keys(response).forEach((key) => { 
					response[key].id = key;
					forecasts.push(response[key]);
				
			});
			resolve(forecasts);
			
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
console.log("deleting // id :: ", id);

		return new Promise ((resolve, reject) => {

			$.ajax({
				method: 'DELETE',
				url: `${apiKeys.databaseURL}/forecasts/${id}.json`

			}).done(() => {
				resolve();
			}).fail((error) => {
				reject(error);
			});
		});
	};


	return oldFbAPI;

})(FbAPI || {});