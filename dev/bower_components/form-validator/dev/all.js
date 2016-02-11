'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FV = FV || Object.create(null);

/**
 * Constraint Class
 */
FV.Constraint = function () {

	var UPPERREGEX = /[A-Z]/g,
	    LOWERREGEX = /[a-z]/g,
	    SPECIALREGEX = /[\!\@\#\$\%\^\&\*]/g;

	/**
  * Holds a single constraint, error message, and helpful properties
  */
	return function () {
		function Constraint(c, e, l, regex) {
			_classCallCheck(this, Constraint);

			this.constraint = c || undefined;
			this.errorMessage = e || '';
			this.fieldLength = l || 0;
			this.regex = regex || undefined;
		}

		/**
   * Upper case regex
   * 
   */

		_createClass(Constraint, null, [{
			key: 'UPPERREGEX',
			get: function get() {

				return UPPERREGEX;
			}

			/**
    * Lower case regex
    * 
    */

		}, {
			key: 'LOWERREGEX',
			get: function get() {

				return LOWERREGEX;
			}

			/**
    * Number regex
    * 
    */

		}, {
			key: 'NUMBERREGEX',
			get: function get() {

				return NUMBERREGEX;
			}

			/**
    * Special characters regex
    */

		}, {
			key: 'SPECIALREGEX',
			get: function get() {

				return SPECIALREGEX;
			}
		}]);

		return Constraint;
	}();
}();
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FV = FV || Object.create(null);

/**
 * Field Class
 * 
 */
FV.Field = function () {

	/**
  * Class to hold the element and the validations to be performed on the elemtns
  */
	return function Field(n, e, se, c) {
		_classCallCheck(this, Field);

		this.name = n || '';
		this.element = e || undefined;
		this.secondElement = se || undefined;
		this.constraints = c || [];
	};
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FV = FV || Object.create(null);

/**
 * Validator Class
 * 
 */
FV.Validator = function () {

	var MINLENGTH = 1,
	    MAXLENGTH = 2,
	    CONTAINSUPPER = 3,
	    CONTAINSLOWER = 4,
	    CONTAINSSPECIAL = 5,
	    REGEX = 6,
	    EQUALSFIELD = 7;

	/**
  *Validates your entire form
  *
  */
	return function () {
		function Validator(f) {
			_classCallCheck(this, Validator);

			this.fields = f || [];
		}

		/**
   * Field has a minlength
   * 
   */

		_createClass(Validator, [{
			key: "checkForErrors",

			/**
    * Checks the fields for errors
    * 
    * @return {Array} Errors as [{name: '', error: ''}]
    */
			value: function checkForErrors() {

				var errorMessages = []; //Contains the error message to return

				//Loop through the fields and check for errors
				this.fields.forEach(function (field) {

					field.constraints.forEach(function (constraint) {

						switch (constraint.constraint) {

							case MINLENGTH:

								if (field.element.value.length < constraint.fieldLength) {

									errorMessages.push({
										name: field.name,
										error: constraint.errorMessage
									});
								}

								break;
							case MAXLENGTH:

								if (field.element.value.length > constraint.fieldLength) {

									errorMessages.push({
										name: field.name,
										error: constraint.errorMessage
									});
								}

								break;
							case CONTAINSUPPER:

								if (!field.element.value.match(FV.Constraint.UPPERREGEX)) {

									errorMessages.push({
										name: field.name,
										error: constraint.errorMessage
									});
								}

								break;
							case CONTAINSLOWER:

								if (!field.element.value.match(FV.Constraint.LOWERREGEX)) {

									errorMessages.push({
										name: field.name,
										error: constraint.errorMessage
									});
								}

								break;
							case CONTAINSSPECIAL:

								if (!field.element.value.match(FV.Constraint.SPECIALREGEX)) {

									errorMessages.push({
										name: field.name,
										error: constraint.errorMessage
									});
								}

								break;
							case REGEX:

								if (!field.element.value.match(constraint.regex)) {

									errorMessages.push({
										name: field.name,
										error: constraint.errorMessage
									});
								}

								break;

							case EQUALSFIELD:

								if (field.element.value !== field.secondElement.value) {

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
		}], [{
			key: "MINLENGTH",
			get: function get() {

				return MINLENGTH;
			}

			/**
    * Field has a maxlength
    * 
    */

		}, {
			key: "MAXLENGTH",
			get: function get() {

				return MAXLENGTH;
			}

			/**
    * Field contains an upper
    * 
    */

		}, {
			key: "CONTAINSUPPER",
			get: function get() {

				return CONTAINSUPPER;
			}

			/**
    * Field contains a lower
    * 
    */

		}, {
			key: "CONTAINSLOWER",
			get: function get() {

				return CONTAINSLOWER;
			}

			/**
    * Field contains a special
    * 
    */

		}, {
			key: "CONTAINSSPECIAL",
			get: function get() {

				return CONTAINSSPECIAL;
			}

			/**
    * Field matches regex
    * 
    */

		}, {
			key: "REGEX",
			get: function get() {

				return REGEX;
			}

			/**
    * Field equals another field
    * 
    */

		}, {
			key: "EQUALSFIELD",
			get: function get() {

				return EQUALSFIELD;
			}
		}]);

		return Validator;
	}();
}();