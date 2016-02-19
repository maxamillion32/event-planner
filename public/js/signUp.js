(function() {
	'use strict';

	var APP = window.APP || {};

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

			APP.valCheckEmailEl.className = 'val-check-good';
			APP.valCheckEmailEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Must use a valid email address';

		} else {

			APP.valCheckEmailEl.className = 'val-check-bad';
			APP.valCheckEmailEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Must use a valid email address';

		}

		if(errorTypes.indexOf(FV.Validator.MINLENGTH) === -1) {

			APP.valCheckLengthEl.className = 'val-check-good';
			APP.valCheckLengthEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must be at least 8 characters long';

		} else {

			APP.valCheckLengthEl.className = 'val-check-bad';
			APP.valCheckLengthEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must be at least 8 characters long';

		}

		if(errorTypes.indexOf(FV.Validator.CONTAINSUPPER) === -1) {

			APP.valCheckUpperEl.className = 'val-check-good';
			APP.valCheckUpperEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one upper case character';

		} else {

			APP.valCheckUpperEl.className = 'val-check-bad';
			APP.valCheckUpperEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one upper case character';

		}

		if(errorTypes.indexOf(FV.Validator.CONTAINSLOWER) === -1) {

			APP.valCheckLowerEl.className = 'val-check-good';
			APP.valCheckLowerEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one lower case character';

		} else {

			APP.valCheckLowerEl.className = 'val-check-bad';
			APP.valCheckLowerEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one lower case character';

		}

		if(errorTypes.indexOf(FV.Validator.CONTAINSSPECIAL) === -1) {

			APP.valCheckSpecialEl.className = 'val-check-good';
			APP.valCheckSpecialEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one special character (!, @, #, $, %, ^, &, *)';

		} else {

			APP.valCheckSpecialEl.className = 'val-check-bad';
			APP.valCheckSpecialEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one special character (!, @, #, $, %, ^, &, *)';

		}

		if(errorTypes.indexOf(FV.Validator.EQUALSFIELD) === -1 && APP.signupPasswordEl.value !== '' && APP.signupPassword2El.value !== '') {

			APP.valCheckMatchEl.className = 'val-check-good';
			APP.valCheckMatchEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Passwords must match';

		} else {

			APP.valCheckMatchEl.className = 'val-check-bad';
			APP.valCheckMatchEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Passwords must match';

		}

		if(errorTypes.indexOf(FV.Validator.CONTAINSNUMBER) === -1) {

			APP.valCheckNumberEl.className = 'val-check-good';
			APP.valCheckNumberEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one number';

		} else {

			APP.valCheckNumberEl.className = 'val-check-bad';
			APP.valCheckNumberEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one number';

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

		let errors = 			APP.validator.checkForErrors();
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
	APP.submitPasswordButton.onclick = APP.validateSignUp;

	/**
	 * Show/hide additional info
	 * 
	 */
	APP.showAdditionalInfo = function() {

		APP.signupAdditionalInfoEl.hidden = !APP.signupSwitchEl.checked;

	};

	APP.passwordField.constraints = [
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

	APP.password2Field.constraints = [new FV.Constraint(FV.Validator.EQUALSFIELD,
			"* Must match your password.\n")];

	APP.emailField.constraints = [new FV.Constraint(FV.Validator.EMAIL, "* Must be a valid email address.\n")];

	APP.validator.fields = [APP.passwordField, APP.password2Field, APP.emailField];

})();