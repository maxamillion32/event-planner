(function() {
	'use strict';

	var APP = window.APP || {};

	/**
	* Instantiate a new vtil object
	* 
	**/ 
	VTILAPP.vtil = new VTIL(APP.contentEl, APP.inputEl, 'VTILAPP.vtil');

	/**
	 * Checks if fields are completed
	 * 
	 */
	APP.checkEventFields = function() {

		let completed = 0;

		if(APP.eventNameEl.value !== '') {

			completed += 1;

		}

		if(APP.eventTypeEl.value !== '') {

			completed += 1;

		}

		if(APP.eventHostEl.value !== '') {

			completed += 1;

		}

		if(APP.startDateEl.value !== '') {

			completed += 1;

		}

		if(APP.endDateEl.value !== '') {

			completed += 1;

		}

		if(VTILAPP.vtil.tags.length > 0) {

			completed += 1;

		}
		
		if(APP.streetNumberEl.value !== '') {

			completed += 1;

		}

		if(APP.cityEl.value !== '') {

			completed += 1;

		}
		
		if(APP.stateEl.value !== '') {

			completed += 1;

		}
		
		if(APP.postalCodeEl.value !== '') {

			completed += 1;

		}

		if(APP.countryEl.value !== '') {

			completed += 1;

		}

		if(APP.messageEl.value !== '') {

			completed += 1;

		}
		
		APP.fieldsCompleted = 				completed;
		APP.progressBarLabelEl.innerHTML = 	APP.fieldsCompleted.toString() + ' of 13 fields completed'
		APP.progressBarEl.value = 			APP.fieldsCompleted;

	};

	/**
	 * Clear guests
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
	 * @param  {Boolean} pred disable the field or not?
	 * 
	 */
	function _clearAddress(pred) {

		APP.addressList.forEach(function(addressEl) {

			APP.addressEl.value = 		'';
			APP.addressEl.disabled = 	pred;

		});

	}

	/**
	 * Fills in the address when the location is retrieved
	 * 
	 */
	function _fillInAddress() {
	  // Get the place details from the autocomplete object.
	  let place = APP.autocomplete.getPlace();

	  _clearAddress(false);

	  // Get each component of the address from the place details
	  // and fill the corresponding field on the form.
	  for (let component of place.address_components) {

	    let addressType = component.types[0];

	    switch(addressType) {

	    	//Address1
	    	case 'street_number':
	    		APP.streetNumberEl.value = component.short_name;
	    		break;

	    	//Address2
	    	case 'route':
	    		APP.streetNumberEl.value += ' ' + component.short_name;
	    		break;

	    	//City
	    	case 'locality':
	    		APP.cityEl.value = component.short_name;
	    		break;

	    	//State
	    	case 'administrative_area_level_1':
	    		APP.stateEl.value = component.short_name;
	    		break;

	    	//Zip
	    	case 'postal_code':
	    		APP.postalCodeEl.value = component.short_name;
	    		break;

	    	//Country
	    	case 'country':
	    		APP.countryEl.value = component.short_name;
	    		break;

	    }

	  }

	}

	/**
	 * Initializes the autocomplete object using the location
	 * 
	 */
	APP.initAutocomplete = function() {
	  // Create the autocomplete object, restricting the search to geographical
	  // location types.
	  APP.autocomplete = new google.maps.places.Autocomplete(
	      /** @type {!HTMLInputElement} */(APP.locationInputEl),
	      {types: ['geocode']});

	  // When the user selects an address from the dropdown, populate the address
	  // fields in the form.
	  APP.autocomplete.addListener('place_changed', _fillInAddress);
	};

	/**
	 * Get the location
	 * 
	 */
	APP.geolocate = function() {

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

	      APP.autocomplete.setBounds(circle.getBounds());

	    });

	  }

	};

	/**
	 * Remove an event from events
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	APP.removeEvent = function(id) {

		let index = -1;

		for(let i = 0; i < APP.events.length; ++i) {

			if(id === APP.events[i].id) {

				index = i;
				break;

			}

		}

		if(index !== -1) {

			APP.events = APP.events.splice(index, 1);
			APP.eventRef.set(APP.events);

		}

	};

	/**
	 * Save the event
	 *
	 */
	APP.submitForm = function() {

		let d = new Date();

		APP.events.push({

			'id': 		d.toISOString(),
			'title': 	APP.eventNameEl.value,
			'type': 	APP.eventTypeEl.value,
			'host': 	APP.eventHostEl.value,
			'begin': 	APP.startDateEl.value,
			'end': 		APP.endDateEl.value,
			'guests': 	VTILAPP.vtil.tags,
			'address': 	APP.streetNumberEl.value,
			'city': 	APP.cityEl.value,
			'state': 	APP.stateEl.value,
			'zip': 		APP.postalCodeEl.value,
			'country': 	APP.countryEl.value,
			'message': 	APP.messageEl.value

		});

		APP.eventRef.set(APP.events);

		APP.clearElements();

	};

})();