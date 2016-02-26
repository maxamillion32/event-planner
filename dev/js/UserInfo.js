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

	_submitUserInfoButtonEl.disabled = true;

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

		function UserInfo(extraRef) {
			_classCallCheck(this, UserInfo);

			/**
          * The events
          * @member UserInfo#extraRef
          * @type {array}
          */
			this.extraRef = extraRef;
		}

		/**
   * Name Element
   * @return {Object} Name Element
   * @memberof UserInfo
   * @type {Object}
   * 
   */


		_createClass(UserInfo, [{
			key: 'saveInfo',


			/**
    * Updates the user info
    * @function saveInfo
    * @memberof UserInfo
    * @instance
    * 
    */
			value: function saveInfo() {

				this.extraRef.update({

					name: _userInfoNameEl.value,
					employer: _userInfoEmployerEl.value,
					title: _userInfoTitleEl.value,
					birthday: _submitUserInfoButtonEl.value

				}, function (error) {

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

					this.extraRef.on("value", function (snapshot) {

						var info = snapshot.val();

						_userInfoNameEl.value = info.name;
						_userInfoEmployerEl.value = info.employer;
						_userInfoTitleEl.value = info.title;
						_userInfoBirthdayEl.value = info.birthday;
					}.bind(this), function (err) {

						console.log('Error: ', err);
					});
				} catch (e) {

					//Sometimes we end up here signing out

				}
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
		}, {
			key: 'userInfoNameEl',
			get: function get() {

				return _userInfoNameEl;
			}

			/**
    * Employer Element
    * @return {Object} Employer Element
    * @memberof UserInfo
    * @type {Object}
    * 
    */

		}, {
			key: 'userInfoEmployerEl',
			get: function get() {

				return _userInfoEmployerEl;
			}

			/**
    * Title Element
    * @return {Object} Title Element
    * @memberof UserInfo
    * @type {Object}
    * 
    */

		}, {
			key: 'userInfoTitleEl',
			get: function get() {

				return _userInfoTitleEl;
			}

			/**
    * Birthday Element
    * @return {Object} Birthday Element
    * @memberof UserInfo
    * @type {Object}
    * 
    */

		}, {
			key: 'userInfoBirthdayEl',
			get: function get() {

				return _userInfoBirthdayEl;
			}

			/**
    * User Info Button Element
    * @return {Object} User Info Button Element
    * @memberof UserInfo
    * @type {Object}
    * 
    */

		}, {
			key: 'submitUserInfoButtonEl',
			get: function get() {

				return _submitUserInfoButtonEl;
			}
		}]);

		return UserInfo;
	}();
}();