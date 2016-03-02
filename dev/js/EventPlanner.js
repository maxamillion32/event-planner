'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

/**
* Instantiate a new vtil object
* 
**/
var VTILAPP = VTILAPP || Object.create(null);

var EventPlanner = function (document) {
	'use strict';

	var _totalInputs = 11;

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
	var _submitEventButton = document.getElementById('submit-event-button');
	var _addButton = document.getElementById('add-button');
	var _eventPlannerSpinnerEl = document.getElementById('event-planner-spinner');
	var _eventHostDiv = document.getElementById('event-host-div');
	var _locationInputDiv = document.getElementById('location-input-div');
	var _addressDivEl = document.getElementById('address-div');
	var _cityDivEl = document.getElementById('city-div');
	var _stateDivEl = document.getElementById('state-div');
	var _zipDivEl = document.getElementById('zip-div');
	var _countryDivEl = document.getElementById('country-div');
	var _locationButtonEl = document.getElementById('location-button');
	var _addressList = [_streetNumberEl, _cityEl, _stateEl, _postalCodeEl, _countryEl];
	var _autocomplete = undefined;

	_submitEventButton.disabled = true;

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

			addressEl.value = '';
			addressEl.disabled = pred;
		});
	}

	/**
  * Clear the elements in the form
  * 
  */
	function _clearElements() {

		_eventNameEl.value = '';
		_eventTypeEl.value = '';
		_eventHostEl.value = '';
		_startDateEl.value = '';
		_endDateEl.value = '';
		_locationInputEl.value = '';
		_messageEl.value = '';
		_progressBarEl.value = 0;
		_progressBarLabelEl.innerHTML = '0 of ' + _totalInputs.toString() + ' fields completed';
		_clearAddress(true);
		_clearGuests();
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
						_addressDivEl.className += ' is-dirty';
						break;

					//City
					case 'locality':
						_cityEl.value = component.short_name;
						_cityDivEl.className += ' is-dirty';
						break;

					//State
					case 'administrative_area_level_1':
						_stateEl.value = component.short_name;
						_stateDivEl.className += ' is-dirty';
						break;

					//Zip
					case 'postal_code':
						_postalCodeEl.value = component.short_name;
						_zipDivEl.className += ' is-dirty';
						break;

					//Country
					case 'country':
						_countryEl.value = component.short_name;
						_countryDivEl.className += ' is-dirty';
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

		_locationButtonEl.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect guest-button';

		EventPlanner.checkEventFields();
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

				_eventPlannerSpinnerEl.hidden = false;
				Displayer.eventPlannerContainerEl.hidden = true;

				this.eventRef.push({

					'title': _eventNameEl.value,
					'type': _eventTypeEl.value,
					'host': _eventHostEl.value,
					'begin': _startDateEl.value,
					'end': _endDateEl.value,
					'guests': VTILAPP.vtil.tags,
					'address': _streetNumberEl.value,
					'city': _cityEl.value,
					'state': _stateEl.value,
					'zip': _postalCodeEl.value,
					'country': _countryEl.value,
					'message': _messageEl.value

				}, function (err) {

					_eventPlannerSpinnerEl.hidden = true;
					Displayer.eventPlannerContainerEl.hidden = false;

					if (err) {

						Displayer.showSnackbar('There was an error adding the event, how rude!  :-(');
					} else {

						Displayer.showSnackbar('Event popped and locked!  :-)');
					}
				});

				_clearElements();
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
				EventPlanner.checkEventFields();
				_addButton.disabled = true;
			}

			/**
    *  Restore EventPlanner back to defaults
    *  @function dispose
    * 	@memberof EventPlanner
    *  @instance
    *
    */

		}, {
			key: 'dispose',
			value: function dispose() {

				_clearElements();
				this.eventRef = undefined;
			}
		}], [{
			key: 'setCurrentAddress',


			/**
    * Set the location input as the current Address
    * @function setCurrentAddress
    * @memberof EventPlanner
    * 
    */
			value: function setCurrentAddress() {

				if (navigator.geolocation) {

					navigator.geolocation.getCurrentPosition(function (position) {

						var geocoder = new google.maps.Geocoder();
						var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

						geocoder.geocode({

							'location': latlng
						}, function (results, status) {

							if (status == google.maps.GeocoderStatus.OK) {

								_locationInputEl.value = results[0].formatted_address;
								_locationInputDiv.className += ' is-dirty';
								_locationInputEl.focus();

								Displayer.showSnackbar('Address set! :-)');
							} else {

								Displayer.showSnackbar('Sorry, we could\'t get your location. :-(');
							}
						});
					});
				} else {

					Displayer.showSnackbar('Location unavailable :-(');
				}
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

				_progressBarLabelEl.innerHTML = completed.toString() + ' of ' + _totalInputs.toString() + ' fields completed';
				_progressBarEl.value = completed;

				//Disable the submit button until all the fields are filled out
				_submitEventButton.disabled = completed !== _totalInputs;
			}

			/**
    *  Initializes the autocomplete object using the location
    *  @function initAutocomplete
    * 	@memberof EventPlanner
    * 
    */

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

			/**
    *  Checks if add guest button should be disabled
    *  @function checkGuestField
    * 	@memberof EventPlanner
    * 
    */

		}, {
			key: 'checkGuestField',
			value: function checkGuestField() {

				_addButton.disabled = _inputEl.value === '';
			}
		}, {
			key: 'eventNameEl',
			get: function get() {

				return _eventNameEl;
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
    * Event Host Div Element
    * @return {Object} Event Host Div Element
    * @memberof EventPlanner
    * @type {Object}
    * 
    */

		}, {
			key: 'eventHostDiv',
			get: function get() {

				return _eventHostDiv;
			}
		}]);

		return EventPlanner;
	}();
}(document);