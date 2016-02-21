"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */
(function (document) {
	'use strict';

	/**
  * App
  * @class App
  * @description Starting point for the event planner application
  * 
  */

	var App = function () {

		/**
      * App constructor.
      * @constructs App
      */

		function App() {
			_classCallCheck(this, App);

			// Register the callback to be fired every time auth state changes
			var fbRef = new Firebase("https://swanky-event-planner.firebaseIO.com");

			this.signInOut = new SignInOut(fbRef);
			this.eventPlanner = new EventPlanner();
			this.resetPassword = new ResetPassword(fbRef);
			this.showEvents = new ShowEvents();
			this.signUp = new SignUp(fbRef);

			// Fired after the user signs up
			document.addEventListener("signed-up", function () {

				this.signInOut.signIn(this.signUp.signupEmailEl.value, this.signUp.signupPasswordEl.value);
			});

			// Fired after user signs in
			document.addEventListener("signed-in", function () {

				this.eventPlanner.eventRef = this.signInOut.eventRef;
				this.showEvents.eventRef = this.signInOut.eventRef;
			});

			/**
    * Sign out on exit
    * 
    */
			window.onbeforeunload = function () {

				this.signInOut.signOut();
				document.removeEventListener('signed-out');
			};
		}

		/**
   * Remove the registered events
   *  @function removeEvents
   * 	@memberof App
   *  @instance
   *
   */


		_createClass(App, [{
			key: "removeEvents",
			value: function removeEvents() {

				document.removeEventListener('signed-up');
				document.removeEventListener('signed-in');
				window.onbeforeunload = undefined;
			}
		}]);

		return App;
	}();

	// Fired after user signs out


	document.addEventListener("signed-out", function () {

		app.removeEvents();
		app = new App();
	});

	var app = new App();
})(document);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */
var APP = window.APP || Object.create(null);

var Displayer = function (document) {
	'use strict';

	var _signInContainerEl = document.getElementById('sign-in-container');
	var _signUpContainerEl = document.getElementById('sign-up-container');
	var _eventPlannerContainerEl = document.getElementById('event-planner-container');
	var _resetPasswordContainerEl = document.getElementById('reset-password-container');
	var _eventContainerEl = document.getElementById('event-container');
	var _showEventContainerEl = document.getElementById('show-event-container');
	var _userInfoContainerEl = document.getElementById('user-info-container');

	/**
  * Shows and hides blocks, like a super simple router
  * @class SignInOut
  * 
  */
	return function () {

		/**
      * Displayer constructor.
      * @constructs Displayer
      */

		function Displayer() {
			_classCallCheck(this, Displayer);
		}

		/**
   * SignInContainer Element
   * @return {Object} SignInContainer Element
   * @memberof Displayer
   * @type {Object}
   * 
   */


		_createClass(Displayer, null, [{
			key: 'showSignUp',


			/**
    * Show the sign up form
    * @memberof Displayer
    * 
    */
			value: function showSignUp() {

				_signInContainerEl.hidden = true;
				_eventPlannerContainerEl.hidden = true;
				_signUpContainerEl.hidden = false;
				_resetPasswordContainerEl.hidden = true;
				_showEventContainerEl.hidden = true;
				_userInfoContainerEl.hidden = true;

				SignUp.validateSignUp(true); //<-Validate the sign up
			}

			/**
    * Show the sign in form
    * @memberof Displayer
    * 
    */

		}, {
			key: 'showSignIn',
			value: function showSignIn() {

				_signInContainerEl.hidden = false;
				_eventPlannerContainerEl.hidden = true;
				_signUpContainerEl.hidden = true;
				_resetPasswordContainerEl.hidden = true;
				_showEventContainerEl.hidden = true;
				_userInfoContainerEl.hidden = true;
			}

			/**
    * Show the event planner
    * @memberof Displayer
    * 
    */

		}, {
			key: 'showEventPlanner',
			value: function showEventPlanner() {

				_signInContainerEl.hidden = true;
				_eventPlannerContainerEl.hidden = false;
				_signUpContainerEl.hidden = true;
				_resetPasswordContainerEl.hidden = true;
				_showEventContainerEl.hidden = true;
				_userInfoContainerEl.hidden = true;

				EventPlanner.checkEventFields(); //<-Check event fields
			}

			/**
    * Show the reset password form
    * @memberof Displayer
    * 
    */

		}, {
			key: 'showResetPassword',
			value: function showResetPassword() {

				_signInContainerEl.hidden = true;
				_eventPlannerContainerEl.hidden = true;
				_signUpContainerEl.hidden = true;
				_resetPasswordContainerEl.hidden = false;
				_showEventContainerEl.hidden = true;
				_userInfoContainerEl.hidden = true;
			}

			/**
    * Show the event container form
    * @memberof Displayer
    * 
    */

		}, {
			key: 'showEventContainer',
			value: function showEventContainer() {

				_signInContainerEl.hidden = true;
				_eventPlannerContainerEl.hidden = true;
				_signUpContainerEl.hidden = true;
				_resetPasswordContainerEl.hidden = true;
				_showEventContainerEl.hidden = false;
				_userInfoContainerEl.hidden = true;
			}

			/**
    * Show the user info form
    * @memberof Displayer
    * 
    */

		}, {
			key: 'showUserInfo',
			value: function showUserInfo() {

				_signInContainerEl.hidden = true;
				_eventPlannerContainerEl.hidden = true;
				_signUpContainerEl.hidden = true;
				_resetPasswordContainerEl.hidden = true;
				_showEventContainerEl.hidden = true;
				_userInfoContainerEl.hidden = false;
			}
		}, {
			key: 'signInContainerEl',
			get: function get() {

				return _signInContainerEl;
			}

			/**
    * SignUp Container Element
    * @return {Object} SignUp Container Element
    * @memberof Displayer
    * @type {Object}
    * 
    */

		}, {
			key: 'signUpContainerEl',
			get: function get() {

				return _signUpContainerEl;
			}

			/**
    * Event Planner Container Element
    * @return {Object} Event Planner Container Element
    * @memberof Displayer
    * @type {Object}
    * 
    */

		}, {
			key: 'eventPlannerContainerEl',
			get: function get() {

				return _eventPlannerContainerEl;
			}

			/**
    * Reset Password Container Element
    * @return {Object} Reset Password Container Element
    * @memberof Displayer
    * @type {Object}
    * 
    */

		}, {
			key: 'resetPasswordContainerEl',
			get: function get() {

				return _resetPasswordContainerEl;
			}

			/**
    * Event Container Element
    * @return {Object} Event Container Element
    * @memberof Displayer
    * @type {Object}
    * 
    */

		}, {
			key: 'eventContainerEl',
			get: function get() {

				return _eventContainerEl;
			}

			/**
    * Show Event Container Element
    * @return {Object} Show Event Container Element
    * @memberof Displayer
    * @type {Object}
    * 
    */

		}, {
			key: 'showEventContainerEl',
			get: function get() {

				return _showEventContainerEl;
			}

			/**
    * User Info Container Element
    * @return {Object} User Info Container Element
    * @memberof Displayer
    * @type {Object}
    * 
    */

		}, {
			key: 'userInfoContainerEl',
			get: function get() {

				return _userInfoContainerEl;
			}
		}]);

		return Displayer;
	}();
}(document);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var EventPlanner = function (document) {
	'use strict';

	var _eventNameEl = document.getElementById('event-name');
	var _eventTypeEl = document.getElementById('event-type');
	var _eventHostEl = document.getElementById('event-host');
	var _startDateEl = document.getElementById('start-date');
	var _endDateEl = document.getElementById('end-date');
	var _contentEl = document.getElementById('vtil-content');
	var _inputEl = document.getElementById('vtil-input');
	var _locationInputEl = document.getElementById('location-input');
	var _streetNumberEl = document.getElementById('street-number');
	var _cityEl = document.getElementById('city');
	var _stateEl = document.getElementById('state');
	var _postalCodeEl = document.getElementById('postal-code');
	var _countryEl = document.getElementById('country');
	var _messageEl = document.getElementById('message');
	var _progressBarEl = document.getElementById('progress-bar');
	var _progressBarLabelEl = document.getElementById('progress-bar-label');
	var _addressList = [_streetNumberEl, _cityEl, _stateEl, _postalCodeEl, _countryEl];
	var _autocomplete = undefined;

	/**
 * Instantiate a new vtil object
 * 
 **/
	var VTILAPP = VTILAPP || Object.create(null);
	VTILAPP.vtil = new VTIL(_contentEl, _inputEl, 'VTILAPP.vtil');

	/**
  * Clear guests
  * 
  * 
  */
	function _clearGuests() {

		var tags = VTILAPP.vtil.tags.slice(0);

		tags.forEach(function (tag) {

			VTILAPP.vtil.removeTag(tag.id);
		});
	}

	/**
  * Clear the address elements
  * 
  */
	function _clearAddress(pred) {

		_addressList.forEach(function (addressEl) {

			_addressEl.value = '';
			_addressEl.disabled = pred;
		});
	}

	/**
  * Fills in the address when the location is retrieved
  * 
  */
	function _fillInAddress() {
		// Get the place details from the autocomplete object.
		var place = _autocomplete.getPlace();

		_clearAddress(false);

		// Get each component of the address from the place details
		// and fill the corresponding field on the form.
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = place.address_components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var component = _step.value;


				var addressType = component.types[0];

				switch (addressType) {

					//Address1
					case 'street_number':
						_streetNumberEl.value = component.short_name;
						break;

					//Address2
					case 'route':
						_streetNumberEl.value += ' ' + component.short_name;
						break;

					//City
					case 'locality':
						_cityEl.value = component.short_name;
						break;

					//State
					case 'administrative_area_level_1':
						_stateEl.value = component.short_name;
						break;

					//Zip
					case 'postal_code':
						_postalCodeEl.value = component.short_name;
						break;

					//Country
					case 'country':
						_countryEl.value = component.short_name;
						break;

				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}

	/**
  * Represents an Event Planner Page
  * @class EventPlanner
  * 
  */
	return function () {

		/**
      * EventPlanner constructor.
      * @constructs EventPlanner
      * @param {object} eventRef Reference to the firebase event route
      */

		function EventPlanner(eventRef) {
			_classCallCheck(this, EventPlanner);

			/**
          * The events
          * @member EventPlanner#events
          * @type {array}
          */
			this.events = [];

			/** 
   *   Firebase reference
   * 	@member EventPlanner#eventRef
   * 	@type {Object}
   */
			this.eventRef = eventRef;
		}

		/**
   * Event Name Element
   * @return {Object} Event Name Element
   * @memberof EventPlanner
   * @type {Object}
   * 
   */


		_createClass(EventPlanner, [{
			key: 'removeEvent',


			/**
    * Remove an event from events
    * @function removeEvent
    * @memberof EventPlanner
    * @param  {string} id Dom id of event to remove
    * @instance
    * 
    */
			value: function removeEvent(id) {

				var index = -1;

				for (var i = 0; i < this.events.length; ++i) {

					if (id === this.events[i].id) {

						index = i;
						break;
					}
				}

				if (index !== -1) {

					this.events = this.events.splice(index, 1);
					this.eventRef.set(this.events);
				}
			}

			/**
    *  Get the location
    *  @function geolocate
    * 	@memberof EventPlanner
    *  @instance
    * 
    */

		}, {
			key: 'geolocate',
			value: function geolocate() {

				if (navigator.geolocation) {

					navigator.geolocation.getCurrentPosition(function (position) {

						var geolocation = {

							lat: position.coords.latitude,
							lng: position.coords.longitude

						};

						var circle = new google.maps.Circle({

							center: geolocation,
							radius: position.coords.accuracy

						});

						_autocomplete.setBounds(circle.getBounds());
					});
				}
			}

			/**
    * Save the event
    *  @function submitForm
    * 	@memberof EventPlanner
    *  @instance
    *
    */

		}, {
			key: 'submitForm',
			value: function submitForm() {

				var d = new Date();

				this.events.push({

					'id': d.toISOString(),
					'title': _eventNameEl.value,
					'type': _eventTypeEl.value,
					'host': _eventHostEl.value,
					'begin': _startDateEl.value,
					'end': _endDateEl.value,
					'guests': _VTILAPP.vtil.tags,
					'address': _streetNumberEl.value,
					'city': _cityEl.value,
					'state': _stateEl.value,
					'zip': _postalCodeEl.value,
					'country': _countryEl.value,
					'message': _messageEl.value

				});

				this.eventRef.set(this.events);

				this.clearElements(); //<- YOU ARE HERE
			}

			/**
    *  Add a person
    *  @function addTag
    * 	@memberof EventPlanner
    *  @instance
    *
    */

		}, {
			key: 'addTag',
			value: function addTag() {

				VTILAPP.vtil.addTag();
				this.checkEventFields();
			}

			/**
    * Initializes the autocomplete object using the location
    * 
    */

		}], [{
			key: 'clearElements',


			/** 
   *   @function clearElements
   *   @memberof EventPlanner
   *   
   */
			value: function clearElements() {

				_eventNameEl.value = '';
				_eventTypeEl.value = '';
				_eventHostEl.value = '';
				_startDateEl.value = '';
				_endDateEl.value = '';
				_locationInputEl.value = '';

				_clearAddress(true);
				_clearGuests();
			}

			/**
    *  Checks if fields are completed
    *  @function checkEventFields
    * 	@memberof EventPlanner
    * 
    */

		}, {
			key: 'checkEventFields',
			value: function checkEventFields() {

				var completed = 0;

				if (_eventNameEl.value !== '') {

					completed += 1;
				}

				if (_eventTypeEl.value !== '') {

					completed += 1;
				}

				if (_eventHostEl.value !== '') {

					completed += 1;
				}

				if (_startDateEl.value !== '') {

					completed += 1;
				}

				if (_endDateEl.value !== '') {

					completed += 1;
				}

				if (VTILAPP.vtil.tags.length > 0) {

					completed += 1;
				}

				if (_streetNumberEl.value !== '') {

					completed += 1;
				}

				if (_cityEl.value !== '') {

					completed += 1;
				}

				if (_stateEl.value !== '') {

					completed += 1;
				}

				if (_postalCodeEl.value !== '') {

					completed += 1;
				}

				if (_countryEl.value !== '') {

					completed += 1;
				}

				if (_messageEl.value !== '') {

					completed += 1;
				}

				_progressBarLabelEl.innerHTML = completed.toString() + ' of 13 fields completed';
				_progressBarEl.value = completed;
			}
		}, {
			key: 'initAutocomplete',
			value: function initAutocomplete() {
				// Create the autocomplete object, restricting the search to geographical
				// location types.
				_autocomplete = new google.maps.places.Autocomplete(
				/** @type {!HTMLInputElement} */_locationInputEl, { types: ['geocode'] });

				// When the user selects an address from the dropdown, populate the address
				// fields in the form.
				_autocomplete.addListener('place_changed', _fillInAddress);
			}
		}, {
			key: 'eventNameEl',
			get: function get() {

				return _eventNameEl;
			}

			/**
    * Event Type Element
    * @return {Object} Event Type Element
    * @memberof EventPlanner
    * @type {Object}
    * 
    */

		}, {
			key: 'eventTypeEl',
			get: function get() {

				return _eventTypeEl;
			}

			/**
    * Event Host Element
    * @return {Object} Event Host Element
    * @memberof EventPlanner
    * @type {Object}
    * 
    */

		}, {
			key: 'eventHostEl',
			get: function get() {

				return _eventHostEl;
			}

			/**
    * Start Date Element
    * @return {Object} Start Date Element
    * @memberof EventPlanner
    * @type {Object}
    * 
    */

		}, {
			key: 'startDateEl',
			get: function get() {

				return _startDateEl;
			}

			/**
    * End Date Element
    * @return {Object} End Date Element
    * @memberof EventPlanner
    * @type {Object}
    * 
    */

		}, {
			key: 'endDateEl',
			get: function get() {

				return _endDateEl;
			}

			/**
    * Content Element
    * @return {Object} Content Element
    * @memberof EventPlanner
    * @type {Object}
    * 
    */

		}, {
			key: 'contentEl',
			get: function get() {

				return _contentEl;
			}

			/**
    * Input Element
    * @return {Object} Input Element
    * @memberof EventPlanner
    * @type {Object}
    * 
    */

		}, {
			key: 'inputEl',
			get: function get() {

				return _inputEl;
			}

			/**
    * Location Element
    * @return {Object} Location Element
    * @memberof EventPlanner
    * @type {Object}
    * 
    */

		}, {
			key: 'locationInputEl',
			get: function get() {

				return _locationInputEl;
			}

			/**
    * Street Number Element
    * @return {Object} Street Number Element
    * @memberof EventPlanner
    * @type {Object}
    * 
    */

		}, {
			key: 'streetNumberEl',
			get: function get() {

				return _streetNumberEl;
			}

			/**
    * City Element
    * @return {Object} City Element
    * @memberof EventPlanner
    * @type {Object}
    * 
    */

		}, {
			key: 'cityEl',
			get: function get() {

				return _cityEl;
			}

			/**
    * State Element
    * @return {Object} State Element
    * @memberof EventPlanner
    * @type {Object}
    * 
    */

		}, {
			key: 'stateEl',
			get: function get() {

				return _stateEl;
			}

			/**
    * Postal Code Element
    * @return {Object} Postal Code Element
    * @memberof EventPlanner
    * @type {Object}
    * 
    */

		}, {
			key: 'postalCodeEl',
			get: function get() {

				return _postalCodeEl;
			}

			/**
    * Country Element
    * @return {Object} Country Element
    * @memberof EventPlanner
    * @type {Object}
    * 
    */

		}, {
			key: 'countryEl',
			get: function get() {

				return _countryEl;
			}

			/**
    * Message Element
    * @return {Object} Message Element
    * @memberof EventPlanner
    * @type {Object}
    * 
    */

		}, {
			key: 'messageEl',
			get: function get() {

				return _messageEl;
			}

			/**
    * Progress Bar Element
    * @return {Object} Progress Bar Element
    * @memberof EventPlanner
    * @type {Object}
    * 
    */

		}, {
			key: 'progressBarEl',
			get: function get() {

				return _progressBarEl;
			}

			/**
    * Progress Bar Label Element
    * @return {Object} Progress Bar Label Element
    * @memberof EventPlanner
    * @type {Object}
    * 
    */

		}, {
			key: 'progressBarLabelEl',
			get: function get() {

				return _progressBarLabelEl;
			}
		}]);

		return EventPlanner;
	}();
}(document);
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
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var ShowEvents = function (document) {
	'use strict';

	/**
 * Clear all child elements
 *
 **/

	function _clearEl(el) {

		while (el.firstChild) {

			el.removeChild(el.firstChild);
		}
	}

	/**
  * Draw the events to te screen
  * 
  */
	function _redrawEvents(events) {

		_clearEl(Displayer.eventContainerEl);

		events.forEach(function (event) {

			//Create the card
			var cardDiv = document.createElement('div');
			cardDiv.className = "card-width mdl-card mdl-shadow--2dp vert-cent animated slideInDown";

			//Card Title
			var cardTitleDiv = document.createElement('div');
			cardTitleDiv.className = "mdl-card__title";
			var headerDiv = document.createElement('h2');
			headerDiv.className = "mdl-card__title-text";
			headerDiv.appendChild(document.createTextNode(event.title));

			var del = document.createElement('a');
			del.setAttribute('href', "#");
			del.setAttribute('title', "Delete");
			del.className = "card-trash";
			del.setAttribute('onclick', 'APP.removeEvent("' + event.id + '")');
			del.innerHTML = '<i class="fa fa-trash-o"></i>';

			headerDiv.appendChild(del);
			cardTitleDiv.appendChild(headerDiv);
			cardDiv.appendChild(cardTitleDiv);

			//Card Body
			var cardContentDiv = document.createElement('div');
			cardContentDiv.className = "mdl-card__supporting-text";
			var p = document.createElement('p');
			p.innerHTML = "<b>" + event.host + '</b> is hosting a ' + '<b>' + event.type + '</b> at ';
			cardContentDiv.appendChild(p);

			p = document.createElement('p');
			p.innerHTML = event.address + '<br />' + event.city + ', ' + event.state + ' ' + event.zip + '<br />' + event.country;
			cardContentDiv.appendChild(p);

			p = document.createElement('p');
			p.appendChild(document.createTextNode("on"));
			cardContentDiv.appendChild(p);

			p = document.createElement('p');
			var begin = new Date(event.begin);
			var end = new Date(event.end);
			p.innerHTML = '<b>' + begin.toLocaleString() + '</b>' + ' to ' + '<b>' + end.toLocaleString() + '</b>';
			cardContentDiv.appendChild(p);

			p = document.createElement('p');
			p.innerHTML = 'and <b>' + event.host + '</b> wishes to let you know that<br/>' + event.message;
			cardContentDiv.appendChild(p);

			cardDiv.appendChild(cardContentDiv);
			Displayer.eventContainerEl.appendChild(cardDiv);
		});
	}

	/**
  * Represents a ShowEvents Page
  * @class ShowEvents
  * 
  */
	return function () {

		/**
      * ShowEvents constructor.
      * @constructs ShowEvents
      * @param {array} events events to display
      * @param {object} eventRef Firebase reference to the events route
      */

		function ShowEvents(events, eventRef) {
			_classCallCheck(this, ShowEvents);

			/**
          * The events
          * @member ShowEvents#events
          * @type {array}
          */
			this.events = events || [];

			/**
          * Frebase events reference
          * @member ShowEvents#eventRef
          * @type {object}
          */
			this.eventRef = eventRef;

			if (this.eventRef) {

				thisllistenForEvents();
			}
		}

		/**
   * @function listenForEvents
   * @memberof ShowEvents#eventRef
   * @instance
   * 
   */


		_createClass(ShowEvents, [{
			key: 'listenForEvents',
			value: function listenForEvents() {

				/**
     * Get the data
     * @param  {Object} snapshot value of the event
     */
				this.eventRef.on("value", function (snapshot) {

					this.events = snapshot.val();

					_redrawEvents(this.events);
				}, function (err) {

					console.log('Error: ', err);
				});
			}
		}]);

		return ShowEvents;
	}();
}(document);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var SignInOut = function (document) {
	'use strict';

	//signing in

	var _signInEmailEl = document.getElementById('signin-email');
	var _signInPasswordEl = document.getElementById('signin-password');
	var _signOutLinkEl = document.getElementById('sign-out-link');
	var _signInLinkEl = document.getElementById('sign-in-link');
	var _signupEmployerEl = document.getElementById('signup-employer');
	var _signupTitleEl = document.getElementById('signup-title');
	var _signupBirthdayEl = document.getElementById('signup-birthday');

	var _storeExtra = false;

	/**
 * Clear all child elements
 *
 **/
	function _clearEl(el) {

		while (el.firstChild) {

			el.removeChild(el.firstChild);
		}
	}

	/**
  * Represents an Sign In page and includes sign out functionality
  * @class SignInOut
  * 
  */
	return function () {

		/**
      * SignInOut constructor.
      * @constructs SignInOut
      * @param {object} fbRef Firebase Reference
      */

		function SignInOut(fbRef) {
			_classCallCheck(this, SignInOut);

			/**
          * Firebase Reference
          * @member SignInOut#fbRef
          * @type {Object}
          */
			this.fbRef = fbRef;

			/**
          * Firebase User Route Reference
          * @member SignInOut#userRef
          * @type {Object}
          */
			this.userRef = undefined;

			/**
          * Firebase Event Route Reference
          * @member SignInOut#eventRef
          * @type {Object}
          */
			this.eventRef = undefined;

			/**
          * Firebase Extra Info Route Reference
          * @member SignInOut#extraRef
          * @type {Object}
          */
			this.extraRef = undefined;
		}

		/**
   * SignIn Email Element
   * @return {Object} SignIn Email Element
   * @memberof SignInOut
   * @type {Object}
   * 
   */


		_createClass(SignInOut, [{
			key: 'authHandler',


			/** 
   *   @function authHandler
   *   @memberof SignInOut
   *   @param {object} error Holds the error if set
   *   @param {object} authData Users auth data from firebase
   *   @instance
   */
			value: function authHandler(error, authData) {

				if (error) {

					//Handle the error

				} else if (!authData) {

						console.log("User is logged out");
					} else {

						this.userRef = this.fbRef.child('users/' + authData.uid);
						this.eventRef = this.userRef.child('events/');
						this.extraRef = this.userRef.child('extra/');

						//If just signing up store the extra user data
						if (_storeExtra === true) {

							_storeExtra = false;

							this.extraRef.set({

								name: _signupNameEl.value,
								employer: _signupEmployerEl.value,
								title: _signupTitleEl.value,
								birthday: _signupBirthdayEl.value

							});
						}

						_signOutLinkEl.hidden = false;
						_signInLinkEl.hidden = true;

						// Dispatch/Trigger/Fire the event
						document.dispatchEvent(new CustomEvent("signed-in"));

						Displayer.showEventContainer();
					}
			}

			/**
    * @function signIn
    *   @memberof SignInOut
    *   @param {string} emailIn Holds the users email
    *   @param {string} passwordIn Holds the users password
    *   @instance
    * 
    */

		}, {
			key: 'signIn',
			value: function signIn(emailIn, passwordIn) {

				var email = emailIn || signInEmailEl.value;
				var password = passwordIn || APP.signInPasswordEl.value;

				// Sign in with an email/password combination
				this.fbRef.authWithPassword({
					email: email,
					password: password
				}, this.authHandler);
			}

			/**
    * @function signOut
    * @memberof SignInOut
    * @instance
    * 
    */

		}, {
			key: 'signOut',
			value: function signOut() {

				_signOutLinkEl.hidden = true;
				_signInLinkEl.hidden = false;
				this.fbRef.unauth();
				this.eventRef.off();
				this.extraRef.off();
				this.userRef = undefined;
				this.eventRef = undefined;
				this.extraRef = undefined;
				_signInEmailEl.value = '';
				_signInPasswordEl.value = '';

				SignUp.signupNameEl.value = '';
				SignUp.signupEmailEl.value = '';
				SignUp.signupPasswordEl.value = '';
				SignUp.signupPassword2El.value = '';
				EventPlanner.clearElements();
				_clearEl(_eventContainerEl);

				document.dispatchEvent(new CustomEvent("signed-out"));

				APP.showSignIn(); //<- Display the sign in page
			}
		}], [{
			key: 'signInEmailEl',
			get: function get() {

				return _signInEmailEl;
			}

			/**
    * SgnIn Password Element
    * @return {Object} SignIn Password Element
    * @memberof SignInOut
    * @type {Object}
    * 
    */

		}, {
			key: 'signInPasswordEl',
			get: function get() {

				return _signInPasswordEl;
			}

			/**
    * SignOut Link Element
    * @return {Object} SignOut Link Element
    * @memberof SignInOut
    * @type {Object}
    * 
    */

		}, {
			key: 'signOutLinkEl',
			get: function get() {

				return _signOutLinkEl;
			}

			/**
    * SignIn Link Element
    * @return {Object} SignIn Link Element
    * @memberof SignInOut
    * @type {Object}
    * 
    */

		}, {
			key: 'signInLinkEl',
			get: function get() {

				return _signInLinkEl;
			}

			/**
    * SignUp Employer Element
    * @return {Object} SignUp Employer Element
    * @memberof SignInOut
    * @type {Object}
    * 
    */

		}, {
			key: 'signupEmployerEl',
			get: function get() {

				return _signupEmployerEl;
			}

			/**
    * Signup Title Element
    * @return {Object} Signup Title Element
    * @memberof SignInOut
    * @type {Object}
    * 
    */

		}, {
			key: 'signupTitleEl',
			get: function get() {

				return _signupTitleEl;
			}

			/**
    * Signup Birthday Element
    * @return {Object} Signup Birthday Element
    * @memberof SignInOut
    * @type {Object}
    * 
    */

		}, {
			key: 'signupBirthdayEl',
			get: function get() {

				return _signupBirthdayEl;
			}

			/**
    * Indicates if we will be storing additional user info when signing in (after a signup)
    * @return {boolean} Indicates if we will be storing additional user info when signing in (after a signup)
    * @memberof SignInOut
    * @type {boolean}
    * 
    */

		}, {
			key: 'storeExtra',
			get: function get() {

				return _storeExtra;
			}

			/**
    * Indicates if we will be storing additional user info when signing in (after a signup)
    * @memberof SignInOut
    * @param {boolean} pred Indicates if we will be storing additional user info when signing in (after a signup)
    * @type {boolean}
    * 
    */
			,
			set: function set(pred) {

				_storeExtra = pred;
			}
		}]);

		return SignInOut;
	}();
}(document);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var SignUp = function () {
	'use strict';

	//signing up

	var _signupNameEl = document.getElementById('signup-name');
	var _signupEmailEl = document.getElementById('signup-email');
	var _signupPasswordEl = document.getElementById('signup-password');
	var _signupPassword2El = document.getElementById('signup-password2');
	var _submitPasswordButton = document.getElementById('submit-password-button');
	var _signupAdditionalInfoEl = document.getElementById('signup-additional-info');
	var _signupSwitchEl = document.getElementById('switch-1');
	var _valCheckLengthEl = document.getElementById('val-check-length');
	var _valCheckSpecialEl = document.getElementById('val-check-special');
	var _valCheckUpperEl = document.getElementById('val-check-upper');
	var _valCheckLowerEl = document.getElementById('val-check-lower');
	var _valCheckMatchEl = document.getElementById('val-check-match');
	var _valCheckNumberEl = document.getElementById('val-check-number');
	var _valCheckEmailEl = document.getElementById('val-check-email');

	var _validator = new FV.Validator();
	var _passwordField = new FV.Field("Password1", _signupPasswordEl);
	var _password2Field = new FV.Field("Password2", _signupPassword2El, _signupPasswordEl);
	var _emailField = new FV.Field('EmailError', _signupEmailEl);

	_passwordField.constraints = [new FV.Constraint(FV.Validator.MINLENGTH, "* Password must be at least 8 characters long.\n", 8), new FV.Constraint(FV.Validator.CONTAINSUPPER, "* Password must contain at least one upper case letter.\n"), new FV.Constraint(FV.Validator.CONTAINSLOWER, "* Password must contain at least one lower case letter.\n"), new FV.Constraint(FV.Validator.CONTAINSSPECIAL, "* Password must contain at least one special character (!, @, #, $, %, ^, &, *).\n"), new FV.Constraint(FV.Validator.CONTAINSNUMBER, "* Password must contain at least one number.\n")];

	_password2Field.constraints = [new FV.Constraint(FV.Validator.EQUALSFIELD, "* Must match your password.\n")];

	_emailField.constraints = [new FV.Constraint(FV.Validator.EMAIL, "* Must be a valid email address.\n")];

	_validator.fields = [_passwordField, _password2Field, _emailField];

	/**
  * Private function for showing good/bad auth messages
  * @param  {array} errorTypes Holds the errors present
  * 
  */
	function _checkValFields(errorTypes) {

		if (errorTypes.indexOf(FV.Validator.EMAIL) === -1) {

			_valCheckEmailEl.className = 'val-check-good';
			_valCheckEmailEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Must use a valid email address';
		} else {

			_valCheckEmailEl.className = 'val-check-bad';
			_valCheckEmailEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Must use a valid email address';
		}

		if (errorTypes.indexOf(FV.Validator.MINLENGTH) === -1) {

			_valCheckLengthEl.className = 'val-check-good';
			_valCheckLengthEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must be at least 8 characters long';
		} else {

			_valCheckLengthEl.className = 'val-check-bad';
			_valCheckLengthEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must be at least 8 characters long';
		}

		if (errorTypes.indexOf(FV.Validator.CONTAINSUPPER) === -1) {

			_valCheckUpperEl.className = 'val-check-good';
			_valCheckUpperEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one upper case character';
		} else {

			_valCheckUpperEl.className = 'val-check-bad';
			_valCheckUpperEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one upper case character';
		}

		if (errorTypes.indexOf(FV.Validator.CONTAINSLOWER) === -1) {

			_valCheckLowerEl.className = 'val-check-good';
			_valCheckLowerEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one lower case character';
		} else {

			_valCheckLowerEl.className = 'val-check-bad';
			_valCheckLowerEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one lower case character';
		}

		if (errorTypes.indexOf(FV.Validator.CONTAINSSPECIAL) === -1) {

			_valCheckSpecialEl.className = 'val-check-good';
			_valCheckSpecialEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one special character (!, @, #, $, %, ^, &, *)';
		} else {

			_valCheckSpecialEl.className = 'val-check-bad';
			_valCheckSpecialEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one special character (!, @, #, $, %, ^, &, *)';
		}

		if (errorTypes.indexOf(FV.Validator.EQUALSFIELD) === -1 && APP.signupPasswordEl.value !== '' && APP.signupPassword2El.value !== '') {

			_valCheckMatchEl.className = 'val-check-good';
			_valCheckMatchEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Passwords must match';
		} else {

			_valCheckMatchEl.className = 'val-check-bad';
			_valCheckMatchEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Passwords must match';
		}

		if (errorTypes.indexOf(FV.Validator.CONTAINSNUMBER) === -1) {

			_valCheckNumberEl.className = 'val-check-good';
			_valCheckNumberEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one number';
		} else {

			_valCheckNumberEl.className = 'val-check-bad';
			_valCheckNumberEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one number';
		}

		if (_signupNameEl.value === '' || _signupEmailEl.value === '' || _signupPasswordEl.value === '' || _signupPassword2El.value === '') {

			_valCheckRequiredEl.className = 'val-check-bad';
			_valCheckRequiredEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> All required fields must be filled out';
		} else {

			_valCheckRequiredEl.className = 'val-check-good';
			_valCheckRequiredEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> All required fields must be filled out';
		}
	}

	/**
  * Represents a SignUp Page
  * @class SignUp
  * 
  */
	return function () {
		function SignUp(fbRef) {
			_classCallCheck(this, SignUp);

			/**
          * Firebase Reference
          * @member SignUp#fbRef
          * @type {Object}
          */
			this.fbRef = fbRef;

			/**
    * Validating input before submitting the password
    * 
    */
			_submitPasswordButton.onclick = this.validateSignUp;
		}

		/**
   * Signup Container Element
   * @return {Object} SignupContainer Element
   * @memberof SignUp
   * @type {Object}
   * 
   */


		_createClass(SignUp, [{
			key: 'signUp',


			/**
    * @function signUp
    * @memberof SignUp
    * @instance
    * 
    */
			value: function signUp() {

				this.fbRef.createUser({
					email: _signupEmailEl.value,
					password: _signupPasswordEl.value
				}, function (error, userData) {

					if (error) {

						console.log("Error creating user:", error);
					} else {

						SignInOut.storeExtra = true;

						document.dispatchEvent(new CustomEvent("signed-up"));
					}
				});
			}

			/**
    * Validate sign up page
    * @memberof SignUp
    * @param  {Boolean} skipCustomValidation checks if we will show custom validation
    * @instance
    */

		}, {
			key: 'validateSignUp',
			value: function validateSignUp(skipCustomValidation) {

				var errors = _validator.checkForErrors();
				var errorTypes = [];
				var passwordErrors = "";
				var password2Errors = "";
				var emailErrors = "";

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

						case "EmailError":

							emailErrors += error.error;
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

				if (emailErrors !== '') {

					emailErrors = "Please correct the following errors:\n" + emailErrors;
				}

				//These will only display one at a time
				if (!skipCustomValidation) {

					_signupPasswordEl.setCustomValidity(passwordErrors);
					_signupPassword2El.setCustomValidity(password2Errors);
				}

				_checkValFields(errorTypes);
			}

			/**
    * Show/hide additional info
    * @memberOf SignUp
    * @instance
    */

		}, {
			key: 'showAdditionalInfo',
			value: function showAdditionalInfo() {

				_signupAdditionalInfoEl.hidden = !_signupSwitchEl.checked;
			}
		}], [{
			key: 'signupNameEl',
			get: function get() {

				return _signupNameEl;
			}

			/**
    * Signup Email Element
    * @return {Object} Signup Email Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'signupEmailEl',
			get: function get() {

				return _signupEmailEl;
			}

			/**
    * Signup Password Element
    * @return {Object} Signup Password Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'signupPasswordEl',
			get: function get() {

				return _signupPasswordEl;
			}

			/**
    * Signup Password 2 Element
    * @return {Object} Signup Password 2 Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'signupPassword2El',
			get: function get() {

				return _signupPassword2El;
			}

			/**
    * Submit Password Button Element
    * @return {Object} Submit Password Button Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'submitPasswordButton',
			get: function get() {

				return _submitPasswordButton;
			}

			/**
    * SignUp Additional Info Element
    * @return {Object} SignUp Additional Info Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'signupAdditionalInfoEl',
			get: function get() {

				return _signupAdditionalInfoEl;
			}

			/**
    * Signup Switch Element
    * @return {Object} Signup Switch Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'signupSwitchEl',
			get: function get() {

				return _signupSwitchEl;
			}

			/**
    * Val Check Length Element
    * @return {Object} Val Check Length Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'valCheckLengthEl',
			get: function get() {

				return _valCheckLengthEl;
			}

			/**
    * Val Check Special Element
    * @return {Object} Val Check Special Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'valCheckSpecialEl',
			get: function get() {

				return _valCheckSpecialEl;
			}

			/**
    * Val Check Upper Element
    * @return {Object} Val Check Upper Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'valCheckUpperEl',
			get: function get() {

				return _valCheckUpperEl;
			}

			/**
    * Val Check Lower Element
    * @return {Object} Val Check Lower Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'valCheckLowerEl',
			get: function get() {

				return _valCheckLowerEl;
			}

			/**
    * Val Check Match Element
    * @return {Object} Val Check Match Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'valCheckMatchEl',
			get: function get() {

				return _valCheckMatchEl;
			}

			/**
    * Val Check Number Element
    * @return {Object} Val Check Number Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'valCheckNumberEl',
			get: function get() {

				return _valCheckNumberEl;
			}

			/**
    * Val Check Email Element
    * @return {Object} Val Check Email Element
    * @memberof SignUp
    * @type {Object}
    * 
    */

		}, {
			key: 'valCheckEmailEl',
			get: function get() {

				return _valCheckEmailEl;
			}
		}]);

		return SignUp;
	}();
}();
'use strict';

var UserInfo = function () {}();
//# sourceMappingURL=../maps/all.js.map
