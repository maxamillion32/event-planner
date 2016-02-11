var FV = FV || Object.create(null);

/**
 * Validator Class
 * 
 */
FV.Validator = (function() {

	const 	MINLENGTH = 		1,
			MAXLENGTH = 		2,
			CONTAINSUPPER =		3,
			CONTAINSLOWER =		4,
			CONTAINSSPECIAL =	5,
			REGEX =				6,
			EQUALSFIELD =		7;

	/**
	 *Validates your entire form
	 *
	 */
	return class Validator {

		constructor(f) {

			this.fields = f || [];

		}

		/**
		 * Field has a minlength
		 * 
		 */
		static get MINLENGTH() {

			return MINLENGTH;

		}

		/**
		 * Field has a maxlength
		 * 
		 */
		static get MAXLENGTH() {

			return MAXLENGTH;

		}

		/**
		 * Field contains an upper
		 * 
		 */
		static get CONTAINSUPPER() {

			return CONTAINSUPPER;

		}

		/**
		 * Field contains a lower
		 * 
		 */
		static get CONTAINSLOWER() {

			return CONTAINSLOWER;

		}

		/**
		 * Field contains a special
		 * 
		 */
		static get CONTAINSSPECIAL() {

			return CONTAINSSPECIAL;

		}

		/**
		 * Field matches regex
		 * 
		 */
		static get REGEX() {

			return REGEX;

		}

		/**
		 * Field equals another field
		 * 
		 */
		static get EQUALSFIELD() {

			return EQUALSFIELD;

		}

		/**
		 * Checks the fields for errors
		 * 
		 * @return {Array} Errors as [{name: '', error: ''}]
		 */
		checkForErrors() {

			var errorMessages = [];	//Contains the error message to return

			//Loop through the fields and check for errors
			this.fields.forEach(field => {

				field.constraints.forEach( constraint => {

					switch(constraint.constraint) {

						case MINLENGTH:

							if(field.element.value.length < constraint.fieldLength) {

								errorMessages.push({
									name: field.name,
									error: constraint.errorMessage
								});

							}

							break;
						case MAXLENGTH:

							if(field.element.value.length > constraint.fieldLength) {

								errorMessages.push({
									name: field.name,
									error: constraint.errorMessage
								});

							}

							break;
						case CONTAINSUPPER:

							if(!field.element.value.match(FV.Constraint.UPPERREGEX)) {

								errorMessages.push({
									name: field.name,
									error: constraint.errorMessage
								});

							}

							break;
						case CONTAINSLOWER:

							if(!field.element.value.match(FV.Constraint.LOWERREGEX)) {

								errorMessages.push({
									name: field.name,
									error: constraint.errorMessage
								});

							}

							break;
						case CONTAINSSPECIAL:

							if(!field.element.value.match(FV.Constraint.SPECIALREGEX)) {

								errorMessages.push({
									name: field.name,
									error: constraint.errorMessage
								});

							}

							break;
						case REGEX:

							if(!field.element.value.match(constraint.regex)) {

								errorMessages.push({
									name: field.name,
									error: constraint.errorMessage
								});

							}

							break;

						case EQUALSFIELD:

							if(field.element.value !== field.secondElement.value) {

								errorMessages.push({
									name: field.name,
									error: constraint.errorMessage
								});

							}

					}

				});

			});

			return errorMessages;

		}

	}

})();	