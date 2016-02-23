/*jshint esversion: 6 */

var SignInOut = (function(document) {
	'use strict';

	//signing in
	let _signInEmailEl = 		document.getElementById('signin-email');
	let _signInPasswordEl = 	document.getElementById('signin-password');
	let _signOutLinkEl =		document.getElementById('sign-out-link');
	let _signInLinkEl =			document.getElementById('sign-in-link');
	let _signupEmployerEl =		document.getElementById('signup-employer');
	let _signupTitleEl =		document.getElementById('signup-title');
	let _signupBirthdayEl =		document.getElementById('signup-birthday');
	let _signInButton =			document.getElementById('sign-in-button');

	let _storeExtra = false;

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
	return class SignInOut {

		/**
	     * SignInOut constructor.
	     * @constructs SignInOut
	     * @param {object} fbRef Firebase Reference
	     */
		constructor(fbRef) {

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
		static get signInEmailEl() {

			return _signInEmailEl;
		}

		/**
		 * SgnIn Password Element
		 * @return {Object} SignIn Password Element
		 * @memberof SignInOut
		 * @type {Object}
		 * 
		 */
		static get signInPasswordEl() {

			return _signInPasswordEl;
		}

		/**
		 * SignOut Link Element
		 * @return {Object} SignOut Link Element
		 * @memberof SignInOut
		 * @type {Object}
		 * 
		 */
		static get signOutLinkEl() {

			return _signOutLinkEl;
		}

		/**
		 * SignIn Link Element
		 * @return {Object} SignIn Link Element
		 * @memberof SignInOut
		 * @type {Object}
		 * 
		 */
		static get signInLinkEl() {

			return _signInLinkEl;
		}

		/**
		 * SignIn Employer Element
		 * @return {Object} SignUp Employer Element
		 * @memberof SignInOut
		 * @type {Object}
		 * 
		 */
		static get signupEmployerEl() {

			return _signupEmployerEl;
		}

		/**
		 * SignIn Title Element
		 * @return {Object} Signup Title Element
		 * @memberof SignInOut
		 * @type {Object}
		 * 
		 */
		static get signupTitleEl() {

			return _signupTitleEl;
		}

		/**
		 * SignIn Birthday Element
		 * @return {Object} Signup Birthday Element
		 * @memberof SignInOut
		 * @type {Object}
		 * 
		 */
		static get signupBirthdayEl() {

			return _signupBirthdayEl;
		}

		/**
		 * SignIn Button Element
		 * @return {Object} SignIn Button Element
		 * @memberof SignInOut
		 * @type {Object}
		 * 
		 */
		static get signInButton() {

			return _signInButton;

		}

		/**
		 * Indicates if we will be storing additional user info when signing in (after a signup)
		 * @return {boolean} Indicates if we will be storing additional user info when signing in (after a signup)
		 * @memberof SignInOut
		 * @type {boolean}
		 * 
		 */
		static get storeExtra() {

			return _storeExtra;
		}

		/**
		 * Indicates if we will be storing additional user info when signing in (after a signup)
		 * @memberof SignInOut
		 * @param {boolean} pred Indicates if we will be storing additional user info when signing in (after a signup)
		 * @type {boolean}
		 * 
		 */
		static set storeExtra(pred) {

			_storeExtra = pred;
		}

		/** 
		*   @function validateSignIn
		*   @memberof SignInOut
		*   
		*/
		static validateSignIn() {

			_signInButton.disabled = _signInEmailEl.value === '' || _signInPasswordEl.value === '';

		}

		/** 
		*   @function authHandler
		*   @memberof SignInOut
		*   @param {object} error Holds the error if set
		*   @param {object} authData Users auth data from firebase
		*   @instance
		*/
		authHandler(error, authData) {

			if(error) {

				//Handle the error

			} else if (!authData) {

				console.log("User is logged out");

			} else {

				/**
		         * Firebase user route reference
		         * @member SignInOut#userRef
		         * @type {object}
		         */
				this.userRef = 	this.fbRef.child('users/' + authData.uid);

				/**
		         * Firebase events route reference
		         * @member SignInOut#eventRef
		         * @type {object}
		         */
				this.eventRef = this.userRef.child('events/');

				/**
		         * Firebase extras route reference
		         * @member SignInOut#extraRef
		         * @type {object}
		         */
				this.extraRef = this.userRef.child('extra/');

				//If just signing up store the extra user data
				if(_storeExtra === true) {

					_storeExtra = false;

					this.extraRef.set({

						name: 		_signupNameEl.value,
						employer: 	_signupEmployerEl.value,
						title: 		_signupTitleEl.value,
						birthday: 	_signupBirthdayEl.value

					});

				}

				_signOutLinkEl.hidden = 	false;
				_signInLinkEl.hidden = 	true;

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
		signIn(emailIn, passwordIn) {

			let email = 	emailIn || _signInEmailEl.value;
			let password = 	passwordIn || _signInPasswordEl.value;

			// Sign in with an email/password combination
			this.fbRef.authWithPassword({
			  email : 		email ,
			  password : 	password
			}, this.authHandler.bind(this));

		}

		/**
		 * @function signOut
		 * @memberof SignInOut
		 * @instance
		 * 
		 */
		signOut() {

			_signOutLinkEl.hidden = 		true;
			_signInLinkEl.hidden = 			false;
			this.fbRef.unauth();
			this.eventRef.off();
			this.extraRef.off();
			this.userRef = 					undefined;
			this.eventRef = 				undefined;
			this.extraRef = 				undefined;
			_signInEmailEl.value = 			'';
			_signInPasswordEl.value = 		'';

			SignUp.signupNameEl.value = 		'';
			SignUp.signupEmailEl.value = 		'';
			SignUp.signupPasswordEl.value = 	'';
			SignUp.signupPassword2El.value = 	'';
			EventPlanner.clearElements();
			_clearEl(_eventContainerEl);

			document.dispatchEvent(new CustomEvent("signed-out"));

			Display.showSignIn();

		}

	};

})(document);