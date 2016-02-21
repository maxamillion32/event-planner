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
//# sourceMappingURL=../maps/EventPlanner.js.map
