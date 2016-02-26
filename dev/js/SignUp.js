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
	var _valCheckLengthEl = document.getElementById('val-check-length');
	var _valCheckSpecialEl = document.getElementById('val-check-special');
	var _valCheckUpperEl = document.getElementById('val-check-upper');
	var _valCheckLowerEl = document.getElementById('val-check-lower');
	var _valCheckMatchEl = document.getElementById('val-check-match');
	var _valCheckNumberEl = document.getElementById('val-check-number');
	var _valCheckEmailEl = document.getElementById('val-check-email');
	var _valCheckRequiredEl = document.getElementById('val-check-required');

	var _validator = new FV.Validator();
	var _passwordField = new FV.Field("Password1", _signupPasswordEl);
	var _password2Field = new FV.Field("Password2", _signupPassword2El, _signupPasswordEl);
	var _emailField = new FV.Field('EmailError', _signupEmailEl);

	_passwordField.constraints = [new FV.Constraint(FV.Validator.MINLENGTH, "* Password must be at least 8 characters long.\n", 8), new FV.Constraint(FV.Validator.CONTAINSUPPER, "* Password must contain at least one upper case letter.\n"), new FV.Constraint(FV.Validator.CONTAINSLOWER, "* Password must contain at least one lower case letter.\n"), new FV.Constraint(FV.Validator.CONTAINSSPECIAL, "* Password must contain at least one special character (!, @, #, $, %, ^, &, *).\n"), new FV.Constraint(FV.Validator.CONTAINSNUMBER, "* Password must contain at least one number.\n")];

	_password2Field.constraints = [new FV.Constraint(FV.Validator.EQUALSFIELD, "* Must match your password.\n")];

	_emailField.constraints = [new FV.Constraint(FV.Validator.EMAIL, "* Must be a valid email address.\n")];

	_validator.fields = [_passwordField, _password2Field, _emailField];

	/**
  * Private function for showing good/bad auth messages
  * @param  {array} errorTypes Holds the errors present
  * 
  */
	function _checkValFields(errorTypes) {

		if (errorTypes.indexOf(FV.Validator.EMAIL) === -1) {

			_valCheckEmailEl.className = 'val-check-good';
			_valCheckEmailEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Must use a valid email address';
		} else {

			_valCheckEmailEl.className = 'val-check-bad';
			_valCheckEmailEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Must use a valid email address';
		}

		if (errorTypes.indexOf(FV.Validator.MINLENGTH) === -1) {

			_valCheckLengthEl.className = 'val-check-good';
			_valCheckLengthEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must be at least 8 characters long';
		} else {

			_valCheckLengthEl.className = 'val-check-bad';
			_valCheckLengthEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must be at least 8 characters long';
		}

		if (errorTypes.indexOf(FV.Validator.CONTAINSUPPER) === -1) {

			_valCheckUpperEl.className = 'val-check-good';
			_valCheckUpperEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one upper case character';
		} else {

			_valCheckUpperEl.className = 'val-check-bad';
			_valCheckUpperEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one upper case character';
		}

		if (errorTypes.indexOf(FV.Validator.CONTAINSLOWER) === -1) {

			_valCheckLowerEl.className = 'val-check-good';
			_valCheckLowerEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one lower case character';
		} else {

			_valCheckLowerEl.className = 'val-check-bad';
			_valCheckLowerEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one lower case character';
		}

		if (errorTypes.indexOf(FV.Validator.CONTAINSSPECIAL) === -1) {

			_valCheckSpecialEl.className = 'val-check-good';
			_valCheckSpecialEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one special character (!, @, #, $, %, ^, &, *)';
		} else {

			_valCheckSpecialEl.className = 'val-check-bad';
			_valCheckSpecialEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one special character (!, @, #, $, %, ^, &, *)';
		}

		if (errorTypes.indexOf(FV.Validator.EQUALSFIELD) === -1 && _signupPasswordEl.value !== '' && _signupPassword2El.value !== '') {

			_valCheckMatchEl.className = 'val-check-good';
			_valCheckMatchEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Passwords must match';
		} else {

			_valCheckMatchEl.className = 'val-check-bad';
			_valCheckMatchEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Passwords must match';
		}

		if (errorTypes.indexOf(FV.Validator.CONTAINSNUMBER) === -1) {

			_valCheckNumberEl.className = 'val-check-good';
			_valCheckNumberEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one number';
		} else {

			_valCheckNumberEl.className = 'val-check-bad';
			_valCheckNumberEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one number';
		}

		if (_signupNameEl.value === '' || _signupEmailEl.value === '' || _signupPasswordEl.value === '' || _signupPassword2El.value === '') {

			_valCheckRequiredEl.className = 'val-check-bad';
			_valCheckRequiredEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> All required fields must be filled out';
		} else {

			_valCheckRequiredEl.className = 'val-check-good';
			_valCheckRequiredEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> All required fields must be filled out';
		}
	}

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

				this.fbRef.createUser({
					email: _signupEmailEl.value,
					password: _signupPasswordEl.value
				}, function (error, userData) {

					if (error) {

						Displayer.showSnackbar('Sorry!  There was an error signing you up.  :-(');

						console.log("Error creating user:", error);
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
    * @param  {Boolean} skipCustomValidation checks if we will show custom validation
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
			value: function validateSignUp(skipCustomValidation) {

				var errors = _validator.checkForErrors();
				var errorTypes = [];
				var passwordErrors = "";
				var password2Errors = "";
				var emailErrors = "";

				errors.forEach(function (error) {

					switch (error.name) {

						case "Password1":

							passwordErrors += error.error;
							errorTypes.push(error.type);
							break;

						case "Password2":

							password2Errors += error.error;
							errorTypes.push(error.type);
							break;

						case "EmailError":

							emailErrors += error.error;
							errorTypes.push(error.type);
							break;

					}
				});

				if (passwordErrors !== '') {

					passwordErrors = "Please correct the following errors:\n" + passwordErrors;
				}

				if (password2Errors !== '') {

					password2Errors = "Please correct the following errors:\n" + password2Errors;
				}

				if (emailErrors !== '') {

					emailErrors = "Please correct the following errors:\n" + emailErrors;
				}

				//These will only display one at a time
				if (!skipCustomValidation) {

					_signupPasswordEl.setCustomValidity(passwordErrors);
					_signupPassword2El.setCustomValidity(password2Errors);
				}

				_submitPasswordButton.disabled = errorTypes.length > 0;
				_checkValFields(errorTypes);
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
    * Signup Password 2 Element
    * @return {Object} Signup Password 2 Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'signupPassword2El',
			get: function get() {

				return _signupPassword2El;
			}

			/**
    * Submit Password Button Element
    * @return {Object} Submit Password Button Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'submitPasswordButton',
			get: function get() {

				return _submitPasswordButton;
			}

			/**
    * SignUp Additional Info Element
    * @return {Object} SignUp Additional Info Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'signupAdditionalInfoEl',
			get: function get() {

				return _signupAdditionalInfoEl;
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
    * Val Check Length Element
    * @return {Object} Val Check Length Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'valCheckLengthEl',
			get: function get() {

				return _valCheckLengthEl;
			}

			/**
    * Val Check Special Element
    * @return {Object} Val Check Special Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'valCheckSpecialEl',
			get: function get() {

				return _valCheckSpecialEl;
			}

			/**
    * Val Check Upper Element
    * @return {Object} Val Check Upper Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'valCheckUpperEl',
			get: function get() {

				return _valCheckUpperEl;
			}

			/**
    * Val Check Lower Element
    * @return {Object} Val Check Lower Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'valCheckLowerEl',
			get: function get() {

				return _valCheckLowerEl;
			}

			/**
    * Val Check Match Element
    * @return {Object} Val Check Match Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'valCheckMatchEl',
			get: function get() {

				return _valCheckMatchEl;
			}

			/**
    * Val Check Number Element
    * @return {Object} Val Check Number Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'valCheckNumberEl',
			get: function get() {

				return _valCheckNumberEl;
			}

			/**
    * Val Check Email Element
    * @return {Object} Val Check Email Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'valCheckEmailEl',
			get: function get() {

				return _valCheckEmailEl;
			}

			/**
    * Val Check Required Element
    * @return {Object} Val Check Required Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'valCheckRequiredEl',
			get: function get() {

				return _valCheckRequiredEl;
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
		}]);

		return SignUp;
	}();
}();