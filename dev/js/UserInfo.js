'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var UserInfo = function () {
	'use strict';

	var _userInfoNameEl = document.getElementById('user-info-name');
	var _userInfoEmployerEl = document.getElementById('user-info-employer');
	var _userInfoTitleEl = document.getElementById('user-info-title');
	var _userInfoBirthdayEl = document.getElementById('user-info-birthday');
	var _submitUserInfoButtonEl = document.getElementById('submit-user-info-button');
	var _userInfoSpinnerEl = document.getElementById('user-info-spinner');
	var _userInfoOldPassword = document.getElementById('user-info-old-password');
	var _userInfoNewPassword = document.getElementById('user-info-new-password');
	var _userInfoNewPasswordRepeated = document.getElementById('user-info-new-password-repeated');
	var _changePasswordButtonEl = document.getElementById('change-password-button');
	var _userNameDivEl = document.getElementById('user-name-div');
	var _userOrganizationDivEl = document.getElementById('user-organization-div');
	var _userJobDivEl = document.getElementById('user-job-div');
	var _userBdayDivEl = document.getElementById('user-bday-div');
	var _userinfoNewPasswordDivEl = document.getElementById('userinfo-new-password');
	var _userinfoPasswordErrorEl = document.getElementById('userinfo-password-error');
	var _userinfoNewPasswordRepeatDivEl = document.getElementById('userinfo-new-password-repeat');
	var _userinfoPasswordRepeatErrorEl = document.getElementById('userinfo-password-repeat-error');
	var _userinfoOldPasswordDivEl = document.getElementById('userinfo-old-password-div');

	_submitUserInfoButtonEl.disabled = true;

	/**
  * Add info to the page
  * @param {object} snapshot The user info
  */
	function _addInfo(snapshot) {

		var info = snapshot.val();

		_userInfoNameEl.value = info.name;

		if (_userInfoNameEl.value) {

			_userNameDivEl.className += ' is-dirty';
		}

		_userInfoEmployerEl.value = info.employer;

		if (_userInfoEmployerEl.value) {

			_userOrganizationDivEl.className += ' is-dirty';
		}

		_userInfoTitleEl.value = info.title;

		if (_userInfoTitleEl.value) {

			_userJobDivEl.className += ' is-dirty';
		}

		_userInfoBirthdayEl.value = info.birthday;

		if (_userInfoBirthdayEl.value) {

			_userBdayDivEl.className += ' is-dirty';
		}

		UserInfo.checkFields();
	}

	/**
  * Represents an UserInfo Planner Page
  * @class UserInfo
  * 
  */
	return function () {

		/**
   * UserInfo constructor.
   * @constructs UserInfo
   */

		function UserInfo(extraRef, ref) {
			_classCallCheck(this, UserInfo);

			/**
    * The events
    * @member UserInfo#extraRef
    * @type {object}
    */
			this.extraRef = extraRef;

			/**
    * Firebase ref
    * @member UserInfo#ref
    * @type {object}
    */
			this.ref = ref;

			/**
    * Users email
    * @member UserInfo#email
    * @type {string}
    */
			this.email = undefined;
		}

		/**
   * Name Element
   * @return {Object} Name Element
   * @memberof UserInfo
   * @type {Object}
   * 
   */


		_createClass(UserInfo, [{
			key: 'changePassword',


			/**
    * Changes the users password
    * @function changePassword
    * @memberof UserInfo
    * @instance
    * 
    */
			value: function changePassword() {

				_userInfoSpinnerEl.hidden = false;
				Displayer.userInfoContainerEl.hidden = true;

				this.ref.changePassword({

					email: this.email,
					oldPassword: _userInfoOldPassword.value,
					newPassword: _userInfoNewPassword.value

				}, function (error) {

					_userInfoSpinnerEl.hidden = true;
					Displayer.userInfoContainerEl.hidden = false;

					if (error) {

						switch (error.code) {

							case "INVALID_PASSWORD":

								Displayer.showSnackbar('Sorry!  The password is incorrect.  :-(');
								break;

							case "INVALID_USER":

								Displayer.showSnackbar('Sorry!  The user account doesn\'t exist.  :-(');
								break;

							default:

								Displayer.showSnackbar('Sorry!  There was an error changing your password.  :-(');

						}
					} else {

						Displayer.showSnackbar('Nice!  You just got yourself a brand new password.  :-)');
					}

					//Reset Vals
					_userInfoOldPassword.value = '';
					_userInfoNewPassword.value = '';
					_userInfoNewPasswordRepeated.value = '';
					UserInfo.checkPasswords();
				});
			}

			/**
    * Updates the user info
    * @function saveInfo
    * @memberof UserInfo
    * @instance
    * 
    */

		}, {
			key: 'saveInfo',
			value: function saveInfo() {

				_userInfoSpinnerEl.hidden = false;
				Displayer.userInfoContainerEl.hidden = true;

				this.extraRef.update({

					name: _userInfoNameEl.value,
					employer: _userInfoEmployerEl.value,
					title: _userInfoTitleEl.value,
					birthday: _userInfoBirthdayEl.value

				}, function (error) {

					_userInfoSpinnerEl.hidden = true;
					Displayer.userInfoContainerEl.hidden = false;

					if (error) {

						Displayer.showSnackbar('Error updating your info, Please forgive me! :-(');
					} else {

						Displayer.showSnackbar('Info upated, Aaaaawwwww Yeah! :-)');
					}
				});
			}

			/**
    * Listens for user info data
    * @function listenForData
    * @memberof UserInfo
    * @instance
    * 
    */

		}, {
			key: 'listenForData',
			value: function listenForData() {

				try {

					this.extraRef.on("value", _addInfo);
				} catch (e) {

					//Sometimes we end up here signing out

				}
			}

			/**
    * Turn off the extra fb listener
    * @function dispose
    * @memberof UserInfo
    * @private
    * @instance
    * 
    */

		}, {
			key: 'dispose',
			value: function dispose() {

				this.extraRef.off("value", _addInfo);

				this.extraRef = undefined;
				this.ref = undefined;
				this.email = undefined;

				_userInfoNameEl.value = '';
				_userInfoEmployerEl.value = '';
				_userInfoTitleEl.value = '';
				_userInfoBirthdayEl.value = '';
				_userInfoOldPassword.value = '';
				_userInfoNewPassword.value = '';
				_userInfoNewPasswordRepeated.value = '';
			}
		}], [{
			key: 'checkFields',


			/** 
   * @function checkFields
   * @memberof UserInfo
   *   
   */
			value: function checkFields() {

				_submitUserInfoButtonEl.disabled = _userInfoNameEl.value === '';
			}

			/**
    * Check Password Validation
    * @function checkPasswords
    * @memberof UserInfo
    * 
    */

		}, {
			key: 'checkPasswords',
			value: function checkPasswords() {

				setTimeout(function () {

					var valid = true;
					var passwordMessage = '';
					var password2Message = '';

					if (_userinfoOldPasswordDivEl.className.indexOf('is-invalid') > -1) {

						valid = false;
					}

					if (!_userInfoNewPassword.value) {

						passwordMessage += '<div>Required</div>';
						valid = false;
					}

					if (_userInfoNewPassword.value === _userInfoOldPassword.value) {

						passwordMessage += '<div>New password cannot match the old password</div>';
						valid = false;

						if (_userinfoNewPasswordDivEl.className.indexOf('is-invalid') === -1) {

							_userinfoNewPasswordDivEl.className += ' is-invalid';
						}
					}

					if (_userInfoNewPassword.value.length < 8) {

						passwordMessage += '<div>Password must be at least 8 characters long</div>';
						valid = false;

						if (_userinfoNewPasswordDivEl.className.indexOf('is-invalid') === -1) {

							_userinfoNewPasswordDivEl.className += ' is-invalid';
						}
					}

					if (!_userInfoNewPassword.value.match(/[A-Z]/g)) {

						passwordMessage += '<div>Must contain at least one upper case character</div>';
						valid = false;

						if (_userinfoNewPasswordDivEl.className.indexOf('is-invalid') === -1) {

							_userinfoNewPasswordDivEl.className += ' is-invalid';
						}
					}

					if (!_userInfoNewPassword.value.match(/[a-z]/g)) {

						passwordMessage += '<div>Must contain at least one lower case character</div>';
						valid = false;

						if (_userinfoNewPasswordDivEl.className.indexOf('is-invalid') === -1) {

							_userinfoNewPasswordDivEl.className += ' is-invalid';
						}
					}

					if (!_userInfoNewPassword.value.match(/\d+/g)) {

						passwordMessage += '<div>Must contain at least one number</div>';
						valid = false;

						if (_userinfoNewPasswordDivEl.className.indexOf('is-invalid') === -1) {

							_userinfoNewPasswordDivEl.className += ' is-invalid';
						}
					}

					if (!_userInfoNewPasswordRepeated.value) {

						valid = false;
						password2Message += '<div>Required</div>';
					}

					if (_userInfoNewPasswordRepeated.value !== _userInfoNewPassword.value) {

						passwordMessage += '<div>Passwords must match</div>';
						password2Message += '<div>Passwords must match</div>';
						valid = false;

						if (_userinfoNewPasswordDivEl.className.indexOf('is-invalid') === -1) {

							_userinfoNewPasswordDivEl.className += ' is-invalid';
						}

						if (_userinfoNewPasswordRepeatDivEl.className.indexOf('is-invalid') === -1) {

							_userinfoNewPasswordRepeatDivEl.className += ' is-invalid';
						}
					}

					_userinfoPasswordErrorEl.innerHTML = passwordMessage;
					_userinfoPasswordRepeatErrorEl.innerHTML = password2Message;

					_changePasswordButtonEl.disabled = !valid;
				});
			}
		}, {
			key: 'userInfoNameEl',
			get: function get() {

				return _userInfoNameEl;
			}
		}]);

		return UserInfo;
	}();
}();