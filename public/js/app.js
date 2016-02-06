(function(document) {
	'use strict';

	window.APP = window.APP || {};
	window.VTILAPP = Object.create(null);

	// Register the callback to be fired every time auth state changes
	var ref = new Firebase("https://swanky-event-planner.firebaseIO.com");

	//signing in
	var signInEmailEl = 			document.getElementById('signinEmail');
	var signInPasswordEl = 			document.getElementById('signinPassword');
	var signInContainerEl = 		document.getElementById('signInContainer');

	//signing up
	var signUpContainerEl = 		document.getElementById('signUpContainer');
	var eventPlannerContainerEl = 	document.getElementById('eventPlannerContainer');
	var signupNameEl = 				document.getElementById('signupName');
	var signupEmailEl = 			document.getElementById('signupEmail');
	var signupPasswordEl = 			document.getElementById('signupPassword');
	var signupPassword2El = 		document.getElementById('signupPassword2');

	//Reset Password
	var resetPasswordContainerEl =	document.getElementById('resetPasswordContainer');

	//event creation
	var eventNameEl =				document.getElementById('eventName');
	var eventTypeEl =				document.getElementById('eventType');
	var eventHostEl =				document.getElementById('eventHost');
	var startDateEl =				document.getElementById('startDate');
	var endDateEl =					document.getElementById('endDate');
	var contentEl = 				document.getElementById('vtil-content');
	var inputEl = 					document.getElementById('vtil-input');
	var locationInputEl	=			document.getElementById('location-input');
	var streetNumberEl =			document.getElementById('street_number');
	var routeEl =					document.getElementById('route');
	var cityEl =					document.getElementById('city');
	var stateEl =					document.getElementById('state');
	var postalCodeEl =				document.getElementById('postal-code');
	var countryEl =					document.getElementById('country');
	var messageEl =					document.getElementById('message');
	var addressList = [streetNumberEl, routeEl, cityEl, stateEl, postalCodeEl, countryEl];

	//event display
	var eventContainerEl =			document.getElementById('event-container');

	var events = [];	//The users events
	var userRef;		//Tag input list
	var eventRef;		//Events
	var placeSearch;	//Location search
	var autocomplete;	//Location search

	/******************************************************************
	Sign up functionality
	/******************************************************************

	/**
	 * User is signing up
	 * 
	 */
	APP.signUp = function() {

		ref.createUser({
		  email    : signupEmailEl.value,
		  password : signupPasswordEl.value
		}, function(error, userData) {

		  if (error) {

		    console.log("Error creating user:", error);

		  } else {

		    APP.signIn(signupEmailEl.value, signupPasswordEl.value);

		  }
		  
		});

	};

	/******************************************************************
	Sign in functionality
	/******************************************************************

	/**
	 * User has signed in
	 *
	 */
	function authHandler (error, authData) {

		if(error) {

			//Handle the error

		} else if (!authData) {

			console.log("User is logged out");

		} else {

			userRef = ref.child('users/' + authData.uid);
			eventRef = userRef.child('events/');

			APP.showEventPlanner();

			/**
			 * Get the data
			 * @param  {Object} snapshot value of the event
			 */
			eventRef.on("value", function(snapshot) {

			  events = snapshot.val();

			  _redrawEvents();
			  
			}, function(err) {

				console.log('Error: ', err);

			});

		}

	}

	/**
	 * User is signing in
	 * 
	 */
	APP.signIn = function(emailIn, passwordIn) {

		var email = emailIn || signInEmailEl.value;
		var password = passwordIn || signInPasswordEl.value;

		// Sign in with an email/password combination
		ref.authWithPassword({
		  email    : email ,
		  password : password
		}, authHandler);

	};

	/******************************************************************
	Sign out functionality
	/******************************************************************

	/**
	 * User is signing out
	 * 
	 */
	APP.signOut = function() {

		ref.unauth();
		eventRef.off();
		userRef = undefined;
		eventRef = undefined;
		signInEmailEl = 			'';
		signInPasswordEl = 			'';
		signupNameEl = 				'';
		signupEmailEl = 			'';
		signupPasswordEl = 			'';
		signupPassword2El = 		'';
		_clearElements();
		_clearEl(eventContainerEl);

	};

	/******************************************************************
	Reset password functionality
	/******************************************************************

	/**
	 * Reset the users password
	 * 
	 */
	APP.resetPassword = function() {

		ref.resetPassword({
		  email: ""
		}, function(error) {
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

	/******************************************************************
	Event functionality
	/******************************************************************

	/**
	* Instantiate a new vtil object
	* 
	**/ 
	VTILAPP.vtil = Object.create(VTIL.prototype, {

		contentElement: { writable: true,  configurable:true, value: contentEl },
		inputElement: { writable: true,  configurable:true, value: inputEl },
		objectPath: { writable: true,  configurable:true, value: 'VTILAPP.vtil' }

	});

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
	function _redrawEvents() {

		_clearEl(eventContainerEl);

		events.forEach(function(event) {

			//Create the card
			var cardDiv = document.createElement('div');
			cardDiv.className = "card-width mdl-card mdl-shadow--2dp vert-cent animated slideInUp"

			//Card Title
			var cardTitleDiv = document.createElement('div');
			cardTitleDiv.className = "mdl-card__title";
			var headerDiv = document.createElement('h2');
			headerDiv.className = "mdl-card__title-text";
			headerDiv.appendChild(document.createTextNode(event.title));
			cardTitleDiv.appendChild(headerDiv);
			cardDiv.appendChild(cardTitleDiv);

			//Card Body
			var cardContentDiv = document.createElement('div');
			cardContentDiv.className = "mdl-card__supporting-text";
			var p = document.createElement('p');
			p.innerHTML = "<b>" + event.host + '</b> is hosting a ' + '<b>' + 
			event.type + '</b> at ';
			cardContentDiv.appendChild(p);

			p = document.createElement('p');
			p.innerHTML = event.address + '<br />' + event.city + ', ' + 
			event.state + ' ' + event.zip + '<br />' + event.country;
			cardContentDiv.appendChild(p);

			p = document.createElement('p');
			p.appendChild(document.createTextNode("on"));
			cardContentDiv.appendChild(p);

			p = document.createElement('p');
			var begin = new Date(event.begin);
			var end = new Date(event.end);
			p.innerHTML = '<b>' + begin.toLocaleString() + '</b>' + ' to ' + 
			'<b>' + end.toLocaleString() + '</b>';
			cardContentDiv.appendChild(p);

			p = document.createElement('p');
			p.innerHTML = 'and <b>' + event.host + '</b> wishes to let you know that<br/>' + event.message;
			cardContentDiv.appendChild(p);

			cardDiv.appendChild(cardContentDiv);
			eventContainerEl.appendChild(cardDiv);

		});

	}
 
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

		  	addressEl.value = '';
		  	addressEl.disabled = pred;

		  });

	}

	/**
	 * Clear the form elements
	 * 
	 */
	function _clearElements() {

		eventNameEl =				document.getElementById('eventName');
		eventTypeEl =				document.getElementById('eventType');
		eventHostEl =				document.getElementById('eventHost');
		startDateEl =				document.getElementById('startDate');
		endDateEl =					document.getElementById('endDate');
		locationInputEl	=			document.getElementById('location-input');

		_clearAddress(true);
		_clearGuests();

	}

	/**
	 * Fills in the address when the location is retrieved
	 * 
	 */
	function _fillInAddress() {
	  // Get the place details from the autocomplete object.
	  var place = autocomplete.getPlace();

	  _clearAddress(false);

	  // Get each component of the address from the place details
	  // and fill the corresponding field on the form.
	  for (var i = 0; i < place.address_components.length; i++) {

	    var addressType = place.address_components[i].types[0];

	    switch(addressType) {

	    	//Address1
	    	case 'street_number':
	    		streetNumberEl.value = place.address_components[i].short_name;
	    		break;

	    	//Address2
	    	case 'route':
	    		routeEl.value = place.address_components[i].short_name;
	    		break;

	    	//City
	    	case 'locality':
	    		cityEl.value = place.address_components[i].short_name;
	    		break;

	    	//State
	    	case 'administrative_area_level_1':
	    		stateEl.value = place.address_components[i].short_name;
	    		break;

	    	//Zip
	    	case 'postal_code':
	    		postalCodeEl.value = place.address_components[i].short_name;
	    		break;

	    	//Country
	    	case 'country':
	    		countryEl.value = place.address_components[i].short_name;
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

	      var geolocation = {

	        lat: position.coords.latitude,
	        lng: position.coords.longitude

	      };

	      var circle = new google.maps.Circle({

	        center: geolocation,
	        radius: position.coords.accuracy

	      });

	      autocomplete.setBounds(circle.getBounds());

	    });

	  }

	};

	/**
	 * Save the event
	 *
	 */
	APP.submitForm = function() {

		var d = new Date();

		events.push({

			'id': 		d.toISOString(),
			'title': 	eventNameEl.value,
			'type': 	eventTypeEl.value,
			'host': 	eventHostEl.value,
			'begin': 	startDateEl.value,
			'end': 		endDateEl.value,
			'guests': 	VTILAPP.vtil.tags,
			'address': 	streetNumberEl.value + ' ' + routeEl.value,
			'city': 	cityEl.value,
			'state': 	stateEl.value,
			'zip': 		postalCodeEl.value,
			'country': 	countryEl.value,
			'message': 	messageEl.value

		});

		eventRef.set(events);

		_clearElements();

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
	APP.showSignUp = function() {

		signInContainerEl.hidden = true;
		eventPlannerContainerEl.hidden = true;
		signUpContainerEl.hidden = false;

	};

	/**
	 * Show the sign in form
	 * 
	 */
	APP.showSignIn = function() {

		signInContainerEl.hidden = false;
		eventPlannerContainerEl.hidden = true;
		signUpContainerEl.hidden = true;

	};

	/**
	 * Show the event planner
	 * 
	 */
	APP.showEventPlanner = function() {

		signInContainerEl.hidden = true;
		eventPlannerContainerEl.hidden = false;
		signUpContainerEl.hidden = true;

	};

})(document);