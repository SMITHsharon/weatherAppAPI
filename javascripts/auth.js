
var FbAPI = ((oldFbAPI) => {

	oldFbAPI.registerUser = (credentials) => {
console.log("credentials.email", credentials.email);
		return new Promise ((resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then((authData) => {
					resolve(authData);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	return oldFbAPI;

})(FbAPI || {});