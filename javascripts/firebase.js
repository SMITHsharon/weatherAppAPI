
// this is the main iife

var FbAPI = (() => {

	let savedForecasts = [];

	return {

		firebaseCredentials : () => {

			return new Promise ((resolve, reject) => {
				$.ajax("apiKeys.json")
				.done((data) => {
					resolve(data);
console.log("data from main iife :: ", data);
				})
			
				.fail((error) => {
					reject(error);
				});
			});
		}
	};

})();