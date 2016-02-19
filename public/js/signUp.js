(function() {
	'use strict';

	var APP = window.APP || Object.create(null);

	let submitPasswordButton =		document.getElementById('submit-password-button');
	let signupAdditionalInfoEl =	document.getElementById('signup-additional-info');
	let signupSwitchEl =			document.getElementById('switch-1');
	let validator = 				new FV.Validator();
	let passwordField = 			new FV.Field("Password1", signupPasswordEl);
	let password2Field = 			new FV.Field("Password2", signupPassword2El, signupPasswordEl);
	let emailField =				new FV.Field('EmailError', signupEmailEl);
	let valCheckLengthEl =			document.getElementById('val-check-length');
	let valCheckSpecialEl =			document.getElementById('val-check-special');
	let valCheckUpperEl =			document.getElementById('val-check-upper');
	let valCheckLowerEl =			document.getElementById('val-check-lower');
	let valCheckMatchEl =			document.getElementById('val-check-match');
	let valCheckNumberEl =			document.getElementById('val-check-number');
	let valCheckEmailEl =			document.getElementById('val-check-email');

	/******************************************************************
	Sign up functionality
	/******************************************************************

	/**
	 * User is signing up
	 * 
	 */
	APP.signUp = function() {

		APP.ref.createUser({
		  email    : APP.signupEmailEl.value,
		  password : APP.signupPasswordEl.value
		}, function(error, userData) {

		  if (error) {

		    console.log("Error creating user:", error);

		  } else {

		  	APP.storeExtra = true;

		    APP.signIn(signupEmailEl.value, signupPasswordEl.value);

		  }
		  
		});

	};

	/**
	 * Check for various validation errors
	 * 
	 */
	function _checkValFields(errorTypes) {

		if(errorTypes.indexOf(FV.Validator.EMAIL) === -1) {

			valCheckEmailEl.className = 'val-check-good';
			valCheckEmailEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Must use a valid email address';

		} else {

			valCheckEmailEl.className = 'val-check-bad';
			valCheckEmailEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Must use a valid email address';

		}

		if(errorTypes.indexOf(FV.Validator.MINLENGTH) === -1) {

			valCheckLengthEl.className = 'val-check-good';
			valCheckLengthEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must be at least 8 characters long';

		} else {

			valCheckLengthEl.className = 'val-check-bad';
			valCheckLengthEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must be at least 8 characters long';

		}

		if(errorTypes.indexOf(FV.Validator.CONTAINSUPPER) === -1) {

			valCheckUpperEl.className = 'val-check-good';
			valCheckUpperEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one upper case character';

		} else {

			valCheckUpperEl.className = 'val-check-bad';
			valCheckUpperEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one upper case character';

		}

		if(errorTypes.indexOf(FV.Validator.CONTAINSLOWER) === -1) {

			valCheckLowerEl.className = 'val-check-good';
			valCheckLowerEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one lower case character';

		} else {

			valCheckLowerEl.className = 'val-check-bad';
			valCheckLowerEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one lower case character';

		}

		if(errorTypes.indexOf(FV.Validator.CONTAINSSPECIAL) === -1) {

			valCheckSpecialEl.className = 'val-check-good';
			valCheckSpecialEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one special character (!, @, #, $, %, ^, &, *)';

		} else {

			valCheckSpecialEl.className = 'val-check-bad';
			valCheckSpecialEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one special character (!, @, #, $, %, ^, &, *)';

		}

		if(errorTypes.indexOf(FV.Validator.EQUALSFIELD) === -1 && APP.signupPasswordEl.value !== '' && APP.signupPassword2El.value !== '') {

			valCheckMatchEl.className = 'val-check-good';
			valCheckMatchEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Passwords must match';

		} else {

			valCheckMatchEl.className = 'val-check-bad';
			valCheckMatchEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Passwords must match';

		}

		if(errorTypes.indexOf(FV.Validator.CONTAINSNUMBER) === -1) {

			valCheckNumberEl.className = 'val-check-good';
			valCheckNumberEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one number';

		} else {

			valCheckNumberEl.className = 'val-check-bad';
			valCheckNumberEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one number';

		}

		if( APP.signupNameEl.value === '' || APP.signupEmailEl.value === '' || APP.signupPasswordEl.value === '' || APP.signupPassword2El.value === '') {

			APP.valCheckRequiredEl.className = 'val-check-bad';
			APP.valCheckRequiredEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> All required fields must be filled out';

		} else {

			APP.valCheckRequiredEl.className = 'val-check-good';
			APP.valCheckRequiredEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> All required fields must be filled out';

		}

	}

	/**
	 * Validate sign up page
	 * 
	 * @param  {Boolean} skipCustomValidation checks if we will show custom validation
	 * 
	 */
	APP.validateSignUp = function (skipCustomValidation) {

		let errors = 			validator.checkForErrors();
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

			APP.signupPasswordEl.setCustomValidity(passwordErrors);
			APP.signupPassword2El.setCustomValidity(password2Errors);

		}

		_checkValFields(errorTypes);

	};

	/**
	 * Validating input before submitting the password
	 * 
	 */
	submitPasswordButton.onclick = APP.validateSignUp;

	/**
	 * Show/hide additional info
	 * 
	 */
	APP.showAdditionalInfo = function() {

		signupAdditionalInfoEl.hidden = !signupSwitchEl.checked;

	};

	passwordField.constraints = [
		new FV.Constraint(FV.Validator.MINLENGTH, 
			"* Password must be at least 8 characters long.\n",
			8),
		new FV.Constraint(FV.Validator.CONTAINSUPPER,
			"* Password must contain at least one upper case letter.\n"),
		new FV.Constraint(FV.Validator.CONTAINSLOWER,
			"* Password must contain at least one lower case letter.\n"),
		new FV.Constraint(FV.Validator.CONTAINSSPECIAL,
			"* Password must contain at least one special character (!, @, #, $, %, ^, &, *).\n"),
		new FV.Constraint(FV.Validator.CONTAINSNUMBER,
			"* Password must contain at least one number.\n")
	];

	password2Field.constraints = [new FV.Constraint(FV.Validator.EQUALSFIELD,
			"* Must match your password.\n")];

	emailField.constraints = [new FV.Constraint(FV.Validator.EMAIL, "* Must be a valid email address.\n")];

	validator.fields = [passwordField, password2Field, emailField];

})();