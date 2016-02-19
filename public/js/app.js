(function(document) {
	'use strict';

	var APP = window.APP || Object.create(null);
	var VTILAPP = Object.create(null);

	// Register the callback to be fired every time auth state changes
	APP.ref = new Firebase("https://swanky-event-planner.firebaseIO.com");

	//HTML Partial containers
	let signInContainerEl = 		document.getElementById('sign-in-container');
	let signUpContainerEl = 		document.getElementById('sign-up-container');
	let eventPlannerContainerEl = 	document.getElementById('event-planner-container');
	let resetPasswordContainerEl =	document.getElementById('reset-password-container');

	//signing up
	APP.signupNameEl = 				document.getElementById('signup-name');
	APP.signupEmailEl = 			document.getElementById('signup-email');
	APP.signupPasswordEl = 			document.getElementById('signup-password');
	APP.signupPassword2El = 		document.getElementById('signup-password2');

	

	//event display
	APP.eventContainerEl =			document.getElementById('event-container');
	APP.showEventContainerEl =		document.getElementById('show-event-container');

	APP.events = [];			//The users events
	APP.userRef;				//Tag input list
	APP.eventRef;				//Events
	APP.extraRef;				//Extra user data
	APP.placeSearch;			//Location search
	APP.autocomplete;			//Location search
	APP.storeExtra = false;		//Store extra user info
	APP.fieldsCompleted = 0;	//Fields filled out

	//Validation
	APP.validator = 			new FV.Validator();
	APP.passwordField = 		new FV.Field("Password1", signupPasswordEl);
	APP.password2Field = 		new FV.Field("Password2", signupPassword2El, signupPasswordEl);
	APP.emailField =			new FV.Field('EmailError', signupEmailEl);

	APP.valCheckLengthEl =		document.getElementById('val-check-length');
	APP.valCheckSpecialEl =		document.getElementById('val-check-special');
	APP.valCheckUpperEl =		document.getElementById('val-check-upper');
	APP.valCheckLowerEl =		document.getElementById('val-check-lower');
	APP.valCheckMatchEl =		document.getElementById('val-check-match');
	APP.valCheckRequiredEl =	document.getElementById('val-check-required');
	APP.valCheckNumberEl =		document.getElementById('val-check-number');
	APP.valCheckEmailEl =		document.getElementById('val-check-email');

	/**
	 * Clear the form elements
	 * 
	 */
	APP.clearElements = function() {

		APP.eventNameEl.value =		'';
		APP.eventTypeEl.value =		'';
		APP.eventHostEl.value =		'';
		APP.startDateEl.value =		'';
		APP.endDateEl.value =		'';
		APP.locationInputEl.value =	'';

		_clearAddress(true);
		_clearGuests();

	};

	/**
	* Clear all child elements
	*
	**/ 
	APP.clearEl = function(el) {

		while (el.firstChild) {

			el.removeChild(el.firstChild);

		}

	};

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
	/******************************************************************

	/**
	 * Show the sign up form
	 * 
	 */
	APP.showSignUp = function() {

		signInContainerEl.hidden = true;
		eventPlannerContainerEl.hidden = true;
		signUpContainerEl.hidden = false;
		resetPasswordContainerEl.hidden = true;
		showEventContainerEl.hidden = true;
		APP.validateSignUp(true);

	};

	/**
	 * Show the sign in form
	 * 
	 */
	APP.showSignIn = function() {

		signInContainerEl.hidden = false;
		eventPlannerContainerEl.hidden = true;
		signUpContainerEl.hidden = true;
		resetPasswordContainerEl.hidden = true
		showEventContainerEl.hidden = true;

	};

	/**
	 * Show the event planner
	 * 
	 */
	function showEventPlanner () {

		signInContainerEl.hidden = true;
		eventPlannerContainerEl.hidden = false;
		signUpContainerEl.hidden = true;
		resetPasswordContainerEl.hidden = true;
		showEventContainerEl.hidden = true;

		APP.checkEventFields();

	};

	/**
	 * Show the reset password screen
	 * 
	 */
	APP.showResetPassword = function() {

		signInContainerEl.hidden = true;
		eventPlannerContainerEl.hidden = true;
		signUpContainerEl.hidden = true;
		resetPasswordContainerEl.hidden = false;
		showEventContainerEl.hidden = true;

	};

	APP.showUserInfo = function() {

		if (extraRef) {



		}

	};

	/**
	 * Show the events
	 * 
	 */
	function showEventContainer () {

		signInContainerEl.hidden = true;
		eventPlannerContainerEl.hidden = true;
		signUpContainerEl.hidden = true;
		resetPasswordContainerEl.hidden = true;
		showEventContainerEl.hidden = false;

	};

})(document);