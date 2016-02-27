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
	var _signInButton = document.getElementById('sign-in-button');
	var _signInSpinner = document.getElementById('sign-in-spinner');

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

				_signInSpinner.hidden = true;
				SignUp.signUpSpinner.hidden = true;

				if (error) {

					//Handle the error
					Displayer.showSnackbar('Sorry, there was an error signing you in!  :-(');

					Displayer.signInContainerEl.hidden = false;
				} else if (!authData) {

					Displayer.showSnackbar('Sorry, there was an error signing you in!  :-(');

					Displayer.signInContainerEl.hidden = false;
				} else {

					/**
            * Firebase user route reference
            * @member SignInOut#userRef
            * @type {object}
            */
					this.userRef = this.fbRef.child('users/' + authData.uid);

					/**
            * Firebase events route reference
            * @member SignInOut#eventRef
            * @type {object}
            */
					this.eventRef = this.userRef.child('/events');

					/**
            * Firebase extras route reference
            * @member SignInOut#extraRef
            * @type {object}
            */
					this.extraRef = this.userRef.child('/extra');

					//If just signing up store the extra user data
					if (_storeExtra === true) {

						_storeExtra = false;

						this.extraRef.set({

							name: SignUp.signupNameEl.value,
							employer: SignUp.signupEmployerEl.value,
							title: SignUp.signupTitleEl.value,
							birthday: SignUp.signupBirthdayEl.value

						});
					}

					_signOutLinkEl.hidden = false;
					_signInLinkEl.hidden = true;

					// Dispatch/Trigger/Fire the event
					document.dispatchEvent(new CustomEvent("signed-in"));

					Displayer.showEventPlanner();

					Displayer.showSnackbar('You are one AWESOME Signer Inner!... Go You! :-D');
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

				Displayer.signInContainerEl.hidden = true;
				_signInSpinner.hidden = false;

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

				this.fbRef.unauth();

				this.dispose();

				document.dispatchEvent(new CustomEvent("signed-out"));

				Displayer.showSnackbar('Success!  You just Signed Out like a champ... This RAWKS! :-D');

				Displayer.showSignIn();
			}

			/**
    * Resets elements to default
    * @function dispose
    * @memberof SignInOut
    * @instance
    * 
    */

		}, {
			key: 'dispose',
			value: function dispose() {

				this.fbRef = undefined;
				this.userRef = undefined;
				this.eventRef = undefined;
				this.extraRef = undefined;

				_signOutLinkEl.hidden = true;
				_signInLinkEl.hidden = false;

				_signInEmailEl.value = '';
				_signInPasswordEl.value = '';
				_signOutLinkEl.value = '';
				_signInLinkEl.value = '';
			}
		}], [{
			key: 'validateSignIn',


			/** 
   *   @function validateSignIn
   *   @memberof SignInOut
   *   
   */
			value: function validateSignIn() {

				_signInButton.disabled = _signInEmailEl.value === '' || _signInPasswordEl.value === '';
			}
		}, {
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
    * SignIn Button Element
    * @return {Object} SignIn Button Element
    * @memberof SignInOut
    * @type {Object}
    * 
    */

		}, {
			key: 'signInButton',
			get: function get() {

				return _signInButton;
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

			/**
    * Spinner that displays when signing in
    * @memberOf  SignInOut
    * @type {object}
    */

		}, {
			key: 'signInSpinner',
			get: function get() {

				return _signInSpinner;
			}
		}]);

		return SignInOut;
	}();
}(document);