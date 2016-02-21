(function(document) {
	'use strict';

	var APP = window.APP || Object.create(null);
	var VTILAPP = Object.create(null);

	// Register the callback to be fired every time auth state changes
	let fbRef new Firebase("https://swanky-event-planner.firebaseIO.com");

	//signing up
	APP.signupNameEl = 				document.getElementById('signup-name');
	APP.signupEmailEl = 			document.getElementById('signup-email');
	APP.signupPasswordEl = 			document.getElementById('signup-password');
	APP.signupPassword2El = 		document.getElementById('signup-password2');

	APP.userRef;				//Tag input list
	APP.eventRef;				//Events
	APP.extraRef;				//Extra user data
	APP.storeExtra = false;		//Store extra user info

	APP.signInOut = new SignInOut(fbRef);
	APP.eventPlanner = new EventPlanner();

	/**
	 * Display event creation if user has logged in
	 * 
	 */
	APP.displayEventCreation = function() {

		if(eventRef) {

			showEventPlanner();

		}

	};

	/**
	 * Sign out on exit
	 * 
	 */
	window.onbeforeunload = APP.signOut;

	/******************************************************************
	Display functionality
	/******************************************************************/

})(document);