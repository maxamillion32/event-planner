/*jshint esversion: 6 */

var SignUp = (function() {
	'use strict';

	//signing up
	let _signupNameEl = 			document.getElementById('signup-name');
	let _signupEmailEl = 			document.getElementById('signup-email');
	let _signupPasswordEl = 		document.getElementById('signup-password');
	let _signupPassword2El = 		document.getElementById('signup-password2');
	let _signupEmployerEl =			document.getElementById('signup-employer');
	let _signupTitleEl =			document.getElementById('signup-title');
	let _signupBirthdayEl =			document.getElementById('signup-birthday');
	let _submitPasswordButton =		document.getElementById('submit-password-button');
	let _signupAdditionalInfoEl =	document.getElementById('signup-additional-info');
	let _signupSwitchEl =			document.getElementById('switch-1');
	let _valCheckLengthEl =			document.getElementById('val-check-length');
	let _valCheckUpperEl =			document.getElementById('val-check-upper');
	let _valCheckLowerEl =			document.getElementById('val-check-lower');
	let _valCheckMatchEl =			document.getElementById('val-check-match');
	let _valCheckNumberEl =			document.getElementById('val-check-number');
	let _valCheckEmailEl =			document.getElementById('val-check-email');
	let _valCheckRequiredEl =		document.getElementById('val-check-required');
	let _signUpSpinner = 			document.getElementById('sign-up-spinner');

	let _validator = 				new FV.Validator();
	let _passwordField = 			new FV.Field("Password1", _signupPasswordEl);
	let _password2Field = 			new FV.Field("Password2", _signupPassword2El, _signupPasswordEl);
	let _emailField =				new FV.Field('EmailError', _signupEmailEl);

	_passwordField.constraints = [
		new FV.Constraint(FV.Validator.MINLENGTH, 
			"* Password must be at least 8 characters long.\n",
			8),
		new FV.Constraint(FV.Validator.CONTAINSUPPER,
			"* Password must contain at least one upper case letter.\n"),
		new FV.Constraint(FV.Validator.CONTAINSLOWER,
			"* Password must contain at least one lower case letter.\n"),
		new FV.Constraint(FV.Validator.CONTAINSNUMBER,
			"* Password must contain at least one number.\n")
	];

	_password2Field.constraints = [new FV.Constraint(FV.Validator.EQUALSFIELD,
			"* Must match your password.\n")];

	_emailField.constraints = [new FV.Constraint(FV.Validator.EMAIL, "* Must be a valid email address.\n")];

	_validator.fields = [_passwordField, _password2Field, _emailField];

	/**
	 * Private function for showing good/bad auth messages
	 * @param  {array} errorTypes Holds the errors present
	 * 
	 */
	function _checkValFields(errorTypes) {

		if(errorTypes.indexOf(FV.Validator.EMAIL) === -1) {

			_valCheckEmailEl.className = 'val-check-good';
			_valCheckEmailEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i>&nbsp;&nbsp;Must use a valid email address';

		} else {

			_valCheckEmailEl.className = 'val-check-bad';
			_valCheckEmailEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i>&nbsp;&nbsp;Must use a valid email address';

		}

		if(errorTypes.indexOf(FV.Validator.MINLENGTH) === -1) {

			_valCheckLengthEl.className = 'val-check-good';
			_valCheckLengthEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i>&nbsp;&nbsp;Password must be at least 8 characters long';

		} else {

			_valCheckLengthEl.className = 'val-check-bad';
			_valCheckLengthEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i>&nbsp;&nbsp;Password must be at least 8 characters long';

		}

		if(errorTypes.indexOf(FV.Validator.CONTAINSUPPER) === -1) {

			_valCheckUpperEl.className = 'val-check-good';
			_valCheckUpperEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i>&nbsp;&nbsp;Password must contain at least one upper case character';

		} else {

			_valCheckUpperEl.className = 'val-check-bad';
			_valCheckUpperEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i>&nbsp;&nbsp;Password must contain at least one upper case character';

		}

		if(errorTypes.indexOf(FV.Validator.CONTAINSLOWER) === -1) {

			_valCheckLowerEl.className = 'val-check-good';
			_valCheckLowerEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i>&nbsp;&nbsp;Password must contain at least one lower case character';

		} else {

			_valCheckLowerEl.className = 'val-check-bad';
			_valCheckLowerEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i>&nbsp;&nbsp;Password must contain at least one lower case character';

		}

		if(errorTypes.indexOf(FV.Validator.EQUALSFIELD) === -1 && _signupPasswordEl.value !== '' && _signupPassword2El.value !== '') {

			_valCheckMatchEl.className = 'val-check-good';
			_valCheckMatchEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i>&nbsp;&nbsp;Passwords must match';

		} else {

			_valCheckMatchEl.className = 'val-check-bad';
			_valCheckMatchEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i>&nbsp;&nbsp;Passwords must match';

		}

		if(errorTypes.indexOf(FV.Validator.CONTAINSNUMBER) === -1) {

			_valCheckNumberEl.className = 'val-check-good';
			_valCheckNumberEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i>&nbsp;&nbsp;Password must contain at least one number';

		} else {

			_valCheckNumberEl.className = 'val-check-bad';
			_valCheckNumberEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i>&nbsp;&nbsp;Password must contain at least one number';

		}

		if( _signupNameEl.value === '' || _signupEmailEl.value === '' || _signupPasswordEl.value === '' || _signupPassword2El.value === '') {

			_valCheckRequiredEl.className = 'val-check-bad';
			_valCheckRequiredEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i>&nbsp;&nbsp;All required fields must be filled out';

		} else {

			_valCheckRequiredEl.className = 'val-check-good';
			_valCheckRequiredEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i>&nbsp;&nbsp;All required fields must be filled out';

		}

	}

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
		 * @param  {Boolean} skipCustomValidation checks if we will show custom validation
		 * 
		 */
		static validateSignUp(skipCustomValidation) {

			let errors = 			_validator.checkForErrors();
			let errorTypes = 		[];
			let passwordErrors = 	"";
			let password2Errors = 	"";
			let emailErrors =		"";

			errors.forEach(error => {

				switch(error.name) {

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

			if(passwordErrors !== '') {

				passwordErrors = "Please correct the following errors:\n" + passwordErrors;

			}

			if(password2Errors !== '') {

				password2Errors = "Please correct the following errors:\n" + password2Errors;

			}

			if(emailErrors !== '') {

				emailErrors = "Please correct the following errors:\n" + emailErrors;

			}

			//These will only display one at a time
			if (!skipCustomValidation) {

				_signupEmailEl.setCustomValidity(emailErrors);
				_signupPasswordEl.setCustomValidity(passwordErrors);
				_signupPassword2El.setCustomValidity(password2Errors);

			}

			_submitPasswordButton.disabled = errorTypes.length > 0;
			_checkValFields(errorTypes);

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