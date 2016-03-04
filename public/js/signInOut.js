/*jshint esversion: 6 */

var SignInOut = (function(document) {
	'use strict';

	//signing in
	let _signInEmailEl = 		document.getElementById('signin-email');
	let _signInPasswordEl = 	document.getElementById('signin-password');
	let _signOutLinkEl =		document.getElementById('sign-out-link');
	let _signInLinkEl =			document.getElementById('sign-in-link');
	let _signInButton =			document.getElementById('sign-in-button');
	let _signInSpinner = 		document.getElementById('sign-in-spinner');

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

			/**
			 * Users email
			 * @member SignInOut#email
			 * @type {string}
			 */
			this.email = undefined;

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

			_signInSpinner.hidden = true;

			if(error) {

				//Handle the error
				Displayer.showSnackbar('Sorry, there was an error signing you in!  :-(');

				Displayer.signInContainerEl.hidden = false;

			} else if (!authData) {

				Displayer.showSnackbar('Sorry, there was an error signing you in!  :-(');

				Displayer.signInContainerEl.hidden = false;

			} else {

				this.email = authData.password.email;

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
				this.eventRef = this.userRef.child('/events');

				/**
				 * Firebase extras route reference
				 * @member SignInOut#extraRef
				 * @type {object}
				 */
				this.extraRef = this.userRef.child('/extra');

				//If just signing up store the extra user data
				if(_storeExtra === true) {

					_storeExtra = false;

					this.extraRef.set({

						name: 		SignUp.signupNameEl.value,
						employer: 	SignUp.signupEmployerEl.value,
						title: 		SignUp.signupTitleEl.value,
						birthday: 	SignUp.signupBirthdayEl.value

					});

				}

				_signOutLinkEl.hidden = 	false;
				_signInLinkEl.hidden = 	true;

				// Dispatch/Trigger/Fire the event
				document.dispatchEvent(new CustomEvent("signed-in"));

				//Show the correct view
				if(Displayer.addEventsTabEl.className.indexOf('is-active') > -1) {

					Displayer.showEventPlanner();

				} else if(Displayer.showEventsTabEl.className.indexOf('is-active') > -1) {

					Displayer.showEventContainer();

				} else {

					Displayer.showUserInfo();

				}	

				Displayer.showSnackbar('You are one AWESOME Signer Inner!... Go You! :-D');

			}
			

		}

		/**
		 * @function signIn
		 * @memberof SignInOut
		 * @param {string} emailIn Holds the users email
		 * @param {string} passwordIn Holds the users password
		 * @instance
		 * 
		 */
		signIn(emailIn, passwordIn) {

			let email = 	emailIn || _signInEmailEl.value;
			let password = 	passwordIn || _signInPasswordEl.value;

			Displayer.signInContainerEl.hidden = true;
			SignUp.signUpSpinner.hidden = true;
			_signInSpinner.hidden = false;

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
		dispose() {

			this.fbRef =					undefined;
			this.userRef = 					undefined;
			this.eventRef = 				undefined;
			this.extraRef = 				undefined;
			this.email = 					undefined;

			_signOutLinkEl.hidden = 		true;
			_signInLinkEl.hidden = 			false;

			_signInEmailEl.value = '';
			_signInPasswordEl.value = '';
			_signOutLinkEl.value = '';
			_signInLinkEl.value = '';

		}

	};

})(document);