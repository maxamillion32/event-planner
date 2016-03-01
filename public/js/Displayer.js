/*jshint esversion: 6 */
var APP = window.APP || Object.create(null);

var Displayer = (function(document) {
	'use strict';

	let _signInContainerEl = 		document.getElementById('sign-in-container');
	let _signUpContainerEl = 		document.getElementById('sign-up-container');
	let _eventPlannerContainerEl = 	document.getElementById('event-planner-container');
	let _resetPasswordContainerEl =	document.getElementById('reset-password-container');
	let _eventContainerEl =			document.getElementById('event-container');
	let _showEventContainerEl =		document.getElementById('show-event-container');
	let _userInfoContainerEl =		document.getElementById('user-info-container');
	let _snackbarMessageEl =		document.getElementById('snackbar-message');
	let _contentEl =				document.getElementById('content');
	let _loadingEl =				document.getElementById('loading');
	let _addEventsTabEl =			document.getElementById('add-events-tab');
	let _showEventsTabEl = 			document.getElementById('show-events-tab');

	/**
	 * Shows and hides blocks, like a super simple router
	 * @class SignInOut
	 * 
	 */
	return class Displayer {

		/**
	     * Displayer constructor.
	     * @constructs Displayer
	     */
		constructor() {

		}

		/**
		 * SignInContainer Element
		 * @return {Object} SignInContainer Element
		 * @memberof Displayer
		 * @type {Object}
		 * 
		 */
		static get signInContainerEl() {

			return _signInContainerEl;
		}

		/**
		 * SignUp Container Element
		 * @return {Object} SignUp Container Element
		 * @memberof Displayer
		 * @type {Object}
		 * 
		 */
		static get signUpContainerEl() {

			return _signUpContainerEl;
		}

		/**
		 * Event Planner Container Element
		 * @return {Object} Event Planner Container Element
		 * @memberof Displayer
		 * @type {Object}
		 * 
		 */
		static get eventPlannerContainerEl() {

			return _eventPlannerContainerEl;
		}

		/**
		 * Reset Password Container Element
		 * @return {Object} Reset Password Container Element
		 * @memberof Displayer
		 * @type {Object}
		 * 
		 */
		static get resetPasswordContainerEl() {

			return _resetPasswordContainerEl;
		}

		/**
		 * Event Container Element
		 * @return {Object} Event Container Element
		 * @memberof Displayer
		 * @type {Object}
		 * 
		 */
		static get eventContainerEl() {

			return _eventContainerEl;
		}

		/**
		 * User Info Container Element
		 * @return {Object} User Info Container Element
		 * @memberof Displayer
		 * @type {Object}
		 * 
		 */
		static get userInfoContainerEl() {

			return _userInfoContainerEl;
		}

		/**
		 * Content Element
		 * @return {Object} Content Element
		 * @memberof Displayer
		 * @type {Object}
		 * 
		 */
		static get contentEl() {

			return _contentEl;

		}

		/**
		 * Loading Element
		 * @return {Object} Loading Element
		 * @memberof Displayer
		 * @type {Object}
		 * 
		 */
		static get loadingEl() {

			return _loadingEl;

		}

		/**
		 * Add Events Tab Element
		 * @return {Object} Add Events Tab Element
		 * @memberof Displayer
		 * @type {Object}
		 * 
		 */
		static get addEventsTabEl() {

			return _addEventsTabEl;

		}

		/**
		 * Show Events Tab Element
		 * @return {Object} Show Events Tab Element
		 * @memberof Displayer
		 * @type {Object}
		 * 
		 */
		static get showEventsTabEl() {

			return _showEventsTabEl;

		}

		/**
		 * Show Snack Bar
		 * @memberOf Displayer
		 * 
		 */
		static showSnackbar(message) {

			_snackbarMessageEl.MaterialSnackbar.showSnackbar({

				message: message,
				timeout: 4000,

			});

		}

		/**
		 * Show the sign up form
		 * @memberof Displayer
		 * 
		 */
		static showSignUp() {

			_signInContainerEl.hidden = true;
			_eventPlannerContainerEl.hidden = true;
			_resetPasswordContainerEl.hidden = true;
			_showEventContainerEl.hidden = true;
			_userInfoContainerEl.hidden = true;
			_signUpContainerEl.hidden = false;
			
			SignUp.validateSignUp(true); //<-Validate the sign up

			setTimeout(function() {

				SignUp.signupNameEl.focus();
				SignUp.signupNameEl.scrollIntoView();

			});

		}

		/**
		 * Show the sign in form
		 * @memberof Displayer
		 * 
		 */
		static showSignIn() {

			_eventPlannerContainerEl.hidden = true;
			_signUpContainerEl.hidden = true;
			_resetPasswordContainerEl.hidden = true;
			_showEventContainerEl.hidden = true;
			_userInfoContainerEl.hidden = true;
			_signInContainerEl.hidden = false;

			setTimeout(function() {

				SignInOut.signInEmailEl.focus();
				SignInOut.signInEmailEl.scrollIntoView();

			});

		}

		/**
		 * Show the event planner
		 * @memberof Displayer
		 * 
		 */
		static showEventPlanner() {

			_signInContainerEl.hidden = true;
			_signUpContainerEl.hidden = true;
			_resetPasswordContainerEl.hidden = true;
			_showEventContainerEl.hidden = true;
			_userInfoContainerEl.hidden = true;
			_eventPlannerContainerEl.hidden = false;

			EventPlanner.checkEventFields(); //<-Check event fields

			setTimeout(function() {

				EventPlanner.eventNameEl.focus();
				EventPlanner.eventNameEl.scrollIntoView();

			});

		}

		/**
		 * Show the reset password form
		 * @memberof Displayer
		 * 
		 */
		static showResetPassword() {

			_signInContainerEl.hidden = true;
			_eventPlannerContainerEl.hidden = true;
			_signUpContainerEl.hidden = true;
			_showEventContainerEl.hidden = true;
			_userInfoContainerEl.hidden = true;
			_resetPasswordContainerEl.hidden = false;

			setTimeout(function() {

				ResetPassword.resetPasswordEmailEl.focus();
				ResetPassword.resetPasswordEmailEl.scrollIntoView();

			});

		}

		/**
		 * Show the event container form
		 * @memberof Displayer
		 * 
		 */
		static showEventContainer() {

			_signInContainerEl.hidden = true;
			_eventPlannerContainerEl.hidden = true;
			_signUpContainerEl.hidden = true;
			_resetPasswordContainerEl.hidden = true;
			_userInfoContainerEl.hidden = true;
			_showEventContainerEl.hidden = false;

		}

		/**
		 * Show the user info form
		 * @memberof Displayer
		 * 
		 */
		static showUserInfo() {

			_signInContainerEl.hidden = true;
			_eventPlannerContainerEl.hidden = true;
			_signUpContainerEl.hidden = true;
			_resetPasswordContainerEl.hidden = true;
			_showEventContainerEl.hidden = true;
			_userInfoContainerEl.hidden = false;

			setTimeout(function() {

				UserInfo.userInfoNameEl.focus();
				UserInfo.userInfoNameEl.scrollIntoView();
				UserInfo.checkPasswords();

			});

		}

	};

})(document);