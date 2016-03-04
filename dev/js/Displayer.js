'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */
var APP = window.APP || Object.create(null);

var Displayer = function (document) {
	'use strict';

	var _signInContainerEl = document.getElementById('sign-in-container');
	var _signUpContainerEl = document.getElementById('sign-up-container');
	var _eventPlannerContainerEl = document.getElementById('event-planner-container');
	var _resetPasswordContainerEl = document.getElementById('reset-password-container');
	var _eventContainerEl = document.getElementById('event-container');
	var _showEventContainerEl = document.getElementById('show-event-container');
	var _userInfoContainerEl = document.getElementById('user-info-container');
	var _snackbarMessageEl = document.getElementById('snackbar-message');
	var _contentEl = document.getElementById('content');
	var _loadingEl = document.getElementById('loading');
	var _addEventsTabEl = document.getElementById('add-events-tab');
	var _showEventsTabEl = document.getElementById('show-events-tab');

	/**
  * Shows and hides blocks, like a super simple router
  * @class SignInOut
  * 
  */
	return function () {

		/**
   * Displayer constructor.
   * @constructs Displayer
   */

		function Displayer() {
			_classCallCheck(this, Displayer);
		}

		/**
   * SignInContainer Element
   * @return {Object} SignInContainer Element
   * @memberof Displayer
   * @type {Object}
   * 
   */


		_createClass(Displayer, null, [{
			key: 'showSnackbar',


			/**
    * Show Snack Bar
    * @memberOf Displayer
    * 
    */
			value: function showSnackbar(message) {

				_snackbarMessageEl.MaterialSnackbar.showSnackbar({

					message: message,
					timeout: 4000

				});
			}

			/**
    * Show the sign up form
    * @memberof Displayer
    * 
    */

		}, {
			key: 'showSignUp',
			value: function showSignUp() {

				_signInContainerEl.hidden = true;
				_eventPlannerContainerEl.hidden = true;
				_resetPasswordContainerEl.hidden = true;
				_showEventContainerEl.hidden = true;
				_userInfoContainerEl.hidden = true;
				_signUpContainerEl.hidden = false;

				SignUp.validateSignUp(true); //<-Validate the sign up

				setTimeout(function () {

					SignUp.signupNameEl.focus();
					SignUp.signupNameEl.scrollIntoView();
				});
			}

			/**
    * Show the sign in form
    * @memberof Displayer
    * 
    */

		}, {
			key: 'showSignIn',
			value: function showSignIn() {

				_eventPlannerContainerEl.hidden = true;
				_signUpContainerEl.hidden = true;
				_resetPasswordContainerEl.hidden = true;
				_showEventContainerEl.hidden = true;
				_userInfoContainerEl.hidden = true;
				_signInContainerEl.hidden = false;

				setTimeout(function () {

					SignInOut.signInEmailEl.focus();
					SignInOut.signInEmailEl.scrollIntoView();
				});
			}

			/**
    * Show the event planner
    * @memberof Displayer
    * 
    */

		}, {
			key: 'showEventPlanner',
			value: function showEventPlanner() {

				_signInContainerEl.hidden = true;
				_signUpContainerEl.hidden = true;
				_resetPasswordContainerEl.hidden = true;
				_showEventContainerEl.hidden = true;
				_userInfoContainerEl.hidden = true;
				_eventPlannerContainerEl.hidden = false;

				EventPlanner.checkEventFields(); //<-Check event fields

				setTimeout(function () {

					EventPlanner.eventNameEl.focus();
					EventPlanner.eventNameEl.scrollIntoView();
				});
			}

			/**
    * Show the reset password form
    * @memberof Displayer
    * 
    */

		}, {
			key: 'showResetPassword',
			value: function showResetPassword() {

				_signInContainerEl.hidden = true;
				_eventPlannerContainerEl.hidden = true;
				_signUpContainerEl.hidden = true;
				_showEventContainerEl.hidden = true;
				_userInfoContainerEl.hidden = true;
				_resetPasswordContainerEl.hidden = false;

				setTimeout(function () {

					ResetPassword.resetPasswordEmailEl.focus();
					ResetPassword.resetPasswordEmailEl.scrollIntoView();
				});
			}

			/**
    * Show the event container form
    * @memberof Displayer
    * 
    */

		}, {
			key: 'showEventContainer',
			value: function showEventContainer() {

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

		}, {
			key: 'showUserInfo',
			value: function showUserInfo() {

				_signInContainerEl.hidden = true;
				_eventPlannerContainerEl.hidden = true;
				_signUpContainerEl.hidden = true;
				_resetPasswordContainerEl.hidden = true;
				_showEventContainerEl.hidden = true;
				_userInfoContainerEl.hidden = false;

				setTimeout(function () {

					UserInfo.userInfoNameEl.focus();
					UserInfo.userInfoNameEl.scrollIntoView();
					UserInfo.checkPasswords();
				});
			}
		}, {
			key: 'signInContainerEl',
			get: function get() {

				return _signInContainerEl;
			}

			/**
    * SignUp Container Element
    * @return {Object} SignUp Container Element
    * @memberof Displayer
    * @type {Object}
    * 
    */

		}, {
			key: 'signUpContainerEl',
			get: function get() {

				return _signUpContainerEl;
			}

			/**
    * Event Planner Container Element
    * @return {Object} Event Planner Container Element
    * @memberof Displayer
    * @type {Object}
    * 
    */

		}, {
			key: 'eventPlannerContainerEl',
			get: function get() {

				return _eventPlannerContainerEl;
			}

			/**
    * Reset Password Container Element
    * @return {Object} Reset Password Container Element
    * @memberof Displayer
    * @type {Object}
    * 
    */

		}, {
			key: 'resetPasswordContainerEl',
			get: function get() {

				return _resetPasswordContainerEl;
			}

			/**
    * Event Container Element
    * @return {Object} Event Container Element
    * @memberof Displayer
    * @type {Object}
    * 
    */

		}, {
			key: 'eventContainerEl',
			get: function get() {

				return _eventContainerEl;
			}

			/**
    * User Info Container Element
    * @return {Object} User Info Container Element
    * @memberof Displayer
    * @type {Object}
    * 
    */

		}, {
			key: 'userInfoContainerEl',
			get: function get() {

				return _userInfoContainerEl;
			}

			/**
    * Content Element
    * @return {Object} Content Element
    * @memberof Displayer
    * @type {Object}
    * 
    */

		}, {
			key: 'contentEl',
			get: function get() {

				return _contentEl;
			}

			/**
    * Loading Element
    * @return {Object} Loading Element
    * @memberof Displayer
    * @type {Object}
    * 
    */

		}, {
			key: 'loadingEl',
			get: function get() {

				return _loadingEl;
			}

			/**
    * Add Events Tab Element
    * @return {Object} Add Events Tab Element
    * @memberof Displayer
    * @type {Object}
    * 
    */

		}, {
			key: 'addEventsTabEl',
			get: function get() {

				return _addEventsTabEl;
			}

			/**
    * Show Events Tab Element
    * @return {Object} Show Events Tab Element
    * @memberof Displayer
    * @type {Object}
    * 
    */

		}, {
			key: 'showEventsTabEl',
			get: function get() {

				return _showEventsTabEl;
			}
		}]);

		return Displayer;
	}();
}(document);