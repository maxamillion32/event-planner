/*jshint esversion: 6 */

(function(document) {
	'use strict';

	var APP = window.APP || Object.create(null);

	// Register the callback to be fired every time auth state changes
	let fbRef = new Firebase("https://swanky-event-planner.firebaseIO.com");

	APP.signInOut = 	new SignInOut(fbRef);
	APP.eventPlanner = 	new EventPlanner();
	APP.resetPassword = new ResetPassword(fbRef);
	APP.showEvents =	new showEvents();
	APP.Displayer = Displayer;

	// Fired after user signs in
	document.addEventListener("signed-in", function(e) {

	  APP.eventPlanner.eventRef = 	APP.signInOut.eventRef;
	  APP.showEvents.eventRef = 	APP.signInOut.eventRef;

	});

	// Fired after user signs out
	document.addEventListener("signed-out", function(e) {

	  APP.eventPlanner.eventRef = 	undefined;
	  APP.showEvents.eventRef = 	undefined;

	});

	/**
	 * Sign out on exit
	 * 
	 */
	window.onbeforeunload = APP.signInOut.signOut;

	/******************************************************************
	Display functionality
	/******************************************************************/

})(document);