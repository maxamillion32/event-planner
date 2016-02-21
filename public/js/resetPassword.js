/*jshint esversion: 6 */

(function(document) {
	'use strict';

	let _resetPasswordEmail = document.getElementById('reset-password-email');

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

			this.fbRef = fbRef;

		}

		/**
		 * Reset Password Email Element
		 * @return {Object} Reset Password Email Element
		 * @memberof ResetPassword
		 * @type {Object}
		 * 
		 */
		static get resetPasswordEmail() {

			return _resetPasswordEmail;
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
			  email: _resetPasswordEmail.value
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