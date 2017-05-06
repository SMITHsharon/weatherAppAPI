
var FbAPI = ((oldFbAPI) => {

	oldFbAPI.registerUser = (credentials) => {

		return new Promise ((resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then((authData) => {
					resolve(authData);
					
			}).catch((error) => {
				reject(error);
			});
		});
	};


	oldFbAPI.loginUser = (credentials) => {

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


	oldFbAPI.logoutUser = () => {
		firebase.auth().signOut();
	};


	return oldFbAPI;

})(FbAPI || {});
