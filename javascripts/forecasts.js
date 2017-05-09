
var FbAPI = ((oldFbAPI) => {

	oldFbAPI.addSavedForecast = (apiKeys, newForecast) => {

		newForecast.uid = FbAPI.credentialsCurrentUser().uid;

		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'POST',
				url: `${apiKeys.databaseURL}/items/.json`,
				data: JSON.stringify(newForecast)

			}).done(() => {
				resolve();

			}).fail(() => {
				reject(error);
			});
		});
	};


	return oldFbAPI;

})(FbAPI || {});