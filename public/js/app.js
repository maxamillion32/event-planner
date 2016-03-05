/*jshint esversion: 6 */
(function(document) {
	'use strict';

	/**
	 * Sign Out Listener
	 *
	 */
	function _signOutListener() {

		app.removeEvents();
		app.showEvents.dispose();
		app.userInfo.dispose();
		app.eventPlanner.dispose();
		app.resetPassword.dispose();
		app.signUp.dispose();

		window.app = new App();

	}

	// Firebase reference
	let fbRef = new Firebase("https://swanky-event-planner.firebaseIO.com");

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

			/**
			 * SignInOut Object
			 * @member App#signInOut
			 * @type {object}
			 */
			this.signInOut = new SignInOut(fbRef);

			/**
			 * EventPlanner Object
			 * @member App#eventPlanner
			 * @type {object}
			 */
			this.eventPlanner = new EventPlanner();

			/**
			 * ResetPassword Object
			 * @member App#resetPassword
			 * @type {object}
			 */
			this.resetPassword = new ResetPassword(fbRef);

			/**
			 * ShowEvents Object
			 * @member App#showEvents
			 * @type {object}
			 */
			this.showEvents = new ShowEvents();

			/**
			 * SignUp Object
			 * @member App#signUp 
			 * @type {object}
			 */
			this.signUp = new SignUp(fbRef);

			/**
			 * UserInfo Object
			 * @member App#signUp 
			 * @type {object}
			 */
			this.userInfo =	new UserInfo();

			/**
			 * ResetPassword Object
			 * @member App#resetPassword
			 * @type {object}
			 */
			this.resetPassword = new ResetPassword(fbRef);

			// Check the sign in button
			SignInOut.validateSignIn();

			//Check the reset password button
			ResetPassword.validateResetPassword();

			// Fired after the user signs up
			document.addEventListener("signed-up", this._signedUpListener.bind(this));

			// Fired after user signs in
			document.addEventListener("signed-in", this._signedInListener.bind(this));

			/**
			 * Sign out on exit
			 * 
			 */
			window.onbeforeunload = function() {

				this.signInOut.signOut();
				document.removeEventListener('signed-out', _signOutListener);

			};

		}

		/**
		 * Sign Up Listener
		 * @function _signedUpListener
		 * @memberof App
		 * @instance
		 * @private
		 *
		 */
		_signedUpListener() {

			this.signInOut.signIn(SignUp.signupEmailEl.value, SignUp.signupPasswordEl.value);

		}

		/**
		 * Sign In Listener
		 * @function _signedInListener
		 * @memberof App
		 * @instance
		 * @private
		 *
		 */
		_signedInListener() {

			this.eventPlanner.eventRef = 	this.signInOut.eventRef;
			this.showEvents.eventRef = 		this.signInOut.eventRef;
			this.userInfo.extraRef = 		this.signInOut.extraRef;
			this.userInfo.ref = 			fbRef;
			this.userInfo.email =			this.signInOut.email;

			this.showEvents.listenForEvents();
			this.userInfo.listenForData();

		}

		/**
		 * Remove the registered events
		 *  @function removeEvents
		 * 	@memberof App
		 *  @instance
		 *
		 */
		removeEvents() {

			document.removeEventListener('signed-up', this._signedUpListener.bind(this));
			document.removeEventListener('signed-in', this._signedInListener.bind(this));
			window.onbeforeunload = undefined;

		}

		/**
		 *  Show the event creation div
		 *  @function deisplayEventCreation
		 * 	@memberof App
		 *  @instance
		 *
		 */
		displayEventCreation() {

			if(this.eventPlanner.eventRef) {

				Displayer.showEventPlanner();

			} else {

				Displayer.showSnackbar('Sorry but you must be signed in to do that!  :-(');

			}

		}

		/**
		 *  Show the user info div
		 *  @function displayUserInfo
		 * 	@memberof App
		 *  @instance
		 *
		 */
		displayUserInfo() {

			if(this.eventPlanner.eventRef) {

				Displayer.showUserInfo();

			} else {

				Displayer.showSnackbar('Sorry but you must be signed in to do that!  :-(');

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
				
			} else {

				Displayer.showSnackbar('Sorry but you must be signed in to do that!  :-(');

			}

		}

	}

	window.app = new App();

	// Fired after user signs out
	document.addEventListener("signed-out", _signOutListener);

	//After the Dom is loaded show the sign in container
	//I'm using this because I'm getting a double load, seems to have
	//something to do with the tab bar
	window.addEventListener("load", function(event) {

		Displayer.loadingEl.hidden = true;
	    Displayer.contentEl.hidden = false;
	
	});

})(document);