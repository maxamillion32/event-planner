(function() {
	'use strict';

	var APP = window.APP || Object.create(null);

	let eventNameEl = 			document.getElementById('event-name');
	let eventTypeEl = 			document.getElementById('event-type');
	let eventHostEl = 			document.getElementById('event-host');
	let startDateEl = 			document.getElementById('start-date');
	let endDateEl =				document.getElementById('end-date');
	let contentEl = 			document.getElementById('vtil-content');
	let inputEl = 				document.getElementById('vtil-input');
	let locationInputEl	=		document.getElementById('location-input');
	let streetNumberEl =		document.getElementById('street-number');
	let cityEl =				document.getElementById('city');
	let stateEl =				document.getElementById('state');
	let postalCodeEl =			document.getElementById('postal-code');
	let countryEl =				document.getElementById('country');
	let messageEl =				document.getElementById('message');
	let progressBarEl =			document.getElementById('progress-bar');
	let progressBarLabelEl =	document.getElementById('progress-bar-label');
	let addressList = [streetNumberEl, cityEl, stateEl, postalCodeEl, countryEl];
	let autocomplete;			//Location search
	let fieldsCompleted = 0;	//Fields filled out

	/**
	* Instantiate a new vtil object
	* 
	**/ 
	VTILAPP.vtil = new VTIL(contentEl, inputEl, 'VTILAPP.vtil');

	/**
	 * Checks if fields are completed
	 * 
	 */
	APP.checkEventFields = function() {

		let completed = 0;

		if(eventNameEl.value !== '') {

			completed += 1;

		}

		if(eventTypeEl.value !== '') {

			completed += 1;

		}

		if(eventHostEl.value !== '') {

			completed += 1;

		}

		if(startDateEl.value !== '') {

			completed += 1;

		}

		if(endDateEl.value !== '') {

			completed += 1;

		}

		if(VTILAPP.vtil.tags.length > 0) {

			completed += 1;

		}
		
		if(streetNumberEl.value !== '') {

			completed += 1;

		}

		if(cityEl.value !== '') {

			completed += 1;

		}
		
		if(stateEl.value !== '') {

			completed += 1;

		}
		
		if(postalCodeEl.value !== '') {

			completed += 1;

		}

		if(countryEl.value !== '') {

			completed += 1;

		}

		if(messageEl.value !== '') {

			completed += 1;

		}
		
		fieldsCompleted = 				completed;
		progressBarLabelEl.innerHTML = 	fieldsCompleted.toString() + ' of 13 fields completed'
		progressBarEl.value = 			fieldsCompleted;

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

		addressList.forEach(function(addressEl) {

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
	  let place = autocomplete.getPlace();

	  _clearAddress(false);

	  // Get each component of the address from the place details
	  // and fill the corresponding field on the form.
	  for (let component of place.address_components) {

	    let addressType = component.types[0];

	    switch(addressType) {

	    	//Address1
	    	case 'street_number':
	    		streetNumberEl.value = component.short_name;
	    		break;

	    	//Address2
	    	case 'route':
	    		streetNumberEl.value += ' ' + component.short_name;
	    		break;

	    	//City
	    	case 'locality':
	    		cityEl.value = component.short_name;
	    		break;

	    	//State
	    	case 'administrative_area_level_1':
	    		stateEl.value = component.short_name;
	    		break;

	    	//Zip
	    	case 'postal_code':
	    		postalCodeEl.value = component.short_name;
	    		break;

	    	//Country
	    	case 'country':
	    		countryEl.value = component.short_name;
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
	  autocomplete = new google.maps.places.Autocomplete(
	      /** @type {!HTMLInputElement} */(locationInputEl),
	      {types: ['geocode']});

	  // When the user selects an address from the dropdown, populate the address
	  // fields in the form.
	  autocomplete.addListener('place_changed', _fillInAddress);
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

	      autocomplete.setBounds(circle.getBounds());

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
			'title': 	eventNameEl.value,
			'type': 	eventTypeEl.value,
			'host': 	eventHostEl.value,
			'begin': 	startDateEl.value,
			'end': 		endDateEl.value,
			'guests': 	VTILAPP.vtil.tags,
			'address': 	streetNumberEl.value,
			'city': 	cityEl.value,
			'state': 	stateEl.value,
			'zip': 		postalCodeEl.value,
			'country': 	countryEl.value,
			'message': 	messageEl.value

		});

		APP.eventRef.set(APP.events);

		APP.clearElements();

	};

})();