/*jshint esversion: 6 */

(function(document) {
	'use strict';

	let _eventNameEl = 			document.getElementById('event-name');
	let _eventTypeEl = 			document.getElementById('event-type');
	let _eventHostEl = 			document.getElementById('event-host');
	let _startDateEl = 			document.getElementById('start-date');
	let _endDateEl =			document.getElementById('end-date');
	let _contentEl = 			document.getElementById('vtil-content');
	let _inputEl = 				document.getElementById('vtil-input');
	let _locationInputEl =		document.getElementById('location-input');
	let _streetNumberEl =		document.getElementById('street-number');
	let _cityEl =				document.getElementById('city');
	let _stateEl =				document.getElementById('state');
	let _postalCodeEl =			document.getElementById('postal-code');
	let _countryEl =			document.getElementById('country');
	let _messageEl =			document.getElementById('message');
	let _progressBarEl =		document.getElementById('progress-bar');
	let _progressBarLabelEl =	document.getElementById('progress-bar-label');
	let _addressList = [_streetNumberEl, _cityEl, _stateEl, _postalCodeEl, _countryEl];
	let _autocomplete;

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

		tags.forEach(function(tag) {

			VTILAPP.vtil.removeTag(tag.id);

		});

	}

	/**
	 * Clear the address elements
	 * 
	 */
	function _clearAddress(pred) {

		_addressList.forEach(function(addressEl) {

			_addressEl.value = 		'';
			_addressEl.disabled = 	pred;

		});

	}

	/**
	 * Fills in the address when the location is retrieved
	 * 
	 */
	function _fillInAddress() {
	  // Get the place details from the autocomplete object.
	  let place = _autocomplete.getPlace();

	  _clearAddress(false);

	  // Get each component of the address from the place details
	  // and fill the corresponding field on the form.
	  for (let component of place.address_components) {

	    let addressType = component.types[0];

	    switch(addressType) {

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

	}

	/**
	 * Initializes the autocomplete object using the location
	 * 
	 */
	function _initAutocomplete() {
	  // Create the autocomplete object, restricting the search to geographical
	  // location types.
	  _autocomplete = new google.maps.places.Autocomplete(
	      /** @type {!HTMLInputElement} */(_locationInputEl),
	      {types: ['geocode']});

	  // When the user selects an address from the dropdown, populate the address
	  // fields in the form.
	  _autocomplete.addListener('place_changed', _fillInAddress);
	}

	/**
	 * Represents an Event Planner Page
	 * @class EventPlanner
	 * 
	 */
	return class EventPlanner {

		/**
	     * EventPlanner constructor.
	     * @constructs EventPlanner
	     * @param {object} eventRef Reference to the firebase event route
	     */
		constructor(eventRef) {

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
		static get eventNameEl() {

			return _eventNameEl;
		}

		/**
		 * Event Type Element
		 * @return {Object} Event Type Element
		 * @memberof EventPlanner
		 * @type {Object}
		 * 
		 */
		static get eventTypeEl() {

			return _eventTypeEl;
		}

		/**
		 * Event Host Element
		 * @return {Object} Event Host Element
		 * @memberof EventPlanner
		 * @type {Object}
		 * 
		 */
		static get eventHostEl() {

			return _eventHostEl;
		}

		/**
		 * Start Date Element
		 * @return {Object} Start Date Element
		 * @memberof EventPlanner
		 * @type {Object}
		 * 
		 */
		static get startDateEl() {

			return _startDateEl;
		}

		/**
		 * End Date Element
		 * @return {Object} End Date Element
		 * @memberof EventPlanner
		 * @type {Object}
		 * 
		 */
		static get endDateEl() {

			return _endDateEl;
		}

		/**
		 * Content Element
		 * @return {Object} Content Element
		 * @memberof EventPlanner
		 * @type {Object}
		 * 
		 */
		static get contentEl() {

			return _contentEl;
		}

		/**
		 * Input Element
		 * @return {Object} Input Element
		 * @memberof EventPlanner
		 * @type {Object}
		 * 
		 */
		static get inputEl() {

			return _inputEl;
		}

		/**
		 * Location Element
		 * @return {Object} Location Element
		 * @memberof EventPlanner
		 * @type {Object}
		 * 
		 */
		static get locationInputEl() {

			return _locationInputEl;
		}

		/**
		 * Street Number Element
		 * @return {Object} Street Number Element
		 * @memberof EventPlanner
		 * @type {Object}
		 * 
		 */
		static get streetNumberEl() {

			return _streetNumberEl;
		}

		/**
		 * City Element
		 * @return {Object} City Element
		 * @memberof EventPlanner
		 * @type {Object}
		 * 
		 */
		static get cityEl() {

			return _cityEl;
		}

		/**
		 * State Element
		 * @return {Object} State Element
		 * @memberof EventPlanner
		 * @type {Object}
		 * 
		 */
		static get stateEl() {

			return _stateEl;
		}

		/**
		 * Postal Code Element
		 * @return {Object} Postal Code Element
		 * @memberof EventPlanner
		 * @type {Object}
		 * 
		 */
		static get postalCodeEl() {

			return _postalCodeEl;
		}

		/**
		 * Country Element
		 * @return {Object} Country Element
		 * @memberof EventPlanner
		 * @type {Object}
		 * 
		 */
		static get countryEl() {

			return _countryEl;
		}

		/**
		 * Message Element
		 * @return {Object} Message Element
		 * @memberof EventPlanner
		 * @type {Object}
		 * 
		 */
		static get messageEl() {

			return _messageEl;
		}

		/**
		 * Progress Bar Element
		 * @return {Object} Progress Bar Element
		 * @memberof EventPlanner
		 * @type {Object}
		 * 
		 */
		static get progressBarEl() {

			return _progressBarEl;
		}

		/**
		 * Progress Bar Label Element
		 * @return {Object} Progress Bar Label Element
		 * @memberof EventPlanner
		 * @type {Object}
		 * 
		 */
		static get progressBarLabelEl() {

			return _progressBarLabelEl;
		}

		/** 
		*   @function clearElements
		*   @memberof EventPlanner
		*   
		*/
		static clearElements() {

			_eventNameEl.value =		'';
			_eventTypeEl.value =		'';
			_eventHostEl.value =		'';
			_startDateEl.value =		'';
			_endDateEl.value =			'';
			_locationInputEl.value =	'';

			_clearAddress(true);
			_clearGuests();

		}

		/**
		 *  Checks if fields are completed
		 *  @function checkEventFields
		 * 	@memberof EventPlanner
		 * 
		 */
		static checkEventFields() {

			let completed = 0;

			if(_eventNameEl.value !== '') {

				completed += 1;

			}

			if(_eventTypeEl.value !== '') {

				completed += 1;

			}

			if(_eventHostEl.value !== '') {

				completed += 1;

			}

			if(_startDateEl.value !== '') {

				completed += 1;

			}

			if(_endDateEl.value !== '') {

				completed += 1;

			}

			if(VTILAPP.vtil.tags.length > 0) {

				completed += 1;

			}
			
			if(_streetNumberEl.value !== '') {

				completed += 1;

			}

			if(_cityEl.value !== '') {

				completed += 1;

			}
			
			if(_stateEl.value !== '') {

				completed += 1;

			}
			
			if(_postalCodeEl.value !== '') {

				completed += 1;

			}

			if(_countryEl.value !== '') {

				completed += 1;

			}

			if(_messageEl.value !== '') {

				completed += 1;

			}
			
			_progressBarLabelEl.innerHTML = 	completed.toString() + ' of 13 fields completed';
			_progressBarEl.value = 				completed;

		}

		/**
		 * Remove an event from events
		 * @function removeEvent
		 * @memberof EventPlanner
		 * @param  {string} id Dom id of event to remove
		 * @instance
		 * 
		 */
		removeEvent(id) {

			let index = -1;

			for(let i = 0; i < this.events.length; ++i) {

				if(id === this.events[i].id) {

					index = i;
					break;

				}

			}

			if(index !== -1) {

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
		geolocate() {

		  if (navigator.geolocation) {

		    navigator.geolocation.getCurrentPosition(function(position) {

		      let geolocation = {

		        lat: position.coords.latitude,
		        lng: position.coords.longitude

		      };

		      let circle = new google.maps.Circle({

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
		submitForm() {

			let d = new Date();

			this.events.push({

				'id': 		d.toISOString(),
				'title': 	_eventNameEl.value,
				'type': 	_eventTypeEl.value,
				'host': 	_eventHostEl.value,
				'begin': 	_startDateEl.value,
				'end': 		_endDateEl.value,
				'guests': 	_VTILAPP.vtil.tags,
				'address': 	_streetNumberEl.value,
				'city': 	_cityEl.value,
				'state': 	_stateEl.value,
				'zip': 		_postalCodeEl.value,
				'country': 	_countryEl.value,
				'message': 	_messageEl.value

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
		addTag() {

			VTILAPP.vtil.addTag();
			this.checkEventFields();

		}

	};

})(document);