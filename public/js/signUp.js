/*jshint esversion: 6 */

var SignUp = (function() {
	'use strict';

	//signing up
	let _signupNameEl = 				document.getElementById('signup-name');
	let _signupEmailEl = 				document.getElementById('signup-email');
	let _signupPasswordEl = 			document.getElementById('signup-password');
	let _signupPassword2El = 			document.getElementById('signup-password2');
	let _signupEmployerEl =				document.getElementById('signup-employer');
	let _signupTitleEl =				document.getElementById('signup-title');
	let _signupBirthdayEl =				document.getElementById('signup-birthday');
	let _submitPasswordButton =			document.getElementById('submit-password-button');
	let _signupAdditionalInfoEl =		document.getElementById('signup-additional-info');
	let _signupSwitchEl =				document.getElementById('switch-1');
	let _signUpSpinner = 				document.getElementById('sign-up-spinner');
	let _signupNameDivEl =				document.getElementById('signup-name-div');
	let _signupEmailDivEl = 			document.getElementById('signup-email-div');
	let _signupPasswordDivEl =			document.getElementById('signup-password-div');
	let _signupPasswordRepeatDivEl =	document.getElementById('signup-password-repeat-div');
	let _passwordErrorEl =				document.getElementById('password-error');
	let _passwordRepeatErrorEl =		document.getElementById('password-repeat-error');

	/**
	 * Represents a SignUp Page
	 * @class SignUp
	 * 
	 */
	return class SignUp {

		constructor(fbRef) {

			/**
			 * Firebase Reference
			 * @member SignUp#fbRef
			 * @type {Object}
			 */
			this.fbRef = fbRef;

			/**
			 * Validating input before submitting the password
			 * 
			 */
			_submitPasswordButton.onclick = this.validateSignUp;

		}

		/**
		 * Signup Container Element
		 * @return {Object} SignupContainer Element
		 * @memberof SignUp
		 * @type {Object}
		 * 
		 */
		static get signupNameEl() {

			return _signupNameEl;
		}

		/**
		 * Signup Email Element
		 * @return {Object} Signup Email Element
		 * @memberof SignUp
		 * @type {Object}
		 * 
		 */
		static get signupEmailEl() {

			return _signupEmailEl;
		}

		/**
		 * Signup Password Element
		 * @return {Object} Signup Password Element
		 * @memberof SignUp
		 * @type {Object}
		 * 
		 */
		static get signupPasswordEl() {

			return _signupPasswordEl;
		}

		/**
		 * Signup Switch Element
		 * @return {Object} Signup Switch Element
		 * @memberof SignUp
		 * @type {Object}
		 * 
		 */
		static get signupSwitchEl() {

			return _signupSwitchEl;
		}

		/**
		 * Sign Up Employer Element
		 * @return {Object} Sign Up Employer Element
		 * @memberof SignUp
		 * @type {Object}
		 * 
		 */
		static get signupEmployerEl() {

			return _signupEmployerEl;

		}
		
		/**
		 * Sign Up Title Element
		 * @return {Object} Sign Up Title Element
		 * @memberof SignUp
		 * @type {Object}
		 * 
		 */
		static get signupTitleEl() {

			return _signupTitleEl;

		}

		/**
		 * Sign Up Birthday Element
		 * @return {Object} Sign Up Birthday Element
		 * @memberof SignUp
		 * @type {Object}
		 * 
		 */
		static get signupBirthdayEl() {

			return _signupBirthdayEl;

		}

		/**
		 * Sign Up Spinner Element
		 * @return {Object} Sign Up Spinner Element
		 * @memberof SignUp
		 * @type {Object}
		 * 
		 */
		static get signUpSpinner() {

			return _signUpSpinner;

		}

		/**
		 * @function signUp
		 * @memberof SignUp
		 * @instance
		 * 
		 */
		signUp() {

			_signUpSpinner.hidden = false;
			Displayer.signUpContainerEl.hidden = true;

			this.fbRef.createUser({
			  email    : _signupEmailEl.value,
			  password : _signupPasswordEl.value
			}, function(error, userData) {	

				if (error) {

					Displayer.showSnackbar('Sorry!  There was an error signing you up.  :-(');

					_signUpSpinner.hidden = true;
					Displayer.signUpContainerEl.hidden = false;

				} else {

					Displayer.showSnackbar('Successfully Signed Up!  :-D');

					SignInOut.storeExtra = true;

					document.dispatchEvent(new CustomEvent("signed-up"));

				}
			  
			});

		}

		/**
		 * Validate sign up page
		 * @memberof SignUp
		 * 
		 */
		static validateSignUp() {

			let valid = true;
			let passwordMessage = '';
			let password2Message = '';

			if(_signupNameDivEl.className.indexOf('is-invalid') > -1) {

				valid = false;

			}

			if(_signupEmailDivEl.className.indexOf('is-invalid') > -1) {

				valid = false;

			}

			if(!_signupPasswordEl.value) {

				passwordMessage += '<div>Required</div>';
				valid = false;

			}

			if(_signupPasswordEl.value.length < 8) {

				passwordMessage += '<div>Password must be at least 8 characters long</div>';
				valid = false;

				if(_signupPasswordDivEl.className.indexOf('is-invalid') === -1 ) {

					_signupPasswordDivEl.className += ' is-invalid';

				}

			}

			if(!_signupPasswordEl.value.match(/[A-Z]/g)) {

				passwordMessage += '<div>Must contain at least one upper case character</div>';
				valid = false;

				if(_signupPasswordDivEl.className.indexOf('is-invalid') === -1 ) {

					_signupPasswordDivEl.className += ' is-invalid';

				}

			}

			if(!_signupPasswordEl.value.match(/[a-z]/g)) {

				passwordMessage += '<div>Must contain at least one lower case character</div>';
				valid = false;

				if(_signupPasswordDivEl.className.indexOf('is-invalid') === -1 ) {

					_signupPasswordDivEl.className += ' is-invalid';

				}

			}

			if(!_signupPasswordEl.value.match(/\d+/g)) {

				passwordMessage += '<div>Must contain at least one number</div>';
				valid = false;

				if(_signupPasswordDivEl.className.indexOf('is-invalid') === -1 ) {

					_signupPasswordDivEl.className += ' is-invalid';

				}

			}

			if(!_signupPassword2El.value) {

				valid = false;
				password2Message += '<div>Required</div>';

			}

			if(_signupPasswordEl.value !== _signupPassword2El.value) {

				passwordMessage += '<div>Passwords must match</div>';
				password2Message += '<div>Passwords must match</div>';
				valid = false;

				if(_signupPasswordDivEl.className.indexOf('is-invalid') === -1 ) {

					_signupPasswordDivEl.className += ' is-invalid';

				}

				if(_signupPasswordRepeatDivEl.className.indexOf('is-invalid') === -1) {

					_signupPasswordRepeatDivEl.className += ' is-invalid';

				}

			}

			_submitPasswordButton.disabled = !valid;

			_signupPasswordEl.setCustomValidity(passwordMessage);
			_passwordErrorEl.innerHTML = passwordMessage;
			_passwordRepeatErrorEl.innerHTML = password2Message;

		}

		/**
		 * Show/hide additional info
		 * @function showAdditionalInfo
		 * @memberOf SignUp
		 * @instance
		 */
		showAdditionalInfo() {

			_signupAdditionalInfoEl.hidden = !_signupSwitchEl.checked;

		}

		/**
		 * Show/hide additional info
		 * @function dispose
		 * @memberOf SignUp
		 * @instance
		 */
		dispose() {

			this.fbRef =						undefined;
			_signupNameEl.value = 				'';
			_signupEmailEl.value = 				'';
			_signupPasswordEl.value = 			'';
			_signupPassword2El.value = 			'';
			_signupEmployerEl.value = 			'';
			_signupTitleEl.value = 				'';
			_signupBirthdayEl.value = 			'';
			_signupAdditionalInfoEl.hidden = 	true;
			SignUp.validateSignUp(false);

		}

	};

})();