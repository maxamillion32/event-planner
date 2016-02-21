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
		 * Show Event Container Element
		 * @return {Object} Show Event Container Element
		 * @memberof Displayer
		 * @type {Object}
		 * 
		 */
		static get showEventContainerEl() {

			return _showEventContainerEl;
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
		 * Show the sign up form
		 * @memberof Displayer
		 * 
		 */
		static showSignUp() {

			_signInContainerEl.hidden = true;
			_eventPlannerContainerEl.hidden = true;
			_signUpContainerEl.hidden = false;
			_resetPasswordContainerEl.hidden = true;
			_showEventContainerEl.hidden = true;
			_userInfoContainerEl.hidden = true;
			
			SignUp.validateSignUp(true); //<-Validate the sign up

		}

		/**
		 * Show the sign in form
		 * @memberof Displayer
		 * 
		 */
		static showSignIn() {

			_signInContainerEl.hidden = false;
			_eventPlannerContainerEl.hidden = true;
			_signUpContainerEl.hidden = true;
			_resetPasswordContainerEl.hidden = true;
			_showEventContainerEl.hidden = true;
			_userInfoContainerEl.hidden = true;

		}

		/**
		 * Show the event planner
		 * @memberof Displayer
		 * 
		 */
		static showEventPlanner() {

			_signInContainerEl.hidden = true;
			_eventPlannerContainerEl.hidden = false;
			_signUpContainerEl.hidden = true;
			_resetPasswordContainerEl.hidden = true;
			_showEventContainerEl.hidden = true;
			_userInfoContainerEl.hidden = true;

			EventPlanner.checkEventFields(); //<-Check event fields

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
			_resetPasswordContainerEl.hidden = false;
			_showEventContainerEl.hidden = true;
			_userInfoContainerEl.hidden = true;

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
			_showEventContainerEl.hidden = false;
			_userInfoContainerEl.hidden = true;

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

		}

	};

})(document);