(function() {
	'use strict';

	var APP = window.APP || Object.create(null);

	//signing in
	let signInEmailEl = 	document.getElementById('signin-email');
	let signInPasswordEl = 	document.getElementById('signin-password');
	let signOutLinkEl =		document.getElementById('sign-out-link');
	let signInLinkEl =		document.getElementById('sign-in-link');
	let signupEmployerEl =	document.getElementById('signup-employer');
	let signupTitleEl =		document.getElementById('signup-title');
	let signupBirthdayEl =	document.getElementById('signup-birthday');

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
					employer: 	signupEmployerEl.value,
					title: 		signupTitleEl.value,
					birthday: 	signupBirthdayEl.value

				});

			}

			signOutLinkEl.hidden = 	false;
			signInLinkEl.hidden = 	true;

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

		let email = 	emailIn || signInEmailEl.value;
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

		signOutLinkEl.hidden = 			true;
		signInLinkEl.hidden = 			false;
		APP.ref.unauth();
		APP.eventRef.off();
		APP.extraRef.off();
		APP.userRef = 					undefined;
		APP.eventRef = 					undefined;
		APP.extraRef = 					undefined;
		signInEmailEl.value = 			'';
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