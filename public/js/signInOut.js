(function() {
	'use strict';

	var APP = window.APP || {};

	/******************************************************************
	Sign in functionality
	/******************************************************************

	/**
	 * User has signed in
	 *
	 */
	function _authHandler (error, authData) {

		if(error) {

			//Handle the error

		} else if (!authData) {

			console.log("User is logged out");

		} else {

			APP.userRef = 	APP.ref.child('users/' + authData.uid);
			APP.eventRef = 	APP.userRef.child('events/');
			APP.extraRef = 	APP.userRef.child('extra/');

			//If just signing up store the extra user data
			if(APP.storeExtra === true) {

				APP.storeExtra = false;

				APP.extraRef.set({

					name: 		APP.signupNameEl.value,
					employer: 	APP.signupEmployerEl.value,
					title: 		APP.signupTitleEl.value,
					birthday: 	APP.signupBirthdayEl.value

				});

			}

			APP.signOutLinkEl.hidden = 	false;
			APP.signInLinkEl.hidden = 	true;

			APP.displayEventCreation();

			/**
			 * Get the data
			 * @param  {Object} snapshot value of the event
			 */
			APP.eventRef.on("value", function(snapshot) {

			  APP.events = snapshot.val();

			  _redrawEvents();
			  
			}, function(err) {

				console.log('Error: ', err);

			});

		}

	}

	/**
	 * User is signing in
	 * 
	 */
	APP.signIn = function(emailIn, passwordIn) {

		let email = 	emailIn || APP.signInEmailEl.value;
		let password = 	passwordIn || APP.signInPasswordEl.value;

		// Sign in with an email/password combination
		ref.authWithPassword({
		  email : 		email ,
		  password : 	password
		}, _authHandler);

	};

	/******************************************************************
	Sign out functionality
	/******************************************************************

	/**
	 * User is signing out
	 * 
	 */
	APP.signOut = function() {

		APP.signOutLinkEl.hidden = 		true;
		APP.signInLinkEl.hidden = 		false;
		APP.ref.unauth();
		APP.eventRef.off();
		APP.extraRef.off();
		APP.userRef = 					undefined;
		APP.eventRef = 					undefined;
		APP.extraRef = 					undefined;
		APP.signInEmailEl.value = 		'';
		APP.signInPasswordEl.value = 	'';
		APP.signupNameEl.value = 		'';
		APP.signupEmailEl.value = 		'';
		APP.signupPasswordEl.value = 	'';
		APP.signupPassword2El.value = 	'';
		APP.clearElements();
		APP.clearEl(eventContainerEl);
		APP.showSignIn();

	};

})();