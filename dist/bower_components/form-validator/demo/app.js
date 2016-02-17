//Darth Validator
(function(document) {

	window.APP = 		Object.create(null);

	//Dom elements
	var passwordEl = 		document.getElementById('password-input');
	var regexEl =			document.getElementById('regex-input');
	var repeatPasswordEl =	document.getElementById('repeat-password');
	var emailInputEl =		document.getElementById('email-input');
	var submitButton = 		document.getElementById('submit-button');

	//Validation fields
	var validator = 			new FV.Validator();
	var passwordField = 		new FV.Field("Password1", passwordEl);
	var regexField =			new FV.Field("RegexField", regexEl);
	var repeatPasswordField =	new FV.Field("RepeatPassword", repeatPasswordEl, passwordEl);
	var emailInputField =		new FV.Field("EmailField", emailInputEl);

	passwordField.constraints = [
		new FV.Constraint(FV.Validator.MINLENGTH, 
			"* Password must be at least 3 characters long.\n",
			3),
		new FV.Constraint(FV.Validator.MAXLENGTH,
			"* Password must be no more than 8 characters long.\n",
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

	regexField.constraints = [new FV.Constraint(FV.Validator.REGEX,
			"* Must contain the word 'Test'.\n", undefined, /Test/)];

	repeatPasswordField.constraints = [new FV.Constraint(FV.Validator.EQUALSFIELD,
			"* Must match your password.\n")];

	emailInputField.constraints = [new FV.Constraint(FV.Validator.EMAIL,
			"* Must be a valid email address.\n")];

	validator.fields = [passwordField, regexField, repeatPasswordField, emailInputField];

	/**
	 * Check the form
	 * 
	 */
	submitButton.onclick = function() {

		var errors = 			validator.checkForErrors();
		var passwordErrors = 	"";
		var regexErrors = 		"";
		var repeatErrors =		"";
		var emailErrors =		"";

		errors.forEach(function(error) {

			switch(error.name) {

				case "Password1":

					passwordErrors += error.error;
					break;

				case "RegexField":

					regexErrors += error.error;
					break;

				case "RepeatPassword":

					repeatErrors = error.error;
					break;

				case "EmailField":
					emailErrors = error.error;
					break;

			}

		});

		if(passwordErrors !== '') {

			passwordErrors = "Please correct the following errors:\n" + passwordErrors;

		}

		if(regexErrors !== '') {

			regexErrors = "Please correct the following errors:\n" + regexErrors;

		}

		if(repeatErrors !== '') {

			repeatErrors = "Please correct the following errors:\n" + repeatErrors;

		}

		if(emailErrors !== '') {

			emailErrors = "Please correct the following errors:\n" + emailErrors;

		}

		//These will only display one at a time
		passwordEl.setCustomValidity(passwordErrors);
		repeatPasswordEl.setCustomValidity(repeatErrors);
		regexEl.setCustomValidity(regexErrors);
		emailInputEl.setCustomValidity(emailErrors);

	};

	/**
	 * Form submitted succesfully
	 * 
	 */
	APP.submitted = function() {

		alert('Success!');

	};

})(document);