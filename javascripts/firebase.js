
// this is the main iife

var FbAPI = (() => {

	let savedForecasts = [];

	return {

		firebaseCredentials : () => {

			return new Promise (() => {
				$.ajax("apiKeys.json")
				.done((data) => {
					resolve(data);
				})
			
				.fail((error) => {
					reject(error);
				});
			});
		}
	};

})();