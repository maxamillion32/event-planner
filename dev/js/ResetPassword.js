'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var ResetPassword = function (document) {
	'use strict';

	var _resetPasswordEmailEl = document.getElementById('reset-password-email');
	var _resetPasswordButtonEl = document.getElementById('reset-password-button');
	var _resetPasswordSpinnerEl = document.getElementById('reset-password-spinner');

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

				_resetPasswordSpinnerEl.hidden = false;
				Displayer.resetPasswordContainerEl.hidden = true;

				this.fbRef.resetPassword({
					email: _resetPasswordEmailEl.value
				}, function (error) {

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

		}, {
			key: 'dispose',
			value: function dispose() {

				_resetPasswordEmailEl.value = '';
				this.fbRef = undefined;
			}
		}], [{
			key: 'validateResetPassword',


			/**
    * Validate Reset Password
    * @memberof ResetPassword
    * @function validateResetPassword
    * 
    */
			value: function validateResetPassword() {

				_resetPasswordButtonEl.disabled = _resetPasswordEmailEl.value === '';
			}
		}, {
			key: 'resetPasswordEmailEl',
			get: function get() {

				return _resetPasswordEmailEl;
			}

			/**
    * Reset Password Spinner Element
    * @return {Object} Reset Password Spinner Element
    * @memberof ResetPassword
    * @type {Object}
    * 
    */

		}, {
			key: 'resetPasswordSpinnerEl',
			get: function get() {

				return _resetPasswordSpinnerEl;
			}
		}]);

		return ResetPassword;
	}();
}(document);