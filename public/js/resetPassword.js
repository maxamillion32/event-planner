/*jshint esversion: 6 */

var ResetPassword = (function(document) {
	'use strict';

	let _resetPasswordEmailEl = 	document.getElementById('reset-password-email');
	let _resetPasswordButtonEl = 	document.getElementById('reset-password-button');
	let _resetPasswordSpinnerEl =	document.getElementById('reset-password-spinner');

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

			_resetPasswordSpinnerEl.hidden = false;
			Displayer.resetPasswordContainerEl.hidden = true;

			this.fbRef.resetPassword({
			  email: _resetPasswordEmailEl.value
			}, function(error) {

				_resetPasswordSpinnerEl.hidden = true;
				Displayer.resetPasswordContainerEl.hidden = false;

				if (error) {

					switch (error.code) {
					  case "INVALID_USER":
					  	Displayer.showSnackbar('Hmmmm never seen that email before');
					    break;
					  default:
					    Displayer.showSnackbar('Mayday Mayday!  Uh... this didn\'t work :-(');
				    
				}
				} else {

					Displayer.showSnackbar('Yo DAWG, I heard you like passwords!  Also check your email :-D');

				}

			});

		}

		/**
		 * Reset to default
		 * @function dispose
		 * @memberof ResetPassword
		 * @instance
		 * 
		 */
		dispose() {

			_resetPasswordEmailEl.value = '';
			this.fbRef = undefined;

		}

	};

})(document);