'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var ResetPassword = function (document) {
	'use strict';

	var _resetPasswordEmail = document.getElementById('reset-password-email');

	/**
  * Represents a ResetPassword Page
  * @class ResetPassword
  * 
  */
	return function () {

		/**
      * ResetPassword constructor.
      * @constructs ResetPassword
      * @param {object} fbRef Reference to firebase
      */

		function ResetPassword(fbRef) {
			_classCallCheck(this, ResetPassword);

			this.fbRef = fbRef;
		}

		/**
   * Reset Password Email Element
   * @return {Object} Reset Password Email Element
   * @memberof ResetPassword
   * @type {Object}
   * 
   */


		_createClass(ResetPassword, [{
			key: 'resetPassword',


			/**
    * Send a reset password email
    * @function resetPassword
    * @memberof ResetPassword
    * @instance
    * 
    */
			value: function resetPassword() {

				this.fbRef.resetPassword({
					email: _resetPasswordEmail.value
				}, function (error) {
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
		}], [{
			key: 'resetPasswordEmail',
			get: function get() {

				return _resetPasswordEmail;
			}
		}]);

		return ResetPassword;
	}();
}(document);