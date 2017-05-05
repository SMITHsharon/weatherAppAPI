
var FbAPI = ((oldFbAPI) => {

	oldFbAPI.addUser = (keys, newUser) => {
		return new Promise((resolve, reject) => {
			$.ajax({
				method: 'POST',
				url: `${keys.databaseURL}/users.json`,
				data: JSON.stringify(newUser)

			}).done((response) => {
				resolve(response);
			}).catch((error) => {
				eject(error);
			});
		});
	};

	return oldFbAPI;

})(FbAPI || {});