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
	    SPECIALREGEX = /[\!\@\#\$\%\^\&\*]/g,
	    EMAILREGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
	    NUMBERREGEX = /\d+/g;

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

			/**
    * Number regex
    * 
    */
			get: function get() {

				return NUMBERREGEX;
			}
		}, {
			key: 'SPECIALREGEX',

			/**
    * Special characters regex
    * 
    */
			get: function get() {

				return SPECIALREGEX;
			}

			/**
    * Email Regex
    * 
    */

		}, {
			key: 'EMAILREGEX',
			get: function get() {

				return EMAILREGEX;
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
	    EQUALSFIELD = 7,
	    EMAIL = 8,
	    CONTAINSNUMBER = 9;

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
										error: constraint.errorMessage,
										type: MINLENGTH
									});
								}

								break;
							case MAXLENGTH:

								if (field.element.value.length > constraint.fieldLength) {

									errorMessages.push({
										name: field.name,
										error: constraint.errorMessage,
										type: MAXLENGTH
									});
								}

								break;
							case CONTAINSUPPER:

								if (!field.element.value.match(FV.Constraint.UPPERREGEX)) {

									errorMessages.push({
										name: field.name,
										error: constraint.errorMessage,
										type: CONTAINSUPPER
									});
								}

								break;
							case CONTAINSLOWER:

								if (!field.element.value.match(FV.Constraint.LOWERREGEX)) {

									errorMessages.push({
										name: field.name,
										error: constraint.errorMessage,
										type: CONTAINSLOWER
									});
								}

								break;
							case CONTAINSSPECIAL:

								if (!field.element.value.match(FV.Constraint.SPECIALREGEX)) {

									errorMessages.push({
										name: field.name,
										error: constraint.errorMessage,
										type: CONTAINSSPECIAL
									});
								}

								break;
							case REGEX:

								if (!field.element.value.match(constraint.regex)) {

									errorMessages.push({
										name: field.name,
										error: constraint.errorMessage,
										type: REGEX
									});
								}

								break;

							case EQUALSFIELD:

								if (field.element.value !== field.secondElement.value) {

									errorMessages.push({
										name: field.name,
										error: constraint.errorMessage,
										type: EQUALSFIELD
									});
								}

								break;

							case EMAIL:

								if (!field.element.value.match(FV.Constraint.EMAILREGEX)) {

									errorMessages.push({
										name: field.name,
										error: constraint.errorMessage,
										type: EMAIL
									});
								}

								break;

							case CONTAINSNUMBER:

								if (!field.element.value.match(FV.Constraint.NUMBERREGEX)) {

									errorMessages.push({
										name: field.name,
										error: constraint.errorMessage,
										type: CONTAINSNUMBER
									});
								}

								break;

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

			/**
    * Field is a valid email address
    * 
    */

		}, {
			key: "EMAIL",
			get: function get() {

				return EMAIL;
			}

			/**
    * Field contains a number
    * 
    */

		}, {
			key: "CONTAINSNUMBER",
			get: function get() {

				return CONTAINSNUMBER;
			}
		}]);

		return Validator;
	}();
}();