var FV = FV || Object.create(null);

/**
 * Constraint Class
 */ 
FV.Constraint = (function() {

	const 	UPPERREGEX = 	/[A-Z]/g,
			LOWERREGEX = 	/[a-z]/g,
			SPECIALREGEX =	/[\!\@\#\$\%\^\&\*]/g;

	/**
	 * Holds a single constraint, error message, and helpful properties
	 */
	return class Constraint {

		constructor(c, e, l, regex) {

			this.constraint =		c || undefined;
			this.errorMessage =		e || '';
			this.fieldLength = 		l || 0;
			this.regex =			regex || undefined;

		}

		/**
		 * Upper case regex
		 * 
		 */
		static get UPPERREGEX() {

			return UPPERREGEX;

		}

		/**
		 * Lower case regex
		 * 
		 */
		static get LOWERREGEX() {

			return LOWERREGEX;

		}

		/**
		 * Number regex
		 * 
		 */
		static get NUMBERREGEX() {

			return NUMBERREGEX;

		}

		/**
		 * Special characters regex
		 */
		static get SPECIALREGEX() {

			return SPECIALREGEX;

		}

	}

})();