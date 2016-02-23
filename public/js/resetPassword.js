/*jshint esversion: 6 */

var ResetPassword = (function(document) {
	'use strict';

	let _resetPasswordEmailEl = document.getElementById('reset-password-email');
	let _resetPasswordButtonEl = document.getElementById('reset-password-button');

	/**
	 * Represents a ResetPassword Page
	 * @class ResetPassword
	 * 
	 */
	return class ResetPassword {

		/**
	     * ResetPassword constructor.
	     * @constructs ResetPassword
	     * @param {object} fbRef Reference to firebase
	     */
		constructor(fbRef) {

			/**
	         * Firebase reference
	         * @member ResetPassword#fbRef
	         * @type {object}
	         */
			this.fbRef = fbRef;

		}

		/**
		 * Reset Password Email Element
		 * @return {Object} Reset Password Email Element
		 * @memberof ResetPassword
		 * @type {Object}
		 * 
		 */
		static get resetPasswordEmailEl() {

			return _resetPasswordEmailEl;
		}

		/**
		 * Validate Reset Password
		 * @memberof ResetPassword
		 * @function validateResetPassword
		 * 
		 */
		static validateResetPassword() {

			_resetPasswordButtonEl.disabled = _resetPasswordEmailEl.value === '';

		}

		/**
		 * Send a reset password email
		 * @function resetPassword
		 * @memberof ResetPassword
		 * @instance
		 * 
		 */
		resetPassword() {

			this.fbRef.resetPassword({
			  email: _resetPasswordEmailEl.value
			}, function(error) {
			  if (error) {
			    switch (error.code) {
			      case "INVALID_USER":
			        console.log("The specified user account does not exist.");
			        break;
			      default:
			        console.log("Error resetting password:", error);
			    }
			  } else {
			    console.log("Password reset email sent successfully!");
			  }
			});

		}

	};

})(document);