'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (document) {
	'use strict';
	/*jshint esversion: 6 */

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
	};

	/**
  * Fills in the address when the location is retrieved
  *  @function _fillInAddress
  * 	@memberof EventPlanner
  * 	@private
  *  @instance
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
	};

	/**
  * Initializes the autocomplete object using the location
  *  @function initAutocomplete
  * 	@memberof EventPlanner
  *  @instance
  * 
  */
	function _initAutocomplete() {
		// Create the autocomplete object, restricting the search to geographical
		// location types.
		_autocomplete = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */_locationInputEl, { types: ['geocode'] });

		// When the user selects an address from the dropdown, populate the address
		// fields in the form.
		_autocomplete.addListener('place_changed', _fillInAddress);
	};

	/**
  * Represents an Event Planner Page
  * @class EventPlanner
  * 
  */
	return function () {

		/**
      * EventPlanner constructor.
      * @constructs EventPlanner
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

			/**
    * Listen for address change
    */
			_initAutocomplete();
		}

		/**
   * Event Name Element
   * @return {Object} Event Name Element
   * @memberof EventPlanner
   * @type {Object}
   * 
   */


		_createClass(EventPlanner, [{
			key: 'clearElements',


			/** 
   *   @function clearElements
   *   @memberof EventPlanner
   *   @instance
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
		}, {
			key: 'checkEventFields',


			/**
    *  Checks if fields are completed
    *  @function checkEventFields
    * 	@memberof EventPlanner
    * 	@instance
    * 
    */
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
		}, {
			key: 'geolocate',


			/**
    *  Get the location
    *  @function geolocate
    * 	@memberof EventPlanner
    *  @instance
    * 
    */
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
		}, {
			key: 'submitForm',


			/**
    * Save the event
    *  @function submitForm
    * 	@memberof EventPlanner
    *  @instance
    *
    */
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
		}], [{
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
})(document);
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (document) {
	'use strict';

	return function PageBase() {
		_classCallCheck(this, PageBase);
	};
})(document);
'use strict';

(function () {
	'use strict';

	var APP = window.APP || Object.create(null);

	var resetPasswordEmail = document.getElementById('reset-password-email');

	/******************************************************************
 Reset password functionality
 /******************************************************************
 	/**
  * Reset the users password
  * 
  */
	APP.resetPassword = function () {

		APP.ref.resetPassword({
			email: resetPasswordEmail.value
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
	};
})();
'use strict';

(function (document) {
	'use strict';

	var APP = window.APP || Object.create(null);

	var events = []; //The users events

	/******************************************************************
 Event functionality
 /******************************************************************
 	/**
  * Display events if user has logged in
  * 
  */
	APP.displayEvents = function () {

		if (eventRef) {

			APP.showEventContainer();
		}
	};

	function listenForEvents() {

		/**
   * Get the data
   * @param  {Object} snapshot value of the event
   */
		this.eventRef.on("value", function (snapshot) {

			this.events = snapshot.val();

			_redrawEvents();
		}, function (err) {

			console.log('Error: ', err);
		});
	}

	/**
  * Draw the events to te screen
  * 
  */
	function _redrawEvents() {

		APP.clearEl(APP.eventContainerEl);

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
			APP.eventContainerEl.appendChild(cardDiv);
		});
	}

	/**
  * Add a person
  * 
  */
	APP.addTag = function () {

		VTILAPP.vtil.addTag();
		APP.checkEventFields();
	};
})(document);
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
	'use strict';

	//signing in

	var _signInEmailEl = document.getElementById('signin-email');
	var _signInPasswordEl = document.getElementById('signin-password');
	var _signOutLinkEl = document.getElementById('sign-out-link');
	var _signInLinkEl = document.getElementById('sign-in-link');
	var _signupEmployerEl = document.getElementById('signup-employer');
	var _signupTitleEl = document.getElementById('signup-title');
	var _signupBirthdayEl = document.getElementById('signup-birthday');

	return function SignInOut() {
		_classCallCheck(this, SignInOut);
	};

	/**
  * User has signed in
  *
  */
	function _authHandler(error, authData) {

		if (error) {

			//Handle the error

		} else if (!authData) {

				console.log("User is logged out");
			} else {

				APP.userRef = APP.ref.child('users/' + authData.uid);
				APP.eventRef = APP.userRef.child('events/');
				APP.extraRef = APP.userRef.child('extra/');

				//If just signing up store the extra user data
				if (APP.storeExtra === true) {

					APP.storeExtra = false;

					APP.extraRef.set({

						name: APP.signupNameEl.value,
						employer: signupEmployerEl.value,
						title: signupTitleEl.value,
						birthday: signupBirthdayEl.value

					});
				}

				signOutLinkEl.hidden = false;
				signInLinkEl.hidden = true;

				APP.displayEventCreation();

				/**
     * Get the data
     * @param  {Object} snapshot value of the event
     */
				APP.eventRef.on("value", function (snapshot) {

					APP.events = snapshot.val();

					_redrawEvents();
				}, function (err) {

					console.log('Error: ', err);
				});
			}
	}

	/**
  * User is signing in
  * 
  */
	APP.signIn = function (emailIn, passwordIn) {

		var email = emailIn || signInEmailEl.value;
		var password = passwordIn || APP.signInPasswordEl.value;

		// Sign in with an email/password combination
		ref.authWithPassword({
			email: email,
			password: password
		}, _authHandler);
	};

	/******************************************************************
 Sign out functionality
 /******************************************************************
 	/**
  * User is signing out
  * 
  */
	APP.signOut = function () {

		signOutLinkEl.hidden = true;
		signInLinkEl.hidden = false;
		APP.ref.unauth();
		APP.eventRef.off();
		APP.extraRef.off();
		APP.userRef = undefined;
		APP.eventRef = undefined;
		APP.extraRef = undefined;
		signInEmailEl.value = '';
		APP.signInPasswordEl.value = '';
		APP.signupNameEl.value = '';
		APP.signupEmailEl.value = '';
		APP.signupPasswordEl.value = '';
		APP.signupPassword2El.value = '';
		APP.clearElements();
		APP.clearEl(eventContainerEl);
		APP.showSignIn();
	};
})();
'use strict';

(function () {
	'use strict';

	var APP = window.APP || Object.create(null);

	var submitPasswordButton = document.getElementById('submit-password-button');
	var signupAdditionalInfoEl = document.getElementById('signup-additional-info');
	var signupSwitchEl = document.getElementById('switch-1');
	var validator = new FV.Validator();
	var passwordField = new FV.Field("Password1", signupPasswordEl);
	var password2Field = new FV.Field("Password2", signupPassword2El, signupPasswordEl);
	var emailField = new FV.Field('EmailError', signupEmailEl);
	var valCheckLengthEl = document.getElementById('val-check-length');
	var valCheckSpecialEl = document.getElementById('val-check-special');
	var valCheckUpperEl = document.getElementById('val-check-upper');
	var valCheckLowerEl = document.getElementById('val-check-lower');
	var valCheckMatchEl = document.getElementById('val-check-match');
	var valCheckNumberEl = document.getElementById('val-check-number');
	var valCheckEmailEl = document.getElementById('val-check-email');

	/******************************************************************
 Sign up functionality
 /******************************************************************
 	/**
  * User is signing up
  * 
  */
	APP.signUp = function () {

		APP.ref.createUser({
			email: APP.signupEmailEl.value,
			password: APP.signupPasswordEl.value
		}, function (error, userData) {

			if (error) {

				console.log("Error creating user:", error);
			} else {

				APP.storeExtra = true;

				APP.signIn(signupEmailEl.value, signupPasswordEl.value);
			}
		});
	};

	/**
  * Check for various validation errors
  * 
  */
	function _checkValFields(errorTypes) {

		if (errorTypes.indexOf(FV.Validator.EMAIL) === -1) {

			valCheckEmailEl.className = 'val-check-good';
			valCheckEmailEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Must use a valid email address';
		} else {

			valCheckEmailEl.className = 'val-check-bad';
			valCheckEmailEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Must use a valid email address';
		}

		if (errorTypes.indexOf(FV.Validator.MINLENGTH) === -1) {

			valCheckLengthEl.className = 'val-check-good';
			valCheckLengthEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must be at least 8 characters long';
		} else {

			valCheckLengthEl.className = 'val-check-bad';
			valCheckLengthEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must be at least 8 characters long';
		}

		if (errorTypes.indexOf(FV.Validator.CONTAINSUPPER) === -1) {

			valCheckUpperEl.className = 'val-check-good';
			valCheckUpperEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one upper case character';
		} else {

			valCheckUpperEl.className = 'val-check-bad';
			valCheckUpperEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one upper case character';
		}

		if (errorTypes.indexOf(FV.Validator.CONTAINSLOWER) === -1) {

			valCheckLowerEl.className = 'val-check-good';
			valCheckLowerEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one lower case character';
		} else {

			valCheckLowerEl.className = 'val-check-bad';
			valCheckLowerEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one lower case character';
		}

		if (errorTypes.indexOf(FV.Validator.CONTAINSSPECIAL) === -1) {

			valCheckSpecialEl.className = 'val-check-good';
			valCheckSpecialEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one special character (!, @, #, $, %, ^, &, *)';
		} else {

			valCheckSpecialEl.className = 'val-check-bad';
			valCheckSpecialEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one special character (!, @, #, $, %, ^, &, *)';
		}

		if (errorTypes.indexOf(FV.Validator.EQUALSFIELD) === -1 && APP.signupPasswordEl.value !== '' && APP.signupPassword2El.value !== '') {

			valCheckMatchEl.className = 'val-check-good';
			valCheckMatchEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Passwords must match';
		} else {

			valCheckMatchEl.className = 'val-check-bad';
			valCheckMatchEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Passwords must match';
		}

		if (errorTypes.indexOf(FV.Validator.CONTAINSNUMBER) === -1) {

			valCheckNumberEl.className = 'val-check-good';
			valCheckNumberEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> Password must contain at least one number';
		} else {

			valCheckNumberEl.className = 'val-check-bad';
			valCheckNumberEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> Password must contain at least one number';
		}

		if (APP.signupNameEl.value === '' || APP.signupEmailEl.value === '' || APP.signupPasswordEl.value === '' || APP.signupPassword2El.value === '') {

			APP.valCheckRequiredEl.className = 'val-check-bad';
			APP.valCheckRequiredEl.innerHTML = '<i class="fa fa-thumbs-o-down"></i> All required fields must be filled out';
		} else {

			APP.valCheckRequiredEl.className = 'val-check-good';
			APP.valCheckRequiredEl.innerHTML = '<i class="fa fa-thumbs-o-up"></i> All required fields must be filled out';
		}
	}

	/**
  * Validate sign up page
  * 
  * @param  {Boolean} skipCustomValidation checks if we will show custom validation
  * 
  */
	APP.validateSignUp = function (skipCustomValidation) {

		var errors = validator.checkForErrors();
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

			APP.signupPasswordEl.setCustomValidity(passwordErrors);
			APP.signupPassword2El.setCustomValidity(password2Errors);
		}

		_checkValFields(errorTypes);
	};

	/**
  * Validating input before submitting the password
  * 
  */
	submitPasswordButton.onclick = APP.validateSignUp;

	/**
  * Show/hide additional info
  * 
  */
	APP.showAdditionalInfo = function () {

		signupAdditionalInfoEl.hidden = !signupSwitchEl.checked;
	};

	passwordField.constraints = [new FV.Constraint(FV.Validator.MINLENGTH, "* Password must be at least 8 characters long.\n", 8), new FV.Constraint(FV.Validator.CONTAINSUPPER, "* Password must contain at least one upper case letter.\n"), new FV.Constraint(FV.Validator.CONTAINSLOWER, "* Password must contain at least one lower case letter.\n"), new FV.Constraint(FV.Validator.CONTAINSSPECIAL, "* Password must contain at least one special character (!, @, #, $, %, ^, &, *).\n"), new FV.Constraint(FV.Validator.CONTAINSNUMBER, "* Password must contain at least one number.\n")];

	password2Field.constraints = [new FV.Constraint(FV.Validator.EQUALSFIELD, "* Must match your password.\n")];

	emailField.constraints = [new FV.Constraint(FV.Validator.EMAIL, "* Must be a valid email address.\n")];

	validator.fields = [passwordField, password2Field, emailField];
})();
'use strict';

(function () {
	'use strict';

	var APP = window.APP || Object.create(null);
})();
'use strict';

(function (document) {
	'use strict';

	var APP = window.APP || Object.create(null);
	var VTILAPP = Object.create(null);

	// Register the callback to be fired every time auth state changes
	APP.ref = new Firebase("https://swanky-event-planner.firebaseIO.com");

	//HTML Partial containers
	var signInContainerEl = document.getElementById('sign-in-container');
	var signUpContainerEl = document.getElementById('sign-up-container');
	var eventPlannerContainerEl = document.getElementById('event-planner-container');
	var resetPasswordContainerEl = document.getElementById('reset-password-container');
	APP.eventContainerEl = document.getElementById('event-container');
	var showEventContainerEl = document.getElementById('show-event-container');

	//signing up
	APP.signupNameEl = document.getElementById('signup-name');
	APP.signupEmailEl = document.getElementById('signup-email');
	APP.signupPasswordEl = document.getElementById('signup-password');
	APP.signupPassword2El = document.getElementById('signup-password2');

	APP.userRef; //Tag input list
	APP.eventRef; //Events
	APP.extraRef; //Extra user data
	APP.storeExtra = false; //Store extra user info

	APP.eventPlanner = new EventPlanner();
	APP.signInOut = new SignInOut();

	/**
 * Clear all child elements
 *
 **/
	APP.clearEl = function (el) {

		while (el.firstChild) {

			el.removeChild(el.firstChild);
		}
	};

	/**
  * Display event creation if user has logged in
  * 
  */
	APP.displayEventCreation = function () {

		if (eventRef) {

			showEventPlanner();
		}
	};

	/**
  * Sign out on exit
  * 
  */
	window.onbeforeunload = APP.signOut;

	/******************************************************************
 Display functionality
 /******************************************************************
 	/**
  * Show the sign up form
  * 
  */
	APP.showSignUp = function () {

		signInContainerEl.hidden = true;
		eventPlannerContainerEl.hidden = true;
		signUpContainerEl.hidden = false;
		resetPasswordContainerEl.hidden = true;
		showEventContainerEl.hidden = true;
		APP.validateSignUp(true);
	};

	/**
  * Show the sign in form
  * 
  */
	APP.showSignIn = function () {

		signInContainerEl.hidden = false;
		eventPlannerContainerEl.hidden = true;
		signUpContainerEl.hidden = true;
		resetPasswordContainerEl.hidden = true;
		showEventContainerEl.hidden = true;
	};

	/**
  * Show the event planner
  * 
  */
	function showEventPlanner() {

		signInContainerEl.hidden = true;
		eventPlannerContainerEl.hidden = false;
		signUpContainerEl.hidden = true;
		resetPasswordContainerEl.hidden = true;
		showEventContainerEl.hidden = true;

		APP.checkEventFields();
	};

	/**
  * Show the reset password screen
  * 
  */
	APP.showResetPassword = function () {

		signInContainerEl.hidden = true;
		eventPlannerContainerEl.hidden = true;
		signUpContainerEl.hidden = true;
		resetPasswordContainerEl.hidden = false;
		showEventContainerEl.hidden = true;
	};

	APP.showUserInfo = function () {

		if (extraRef) {}
	};

	/**
  * Show the events
  * 
  */
	function showEventContainer() {

		signInContainerEl.hidden = true;
		eventPlannerContainerEl.hidden = true;
		signUpContainerEl.hidden = true;
		resetPasswordContainerEl.hidden = true;
		showEventContainerEl.hidden = false;
	};
})(document);
//# sourceMappingURL=../maps/all.js.map
