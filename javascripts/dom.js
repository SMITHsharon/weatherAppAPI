
// this is the writeToDOM iife

var FbAPI = ((oldFbAPI) => {

	oldFbAPI.createLogoutButton = (apiKey) => {

		let userid = FbAPI.credentialsCurrentUser().uid;

		FbAPI.getUser(apiKey, userid).then((user) => {
			let logoutButton = `<button class="btn btn-danger btn-xs" id="logoutButton">Logout</button>`;
			$('#logout-button-container').html(logoutButton);
		});
	};

	return oldFbAPI;

})(FbAPI || {});