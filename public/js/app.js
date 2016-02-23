/*jshint esversion: 6 */
(function(document) {
	'use strict';

	/**
	 * App
	 * @class App
	 * @description Starting point for the event planner application
	 * 
	 */
	class App {

		/**
	     * App constructor.
	     * @constructs App
	     */
		constructor() {

			// Register the callback to be fired every time auth state changes
			let fbRef = new Firebase("https://swanky-event-planner.firebaseIO.com");

			this.signInOut = 	 new SignInOut(fbRef);
			this.eventPlanner =  new EventPlanner();
			this.resetPassword = new ResetPassword(fbRef);
			this.showEvents =	 new ShowEvents();
			this.signUp =		 new SignUp(fbRef);
			this.resetPassword = new ResetPassword(fbRef);

			// Check the sign in button
			SignInOut.validateSignIn();

			//Check the reset password button
			ResetPassword.validateResetPassword();

			// Fired after the user signs up
			document.addEventListener("signed-up", function() {

				this.signInOut.signIn(this.signUp.signupEmailEl.value, this.signUp.signupPasswordEl.value);

			}.bind(this));

			// Fired after user signs in
			document.addEventListener("signed-in", function() {

			  this.eventPlanner.eventRef = 	this.signInOut.eventRef;
			  this.showEvents.eventRef = 	this.signInOut.eventRef;

			}.bind(this));

			/**
			 * Sign out on exit
			 * 
			 */
			window.onbeforeunload = function() {

				this.signInOut.signOut();
				document.removeEventListener('signed-out');

			};

		}

		/**
		 * Remove the registered events
		 *  @function removeEvents
		 * 	@memberof App
		 *  @instance
		 *
		 */
		removeEvents() {

			document.removeEventListener('signed-up');
			document.removeEventListener('signed-in');
			window.onbeforeunload = undefined;

		}

		/**
		 * Show the event creation div
		 *  @function deisplayEventCreation
		 * 	@memberof App
		 *  @instance
		 *
		 */
		displayEventCreation() {

			if(this.eventPlanner.eventRef) {

				Displayer.showEventPlanner();

			}

		}

		/**
		 * Display the events div
		 *  @function displayEvents
		 * 	@memberof App
		 *  @instance
		 *
		 */
		displayEvents() {

			if(this.eventPlanner.eventRef) {

				Displayer.showEventContainer();
				
			}

		}

	}

	// Fired after user signs out
	document.addEventListener("signed-out", function() {

		app.removeEvents();
		app = new App();

	}.bind(this));

	window.app = new App();

})(document);