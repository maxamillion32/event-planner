'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var SignInOut = function (document) {
	'use strict';

	//signing in

	var _signInEmailEl = document.getElementById('signin-email');
	var _signInPasswordEl = document.getElementById('signin-password');
	var _signOutLinkEl = document.getElementById('sign-out-link');
	var _signInLinkEl = document.getElementById('sign-in-link');
	var _signupEmployerEl = document.getElementById('signup-employer');
	var _signupTitleEl = document.getElementById('signup-title');
	var _signupBirthdayEl = document.getElementById('signup-birthday');

	var _storeExtra = false;

	/**
 * Clear all child elements
 *
 **/
	function _clearEl(el) {

		while (el.firstChild) {

			el.removeChild(el.firstChild);
		}
	}

	/**
  * Represents an Sign In page and includes sign out functionality
  * @class SignInOut
  * 
  */
	return function () {

		/**
      * SignInOut constructor.
      * @constructs SignInOut
      * @param {object} fbRef Firebase Reference
      */

		function SignInOut(fbRef) {
			_classCallCheck(this, SignInOut);

			/**
          * Firebase Reference
          * @member SignInOut#fbRef
          * @type {Object}
          */
			this.fbRef = fbRef;

			/**
          * Firebase User Route Reference
          * @member SignInOut#userRef
          * @type {Object}
          */
			this.userRef = undefined;

			/**
          * Firebase Event Route Reference
          * @member SignInOut#eventRef
          * @type {Object}
          */
			this.eventRef = undefined;

			/**
          * Firebase Extra Info Route Reference
          * @member SignInOut#extraRef
          * @type {Object}
          */
			this.extraRef = undefined;
		}

		/**
   * SignIn Email Element
   * @return {Object} SignIn Email Element
   * @memberof SignInOut
   * @type {Object}
   * 
   */


		_createClass(SignInOut, [{
			key: 'authHandler',


			/** 
   *   @function authHandler
   *   @memberof SignInOut
   *   @param {object} error Holds the error if set
   *   @param {object} authData Users auth data from firebase
   *   @instance
   */
			value: function authHandler(error, authData) {

				if (error) {

					//Handle the error

				} else if (!authData) {

						console.log("User is logged out");
					} else {

						this.userRef = this.fbRef.child('users/' + authData.uid);
						this.eventRef = this.userRef.child('events/');
						this.extraRef = this.userRef.child('extra/');

						//If just signing up store the extra user data
						if (_storeExtra === true) {

							_storeExtra = false;

							this.extraRef.set({

								name: _signupNameEl.value,
								employer: _signupEmployerEl.value,
								title: _signupTitleEl.value,
								birthday: _signupBirthdayEl.value

							});
						}

						_signOutLinkEl.hidden = false;
						_signInLinkEl.hidden = true;

						// Dispatch/Trigger/Fire the event
						document.dispatchEvent(new CustomEvent("signed-in"));

						Displayer.showEventPlanner();
					}
			}

			/**
    * @function signIn
    *   @memberof SignInOut
    *   @param {string} emailIn Holds the users email
    *   @param {string} passwordIn Holds the users password
    *   @instance
    * 
    */

		}, {
			key: 'signIn',
			value: function signIn(emailIn, passwordIn) {

				var email = emailIn || _signInEmailEl.value;
				var password = passwordIn || _signInPasswordEl.value;

				// Sign in with an email/password combination
				this.fbRef.authWithPassword({
					email: email,
					password: password
				}, this.authHandler.bind(this));
			}

			/**
    * @function signOut
    * @memberof SignInOut
    * @instance
    * 
    */

		}, {
			key: 'signOut',
			value: function signOut() {

				_signOutLinkEl.hidden = true;
				_signInLinkEl.hidden = false;
				this.fbRef.unauth();
				this.eventRef.off();
				this.extraRef.off();
				this.userRef = undefined;
				this.eventRef = undefined;
				this.extraRef = undefined;
				_signInEmailEl.value = '';
				_signInPasswordEl.value = '';

				SignUp.signupNameEl.value = '';
				SignUp.signupEmailEl.value = '';
				SignUp.signupPasswordEl.value = '';
				SignUp.signupPassword2El.value = '';
				EventPlanner.clearElements();
				_clearEl(_eventContainerEl);

				document.dispatchEvent(new CustomEvent("signed-out"));

				Display.showSignIn();
			}
		}], [{
			key: 'signInEmailEl',
			get: function get() {

				return _signInEmailEl;
			}

			/**
    * SgnIn Password Element
    * @return {Object} SignIn Password Element
    * @memberof SignInOut
    * @type {Object}
    * 
    */

		}, {
			key: 'signInPasswordEl',
			get: function get() {

				return _signInPasswordEl;
			}

			/**
    * SignOut Link Element
    * @return {Object} SignOut Link Element
    * @memberof SignInOut
    * @type {Object}
    * 
    */

		}, {
			key: 'signOutLinkEl',
			get: function get() {

				return _signOutLinkEl;
			}

			/**
    * SignIn Link Element
    * @return {Object} SignIn Link Element
    * @memberof SignInOut
    * @type {Object}
    * 
    */

		}, {
			key: 'signInLinkEl',
			get: function get() {

				return _signInLinkEl;
			}

			/**
    * SignUp Employer Element
    * @return {Object} SignUp Employer Element
    * @memberof SignInOut
    * @type {Object}
    * 
    */

		}, {
			key: 'signupEmployerEl',
			get: function get() {

				return _signupEmployerEl;
			}

			/**
    * Signup Title Element
    * @return {Object} Signup Title Element
    * @memberof SignInOut
    * @type {Object}
    * 
    */

		}, {
			key: 'signupTitleEl',
			get: function get() {

				return _signupTitleEl;
			}

			/**
    * Signup Birthday Element
    * @return {Object} Signup Birthday Element
    * @memberof SignInOut
    * @type {Object}
    * 
    */

		}, {
			key: 'signupBirthdayEl',
			get: function get() {

				return _signupBirthdayEl;
			}

			/**
    * Indicates if we will be storing additional user info when signing in (after a signup)
    * @return {boolean} Indicates if we will be storing additional user info when signing in (after a signup)
    * @memberof SignInOut
    * @type {boolean}
    * 
    */

		}, {
			key: 'storeExtra',
			get: function get() {

				return _storeExtra;
			}

			/**
    * Indicates if we will be storing additional user info when signing in (after a signup)
    * @memberof SignInOut
    * @param {boolean} pred Indicates if we will be storing additional user info when signing in (after a signup)
    * @type {boolean}
    * 
    */
			,
			set: function set(pred) {

				_storeExtra = pred;
			}
		}]);

		return SignInOut;
	}();
}(document);