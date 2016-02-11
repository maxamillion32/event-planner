var FV = FV || Object.create(null);

/**
 * Field Class
 * 
 */
FV.Field = (function() {

	/**
	 * Class to hold the element and the validations to be performed on the elemtns
	 */
	return class Field {

		constructor(n, e, se, c) {

			this.name =				n || '';
			this.element =			e || undefined;
			this.secondElement =	se || undefined;
			this.constraints = 		c || [];

		}	

	}

})();