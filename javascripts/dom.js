
// this is the writeToDOM iife

var FbAPI = ((oldFbAPI) => {

	oldFbAPI.createLogoutButton = (apiKey) => {

		let userid = FbAPI.credentialsCurrentUser().uid;

		FbAPI.getUser(apikey, userid).then((user) => {
			let logoutButton = `<button class="btn btn-danger" id="logoutButton">Logout}</button>`;
			$('#logout-container').html(logoutButton);
		});
	};

	return oldFbAPI;

})(FbAPI || {});