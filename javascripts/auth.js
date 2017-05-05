
var FbAPI = ((oldFbAPI) => {

	oldFbAPI.registerUser = (credentials) => {

console.log("in registerUser // credentials.email", credentials.email);

		return new Promise ((resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then((authData) => {
					resolve(authData);
					
console.log("in registerUser // authData", authData);
			}).catch((error) => {
				reject(error);
			});
		});
	};


	oldFbAPI.loginUser = (credentials) => {

console.log("loginUser // credentials.email :: ", credentials.email);

		return new Promise ((resolve, reject) => {
			firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then((authData) => {
					resolve(authData);
			}).catch((error) => {
					reject(error);
			});
		});
	};


	oldFbAPI.credentialsCurrentUser = () => {
		return firebase.auth().currentUser;
	};

	return oldFbAPI;

})(FbAPI || {});
