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
	var _userValCheckRequiredEl = document.getElementById('user-val-check-required');
	var _userValCheckLengthEl = document.getElementById('user-val-check-length');
	var _userValCheckUpperEl = document.getElementById('user-val-check-upper');
	var _userValCheckLowerEl = document.getElementById('user-val-check-lower');
	var _userValCheckNumberEl = document.getElementById('user-val-check-number');
	var _userValCheckMatchEl = document.getElementById('user-val-check-match');
	var _userNameDivEl = document.getElementById('user-name-div');
	var _userOrganizationDivEl = document.getElementById('user-organization-div');
	var _userJobDivEl = document.getElementById('user-job-div');
	var _userBdayDivEl = document.getElementById('user-bday-div');

	var _validator = new FV.Validator();
	var _passwordField = new FV.Field("Password1", _userInfoNewPassword);
	var _password2Field = new FV.Field("Password2", _userInfoNewPasswordRepeated, _userInfoNewPassword);

	_passwordField.constraints = [new FV.Constraint(FV.Validator.MINLENGTH, "* Password must be at least 8 characters long.\n", 8), new FV.Constraint(FV.Validator.CONTAINSUPPER, "* Password must contain at least one upper case letter.\n"), new FV.Constraint(FV.Validator.CONTAINSLOWER, "* Password must contain at least one lower case letter.\n"), new FV.Constraint(FV.Validator.CONTAINSNUMBER, "* Password must contain at least one number.\n")];

	_password2Field.constraints = [new FV.Constraint(FV.Validator.EQUALSFIELD, "* Must match your password.\n")];

	_validator.fields = [_passwordField, _password2Field];

	_submitUserInfoButtonEl.disabled = true;

	/**
  * Private function for showing good/bad auth messages
  * @param  {array} errorTypes Holds the errors present
  * 
  */
	function _checkValFields(errorTypes) {

		if (errorTypes.indexOf(FV.Validator.MINLENGTH) === -1) {

			_userValCheckLengthEl.className = 'val-check-good';
			_userValCheckLengthEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i>&nbsp;&nbsp;Password must be at least 8 characters long';
		} else {

			_userValCheckLengthEl.className = 'val-check-bad';
			_userValCheckLengthEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i>&nbsp;&nbsp;Password must be at least 8 characters long';
		}

		if (errorTypes.indexOf(FV.Validator.CONTAINSUPPER) === -1) {

			_userValCheckUpperEl.className = 'val-check-good';
			_userValCheckUpperEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i>&nbsp;&nbsp;Password must contain at least one upper case character';
		} else {

			_userValCheckUpperEl.className = 'val-check-bad';
			_userValCheckUpperEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i>&nbsp;&nbsp;Password must contain at least one upper case character';
		}

		if (errorTypes.indexOf(FV.Validator.CONTAINSLOWER) === -1) {

			_userValCheckLowerEl.className = 'val-check-good';
			_userValCheckLowerEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i>&nbsp;&nbsp;Password must contain at least one lower case character';
		} else {

			_userValCheckLowerEl.className = 'val-check-bad';
			_userValCheckLowerEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i>&nbsp;&nbsp;Password must contain at least one lower case character';
		}

		if (errorTypes.indexOf(FV.Validator.EQUALSFIELD) === -1 && _userInfoNewPassword.value !== '' && _userInfoNewPasswordRepeated.value !== '') {

			_userValCheckMatchEl.className = 'val-check-good';
			_userValCheckMatchEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i>&nbsp;&nbsp;Passwords must match';
		} else {

			_userValCheckMatchEl.className = 'val-check-bad';
			_userValCheckMatchEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i>&nbsp;&nbsp;Passwords must match';
		}

		if (errorTypes.indexOf(FV.Validator.CONTAINSNUMBER) === -1) {

			_userValCheckNumberEl.className = 'val-check-good';
			_userValCheckNumberEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i>&nbsp;&nbsp;Password must contain at least one number';
		} else {

			_userValCheckNumberEl.className = 'val-check-bad';
			_userValCheckNumberEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i>&nbsp;&nbsp;Password must contain at least one number';
		}

		if (_userInfoOldPassword === '' || _userInfoNewPassword.value === '' || _userInfoNewPasswordRepeated.value === '') {

			_userValCheckRequiredEl.className = 'val-check-bad';
			_userValCheckRequiredEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i>&nbsp;&nbsp;All required fields must be filled out';
		} else {

			_userValCheckRequiredEl.className = 'val-check-good';
			_userValCheckRequiredEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i>&nbsp;&nbsp;All required fields must be filled out';
		}
	}

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
				_userInfoOldPassword = '';
				_userInfoNewPassword = '';
				_userInfoNewPasswordRepeated = '';
			}
		}], [{
			key: 'checkFields',


			/** 
   *   @function checkFields
   *   @memberof UserInfo
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

				var errors = _validator.checkForErrors();
				var errorTypes = [];
				var passwordErrors = "";
				var password2Errors = "";

				errors.forEach(function (error) {

					switch (error.name) {

						case "Password1":

							passwordErrors += error.error;
							errorTypes.push(error.type);
							break;

						case "Password2":

							password2Errors += error.error;
							errorTypes.push(error.type);
							break;

					}
				});

				if (passwordErrors !== '') {

					passwordErrors = "Please correct the following errors:\n" + passwordErrors;
				}

				if (password2Errors !== '') {

					password2Errors = "Please correct the following errors:\n" + password2Errors;
				}

				_userInfoNewPassword.setCustomValidity(passwordErrors);
				_userInfoNewPasswordRepeated.setCustomValidity(password2Errors);

				_changePasswordButtonEl.disabled = errorTypes.length > 0;
				_checkValFields(errorTypes);
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