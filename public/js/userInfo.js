/*jshint esversion: 6 */

var UserInfo = (function() {
	'use strict';

	let _userInfoNameEl = document.getElementById('user-info-name');
	let _userInfoEmployerEl = document.getElementById('user-info-employer');
	let _userInfoTitleEl = document.getElementById('user-info-title');
	let _userInfoBirthdayEl = document.getElementById('user-info-birthday');
	let _submitUserInfoButtonEl = document.getElementById('submit-user-info-button');

	_submitUserInfoButtonEl.disabled = true;

	/**
	 * Add info to the page
	 * @param {object} snapshot The user info
	 */
	function _addInfo (snapshot) {

		let info = snapshot.val();

		_userInfoNameEl.value =		info.name;
		_userInfoEmployerEl.value =	info.employer;
		_userInfoTitleEl.value =		info.title;
		_userInfoBirthdayEl.value =	info.birthday;

	}

	/**
	 * Handle data error
	 * @param  {object} err fb error
	 * 
	 */
	function _handleError (err) {

		console.log('Error: ', err);

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
		constructor(extraRef) {

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
		static get userInfoNameEl() {

			return _userInfoNameEl;

		}

		/**
		 * Employer Element
		 * @return {Object} Employer Element
		 * @memberof UserInfo
		 * @type {Object}
		 * 
		 */
		static get userInfoEmployerEl() {

			return _userInfoEmployerEl;

		}

		/**
		 * Title Element
		 * @return {Object} Title Element
		 * @memberof UserInfo
		 * @type {Object}
		 * 
		 */
		static get userInfoTitleEl() {

			return _userInfoTitleEl;

		}

		/**
		 * Birthday Element
		 * @return {Object} Birthday Element
		 * @memberof UserInfo
		 * @type {Object}
		 * 
		 */
		static get userInfoBirthdayEl() {

			return _userInfoBirthdayEl;
			
		}

		/**
		 * User Info Button Element
		 * @return {Object} User Info Button Element
		 * @memberof UserInfo
		 * @type {Object}
		 * 
		 */
		static get submitUserInfoButtonEl() {

			return _submitUserInfoButtonEl;
			
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
		 * Updates the user info
		 * @function saveInfo
		 * @memberof UserInfo
		 * @instance
		 * 
		 */
		saveInfo() {

			this.extraRef.update({

				name: 		_userInfoNameEl.value,
				employer: 	_userInfoEmployerEl.value,
				title: 		_userInfoTitleEl.value,
				birthday: 	_submitUserInfoButtonEl.value

			}, function(error) {

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

				this.extraRef.on("value", _addInfo, _handleError);

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

			this.extraRef.off("value", _addInfo, _handleError);

			this.extraRef =					undefined;

			_userInfoNameEl.value = 		'';
			_userInfoEmployerEl.value = 	'';
			_userInfoTitleEl.value = 		'';
			_userInfoBirthdayEl.value = 	'';

		}

	};

})();