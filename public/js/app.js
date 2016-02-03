(function(document) {
	'use strict';

	window.APP = window.APP || {};

	// Register the callback to be fired every time auth state changes
	var ref = new Firebase("https://swanky-event-planner.firebaseIO.com");
	var signInEmailEl = 			document.getElementById('signinEmail');
	var signInPasswordEl = 			document.getElementById('signinPassword');
	var signInContainerEl = 		document.getElementById('signInContainer');
	var signUpContainerEl = 		document.getElementById('signUpContainer');
	var eventPlannerContainerEl = 	document.getElementById('eventPlannerContainer');
	var signupNameEl = 				document.getElementById('signupName');
	var signupEmailEl = 			document.getElementById('signupEmail');
	var signupPasswordEl = 			document.getElementById('signupPassword');
	var signupPassword2El = 		document.getElementById('signupPassword2');

	var userRef;

	/**
	 * User has signed in
	 *
	 */
	function authHandler (error, authData) {

		if(error) {

			//Handle the error

		} else if (!authData) {

			console.log("User is logged out");

		} else {

			userRef = ref.child('users/' + authData.uid);

			APP.showEventPlanner();

			console.log("User " + authData.uid + " is logged in with " + authData.provider);

		}

	}

	/**
	 * User is signing in
	 * 
	 */
	APP.signIn = function(emailIn, passwordIn) {

		var email = emailIn || signInEmailEl.value;
		var password = passwordIn || signInPasswordEl.value;

		// Or with an email/password combination
		ref.authWithPassword({
		  email    : email ,
		  password : password
		}, authHandler);

	}

	/**
	 * User is signing up
	 * 
	 */
	APP.signUp = function() {

		ref.createUser({
		  email    : signupEmailEl.value,
		  password : signupPasswordEl.value
		}, function(error, userData) {

		  if (error) {

		    console.log("Error creating user:", error);

		  } else {

		    APP.signIn(signupEmailEl.value, signupPasswordEl.value);

		  }
		  
		});

	};

	/**
	 * User is signing out
	 * 
	 */
	APP.signOut = function() {

		ref.unauth();
		userRef = undefined;
		signInEmailEl = 			'';
		signInPasswordEl = 			'';
		signupNameEl = 				'';
		signupEmailEl = 			'';
		signupPasswordEl = 			'';
		signupPassword2El = 		'';

	};

	/**
	 * Show the sign up form
	 * 
	 */
	APP.showSignUp = function() {

		signInContainerEl.hidden = true;
		eventPlannerContainerEl.hidden = true;
		signUpContainerEl.hidden = false;

	};

	/**
	 * Show the sign in form
	 * 
	 */
	APP.showSignIn = function() {

		signInContainerEl.hidden = false;
		eventPlannerContainerEl.hidden = true;
		signUpContainerEl.hidden = true;

	};

	/**
	 * Show the event planner
	 * 
	 */
	APP.showEventPlanner = function() {

		signInContainerEl.hidden = true;
		eventPlannerContainerEl.hidden = false;
		signUpContainerEl.hidden = true;

	};

})(document);