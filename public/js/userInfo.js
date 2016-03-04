/*jshint esversion: 6 */

var UserInfo = (function() {
	'use strict';

	let _userInfoNameEl = 					document.getElementById('user-info-name');
	let _userInfoEmployerEl = 				document.getElementById('user-info-employer');
	let _userInfoTitleEl = 					document.getElementById('user-info-title');
	let _userInfoBirthdayEl = 				document.getElementById('user-info-birthday');
	let _submitUserInfoButtonEl = 			document.getElementById('submit-user-info-button');
	let _userInfoSpinnerEl =				document.getElementById('user-info-spinner');
	let _userInfoOldPassword =				document.getElementById('user-info-old-password');
	let _userInfoNewPassword =				document.getElementById('user-info-new-password');
	let _userInfoNewPasswordRepeated =		document.getElementById('user-info-new-password-repeated');
	let _changePasswordButtonEl =			document.getElementById('change-password-button');
	let _userNameDivEl =					document.getElementById('user-name-div');
	let _userOrganizationDivEl =			document.getElementById('user-organization-div');
	let _userJobDivEl =						document.getElementById('user-job-div');
	let _userBdayDivEl =					document.getElementById('user-bday-div');
	let _userinfoNewPasswordDivEl =			document.getElementById('userinfo-new-password');
	let _userinfoPasswordErrorEl =			document.getElementById('userinfo-password-error');
	let _userinfoNewPasswordRepeatDivEl =	document.getElementById('userinfo-new-password-repeat');
	let _userinfoPasswordRepeatErrorEl =	document.getElementById('userinfo-password-repeat-error');
	let _userinfoOldPasswordDivEl =			document.getElementById('userinfo-old-password-div');

	_submitUserInfoButtonEl.disabled = true;

	/**
	 * Add info to the page
	 * @param {object} snapshot The user info
	 */
	function _addInfo (snapshot) {

		let info = snapshot.val();

		_userInfoNameEl.value = info.name;

		if(_userInfoNameEl.value) {

			_userNameDivEl.className += ' is-dirty';

		}

		_userInfoEmployerEl.value =	info.employer;

		if(_userInfoEmployerEl.value) {

			_userOrganizationDivEl.className += ' is-dirty';

		}

		_userInfoTitleEl.value = info.title;

		if(_userInfoTitleEl.value) {

			_userJobDivEl.className += ' is-dirty';

		}

		_userInfoBirthdayEl.value =	info.birthday;

		if(_userInfoBirthdayEl.value) {

			_userBdayDivEl.className += ' is-dirty';

		}

		UserInfo.checkFields();

	}	

	

	/**
	 * Represents an UserInfo Planner Page
	 * @class UserInfo
	 * 
	 */
	return class UserInfo {

		/**
	     * UserInfo constructor.
	     * @constructs UserInfo
	     */
		constructor(extraRef, ref) {

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
		static get userInfoNameEl() {

			return _userInfoNameEl;

		}	

		/** 
		*   @function checkFields
		*   @memberof UserInfo
		*   
		*/
		static checkFields() {

			_submitUserInfoButtonEl.disabled = _userInfoNameEl.value === '';

		}

		/**
		 * Check Password Validation
		 * @function checkPasswords
		 * @memberof UserInfo
		 * 
		 */
		static checkPasswords() {

			setTimeout(function() {

				let valid = true;
				let passwordMessage = '';
				let password2Message = '';

				if(_userinfoOldPasswordDivEl.className.indexOf('is-invalid') > -1) {

					valid = false;

				}

				if(!_userInfoNewPassword.value) {

					passwordMessage += '<div>Required</div>';
					valid = false;

				}

				if(_userInfoNewPassword.value === _userInfoOldPassword.value) {

					passwordMessage += '<div>New password cannot match the old password</div>';
					valid = false;

					if(_userinfoNewPasswordDivEl.className.indexOf('is-invalid') === -1 ) {

						_userinfoNewPasswordDivEl.className += ' is-invalid';

					}

				}

				if(_userInfoNewPassword.value.length < 8) {

					passwordMessage += '<div>Password must be at least 8 characters long</div>';
					valid = false;

					if(_userinfoNewPasswordDivEl.className.indexOf('is-invalid') === -1 ) {

						_userinfoNewPasswordDivEl.className += ' is-invalid';

					}

				}

				if(!_userInfoNewPassword.value.match(/[A-Z]/g)) {

					passwordMessage += '<div>Must contain at least one upper case character</div>';
					valid = false;

					if(_userinfoNewPasswordDivEl.className.indexOf('is-invalid') === -1 ) {

						_userinfoNewPasswordDivEl.className += ' is-invalid';

					}

				}

				if(!_userInfoNewPassword.value.match(/[a-z]/g)) {

					passwordMessage += '<div>Must contain at least one lower case character</div>';
					valid = false;

					if(_userinfoNewPasswordDivEl.className.indexOf('is-invalid') === -1 ) {

						_userinfoNewPasswordDivEl.className += ' is-invalid';

					}

				}

				if(!_userInfoNewPassword.value.match(/\d+/g)) {

					passwordMessage += '<div>Must contain at least one number</div>';
					valid = false;

					if(_userinfoNewPasswordDivEl.className.indexOf('is-invalid') === -1 ) {

						_userinfoNewPasswordDivEl.className += ' is-invalid';

					}

				}

				if(!_userInfoNewPasswordRepeated.value) {

					valid = false;
					password2Message += '<div>Required</div>';

				}

				if(_userInfoNewPasswordRepeated.value !== _userInfoNewPassword.value) {

					passwordMessage += '<div>Passwords must match</div>';
					password2Message += '<div>Passwords must match</div>';
					valid = false;

					if(_userinfoNewPasswordDivEl.className.indexOf('is-invalid') === -1 ) {

						_userinfoNewPasswordDivEl.className += ' is-invalid';

					}

					if(_userinfoNewPasswordRepeatDivEl.className.indexOf('is-invalid') === -1) {

						_userinfoNewPasswordRepeatDivEl.className += ' is-invalid';

					}

				}

				_userinfoPasswordErrorEl.innerHTML = passwordMessage;
				_userinfoPasswordRepeatErrorEl.innerHTML = password2Message;

				_changePasswordButtonEl.disabled = !valid;

			});

		}

		/**
		 * Changes the users password
		 * @function changePassword
		 * @memberof UserInfo
		 * @instance
		 * 
		 */
		changePassword() {

			_userInfoSpinnerEl.hidden = false;
			Displayer.userInfoContainerEl.hidden = true;

			this.ref.changePassword({

			  email: this.email,
			  oldPassword: _userInfoOldPassword.value,
			  newPassword: _userInfoNewPassword.value

			}, function(error) {

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
				_userInfoOldPassword.value = 			'';
			  	_userInfoNewPassword.value = 			'';
			  	_userInfoNewPasswordRepeated.value = 	'';
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
		saveInfo() {

			_userInfoSpinnerEl.hidden = false;
			Displayer.userInfoContainerEl.hidden = true;

			this.extraRef.update({

				name: 		_userInfoNameEl.value,
				employer: 	_userInfoEmployerEl.value,
				title: 		_userInfoTitleEl.value,
				birthday: 	_userInfoBirthdayEl.value

			}, function(error) {

				_userInfoSpinnerEl.hidden = true;
				Displayer.userInfoContainerEl.hidden = false;

				if(error) {

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
		listenForData() {

			try {

				this.extraRef.on("value", _addInfo);

			} catch(e) {

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
		dispose() {

			this.extraRef.off("value", _addInfo);

			this.extraRef =					undefined;
			this.ref =						undefined;
			this.email =					undefined;

			_userInfoNameEl.value = 		'';
			_userInfoEmployerEl.value = 	'';
			_userInfoTitleEl.value = 		'';
			_userInfoBirthdayEl.value = 	'';
			_userInfoOldPassword.value = 			'';
			_userInfoNewPassword.value = 			'';
			_userInfoNewPasswordRepeated.value = 	'';

		}

	};

})();