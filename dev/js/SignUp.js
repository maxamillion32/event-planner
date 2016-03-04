'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var SignUp = function () {
	'use strict';

	//signing up

	var _signupNameEl = document.getElementById('signup-name');
	var _signupEmailEl = document.getElementById('signup-email');
	var _signupPasswordEl = document.getElementById('signup-password');
	var _signupPassword2El = document.getElementById('signup-password2');
	var _signupEmployerEl = document.getElementById('signup-employer');
	var _signupTitleEl = document.getElementById('signup-title');
	var _signupBirthdayEl = document.getElementById('signup-birthday');
	var _submitPasswordButton = document.getElementById('submit-password-button');
	var _signupAdditionalInfoEl = document.getElementById('signup-additional-info');
	var _signupSwitchEl = document.getElementById('switch-1');
	var _signUpSpinner = document.getElementById('sign-up-spinner');
	var _signupNameDivEl = document.getElementById('signup-name-div');
	var _signupEmailDivEl = document.getElementById('signup-email-div');
	var _signupPasswordDivEl = document.getElementById('signup-password-div');
	var _signupPasswordRepeatDivEl = document.getElementById('signup-password-repeat-div');
	var _passwordErrorEl = document.getElementById('password-error');
	var _passwordRepeatErrorEl = document.getElementById('password-repeat-error');

	/**
  * Represents a SignUp Page
  * @class SignUp
  * 
  */
	return function () {
		function SignUp(fbRef) {
			_classCallCheck(this, SignUp);

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


		_createClass(SignUp, [{
			key: 'signUp',


			/**
    * @function signUp
    * @memberof SignUp
    * @instance
    * 
    */
			value: function signUp() {

				_signUpSpinner.hidden = false;
				Displayer.signUpContainerEl.hidden = true;

				this.fbRef.createUser({
					email: _signupEmailEl.value,
					password: _signupPasswordEl.value
				}, function (error, userData) {

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

		}, {
			key: 'showAdditionalInfo',


			/**
    * Show/hide additional info
    * @function showAdditionalInfo
    * @memberOf SignUp
    * @instance
    */
			value: function showAdditionalInfo() {

				_signupAdditionalInfoEl.hidden = !_signupSwitchEl.checked;
			}

			/**
    * Show/hide additional info
    * @function dispose
    * @memberOf SignUp
    * @instance
    */

		}, {
			key: 'dispose',
			value: function dispose() {

				this.fbRef = undefined;
				_signupNameEl.value = '';
				_signupEmailEl.value = '';
				_signupPasswordEl.value = '';
				_signupPassword2El.value = '';
				_signupEmployerEl.value = '';
				_signupTitleEl.value = '';
				_signupBirthdayEl.value = '';
				_signupAdditionalInfoEl.hidden = true;
				SignUp.validateSignUp(false);
			}
		}], [{
			key: 'validateSignUp',
			value: function validateSignUp() {

				var valid = true;
				var passwordMessage = '';
				var password2Message = '';

				if (_signupNameDivEl.className.indexOf('is-invalid') > -1) {

					valid = false;
				}

				if (_signupEmailDivEl.className.indexOf('is-invalid') > -1) {

					valid = false;
				}

				if (!_signupPasswordEl.value) {

					passwordMessage += '<div>Required</div>';
					valid = false;
				}

				if (_signupPasswordEl.value.length < 8) {

					passwordMessage += '<div>Password must be at least 8 characters long</div>';
					valid = false;

					if (_signupPasswordDivEl.className.indexOf('is-invalid') === -1) {

						_signupPasswordDivEl.className += ' is-invalid';
					}
				}

				if (!_signupPasswordEl.value.match(/[A-Z]/g)) {

					passwordMessage += '<div>Must contain at least one upper case character</div>';
					valid = false;

					if (_signupPasswordDivEl.className.indexOf('is-invalid') === -1) {

						_signupPasswordDivEl.className += ' is-invalid';
					}
				}

				if (!_signupPasswordEl.value.match(/[a-z]/g)) {

					passwordMessage += '<div>Must contain at least one lower case character</div>';
					valid = false;

					if (_signupPasswordDivEl.className.indexOf('is-invalid') === -1) {

						_signupPasswordDivEl.className += ' is-invalid';
					}
				}

				if (!_signupPasswordEl.value.match(/\d+/g)) {

					passwordMessage += '<div>Must contain at least one number</div>';
					valid = false;

					if (_signupPasswordDivEl.className.indexOf('is-invalid') === -1) {

						_signupPasswordDivEl.className += ' is-invalid';
					}
				}

				if (!_signupPassword2El.value) {

					valid = false;
					password2Message += '<div>Required</div>';
				}

				if (_signupPasswordEl.value !== _signupPassword2El.value) {

					passwordMessage += '<div>Passwords must match</div>';
					password2Message += '<div>Passwords must match</div>';
					valid = false;

					if (_signupPasswordDivEl.className.indexOf('is-invalid') === -1) {

						_signupPasswordDivEl.className += ' is-invalid';
					}

					if (_signupPasswordRepeatDivEl.className.indexOf('is-invalid') === -1) {

						_signupPasswordRepeatDivEl.className += ' is-invalid';
					}
				}

				_submitPasswordButton.disabled = !valid;

				_signupPasswordEl.setCustomValidity(passwordMessage);
				_passwordErrorEl.innerHTML = passwordMessage;
				_passwordRepeatErrorEl.innerHTML = password2Message;
			}
		}, {
			key: 'signupNameEl',
			get: function get() {

				return _signupNameEl;
			}

			/**
    * Signup Email Element
    * @return {Object} Signup Email Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'signupEmailEl',
			get: function get() {

				return _signupEmailEl;
			}

			/**
    * Signup Password Element
    * @return {Object} Signup Password Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'signupPasswordEl',
			get: function get() {

				return _signupPasswordEl;
			}

			/**
    * Signup Switch Element
    * @return {Object} Signup Switch Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'signupSwitchEl',
			get: function get() {

				return _signupSwitchEl;
			}

			/**
    * Sign Up Employer Element
    * @return {Object} Sign Up Employer Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'signupEmployerEl',
			get: function get() {

				return _signupEmployerEl;
			}

			/**
    * Sign Up Title Element
    * @return {Object} Sign Up Title Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'signupTitleEl',
			get: function get() {

				return _signupTitleEl;
			}

			/**
    * Sign Up Birthday Element
    * @return {Object} Sign Up Birthday Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'signupBirthdayEl',
			get: function get() {

				return _signupBirthdayEl;
			}

			/**
    * Sign Up Spinner Element
    * @return {Object} Sign Up Spinner Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'signUpSpinner',
			get: function get() {

				return _signUpSpinner;
			}
		}]);

		return SignUp;
	}();
}();