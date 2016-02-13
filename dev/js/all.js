'use strict';

(function (document) {
	'use strict';

	window.APP = window.APP || {};
	window.VTILAPP = Object.create(null);

	// Register the callback to be fired every time auth state changes
	var ref = new Firebase("https://swanky-event-planner.firebaseIO.com");

	//signing in
	var signInEmailEl = document.getElementById('signin-email');
	var signInPasswordEl = document.getElementById('signin-password');
	var signInContainerEl = document.getElementById('signInContainer');
	var signOutLinkEl = document.getElementById('sign-out-link');
	var signInLinkEl = document.getElementById('sign-in-link');

	//signing up
	var signUpContainerEl = document.getElementById('signUpContainer');
	var eventPlannerContainerEl = document.getElementById('event-planner-container');
	var signupNameEl = document.getElementById('signup-name');
	var signupEmailEl = document.getElementById('signup-email');
	var signupPasswordEl = document.getElementById('signup-password');
	var signupPassword2El = document.getElementById('signup-password2');
	var signupEmployerEl = document.getElementById('signup-employer');
	var signupTitleEl = document.getElementById('signup-title');
	var signupBirthday = document.getElementById('signup-birthday');
	var submitPasswordButton = document.getElementById('submit-password-button');
	var signupAdditionalInfoEl = document.getElementById('signup-additional-info');
	var signupSwitchEl = document.getElementById('switch-1');

	//Reset Password
	var resetPasswordContainerEl = document.getElementById('reset-password-container');
	var resetPasswordEmail = document.getElementById('reset-password-email');

	//event creation
	var eventNameEl = document.getElementById('event-name');
	var eventTypeEl = document.getElementById('event-type');
	var eventHostEl = document.getElementById('event-host');
	var startDateEl = document.getElementById('start-date');
	var endDateEl = document.getElementById('end-date');
	var contentEl = document.getElementById('vtil-content');
	var inputEl = document.getElementById('vtil-input');
	var locationInputEl = document.getElementById('location-input');
	var streetNumberEl = document.getElementById('street-number');
	var routeEl = document.getElementById('route');
	var cityEl = document.getElementById('city');
	var stateEl = document.getElementById('state');
	var postalCodeEl = document.getElementById('postal-code');
	var countryEl = document.getElementById('country');
	var messageEl = document.getElementById('message');
	var addressList = [streetNumberEl, routeEl, cityEl, stateEl, postalCodeEl, countryEl];

	//event display
	var eventContainerEl = document.getElementById('event-container');
	var showEventContainerEl = document.getElementById('show-event-container');

	var events = []; //The users events
	var userRef = undefined; //Tag input list
	var eventRef = undefined; //Events
	var extraRef = undefined; //Extra user data
	var placeSearch = undefined; //Location search
	var autocomplete = undefined; //Location search
	var storeExtra = false; //Store extra user info

	//Validation
	var validator = new FV.Validator();
	var passwordField = new FV.Field("Password1", signupPasswordEl);
	var password2Field = new FV.Field("Password2", signupPassword2El, signupPasswordEl);

	passwordField.constraints = [new FV.Constraint(FV.Validator.MINLENGTH, "* Password must be at least 8 characters long.\n", 8), new FV.Constraint(FV.Validator.CONTAINSUPPER, "* Password must contain at least one upper case letter.\n"), new FV.Constraint(FV.Validator.CONTAINSLOWER, "* Password must contain at least one lower case letter.\n"), new FV.Constraint(FV.Validator.CONTAINSSPECIAL, "* Password must contain at least one special character (!, @, #, $, %, ^, &, *).\n")];

	password2Field.constraints = [new FV.Constraint(FV.Validator.EQUALSFIELD, "* Must match your password.\n")];

	validator.fields = [passwordField, password2Field];

	/******************************************************************
 Sign up functionality
 /******************************************************************
 	/**
  * User is signing up
  * 
  */
	APP.signUp = function () {

		ref.createUser({
			email: signupEmailEl.value,
			password: signupPasswordEl.value
		}, function (error, userData) {

			if (error) {

				console.log("Error creating user:", error);
			} else {

				storeExtra = true;

				APP.signIn(signupEmailEl.value, signupPasswordEl.value);
			}
		});
	};

	/**
  * Validating input before submitting the password
  * 
  */
	submitPasswordButton.onclick = function () {

		var errors = validator.checkForErrors();
		var passwordErrors = "";
		var password2Errors = "";

		errors.forEach(function (error) {

			switch (error.name) {

				case "Password1":

					passwordErrors += error.error;
					break;

				case "Password2":

					password2Errors += error.error;
					break;

			}
		});

		if (passwordErrors !== '') {

			passwordErrors = "Please correct the following errors:\n" + passwordErrors;
		}

		if (password2Errors !== '') {

			password2Errors = "Please correct the following errors:\n" + password2Errors;
		}

		//These will only display one at a time
		signupPasswordEl.setCustomValidity(passwordErrors);
		signupPassword2El.setCustomValidity(password2Errors);
	};

	/**
  * Show/hide additional info
  * 
  */
	APP.showAdditionalInfo = function () {

		signupAdditionalInfoEl.hidden = !signupSwitchEl.checked;
	};

	/******************************************************************
 Sign in functionality
 /******************************************************************
 	/**
  * User has signed in
  *
  */
	function authHandler(error, authData) {

		if (error) {

			//Handle the error

		} else if (!authData) {

				console.log("User is logged out");
			} else {

				userRef = ref.child('users/' + authData.uid);
				eventRef = userRef.child('events/');
				extraRef = userRef.child('extra/');

				//If just signing up store the extra user data
				if (storeExtra === true) {

					storeExtra = false;

					extraRef.set({

						name: signupNameEl.value,
						employer: signupEmployerEl.value,
						title: signupTitleEl.value,
						birthday: signupBirthday.value

					});
				}

				signOutLinkEl.hidden = false;
				signInLinkEl.hidden = true;

				APP.displayEventCreation();

				/**
     * Get the data
     * @param  {Object} snapshot value of the event
     */
				eventRef.on("value", function (snapshot) {

					events = snapshot.val();

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
		var password = passwordIn || signInPasswordEl.value;

		// Sign in with an email/password combination
		ref.authWithPassword({
			email: email,
			password: password
		}, authHandler);
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
		ref.unauth();
		eventRef.off();
		extraRef.off();
		userRef = undefined;
		eventRef = undefined;
		extraRef = undefined;
		signInEmailEl.value = '';
		signInPasswordEl.value = '';
		signupNameEl.value = '';
		signupEmailEl.value = '';
		signupPasswordEl.value = '';
		signupPassword2El.value = '';
		_clearElements();
		_clearEl(eventContainerEl);
		APP.showSignIn();
	};

	/******************************************************************
 Reset password functionality
 /******************************************************************
 	/**
  * Reset the users password
  * 
  */
	APP.resetPassword = function () {

		ref.resetPassword({
			email: ""
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

	/******************************************************************
 Event functionality
 /******************************************************************
 	/**
 * Instantiate a new vtil object
 * 
 **/
	VTILAPP.vtil = Object.create(VTIL.prototype, {

		contentElement: { writable: true, configurable: true, value: contentEl },
		inputElement: { writable: true, configurable: true, value: inputEl },
		objectPath: { writable: true, configurable: true, value: 'VTILAPP.vtil' }

	});

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
  * Display events if user has logged in
  * 
  */
	APP.displayEvents = function () {

		if (eventRef) {

			showEventContainer();
		}
	};

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

		events.forEach(function (event) {

			//Create the card
			var cardDiv = document.createElement('div');
			cardDiv.className = "card-width mdl-card mdl-shadow--2dp vert-cent animated slideInUp";

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
			eventContainerEl.appendChild(cardDiv);
		});
	}

	/**
  * Clear guests
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
  * @param  {Boolean} pred disable the field or not?
  * 
  */
	function _clearAddress(pred) {

		addressList.forEach(function (addressEl) {

			addressEl.value = '';
			addressEl.disabled = pred;
		});
	}

	/**
  * Clear the form elements
  * 
  */
	function _clearElements() {

		eventNameEl = document.getElementById('eventName');
		eventTypeEl = document.getElementById('eventType');
		eventHostEl = document.getElementById('eventHost');
		startDateEl = document.getElementById('startDate');
		endDateEl = document.getElementById('endDate');
		locationInputEl = document.getElementById('location-input');

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
						streetNumberEl.value = component.short_name;
						break;

					//Address2
					case 'route':
						routeEl.value = component.short_name;
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
  * Initializes the autocomplete object using the location
  * 
  */
	APP.initAutocomplete = function () {
		// Create the autocomplete object, restricting the search to geographical
		// location types.
		autocomplete = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */locationInputEl, { types: ['geocode'] });

		// When the user selects an address from the dropdown, populate the address
		// fields in the form.
		autocomplete.addListener('place_changed', _fillInAddress);
	};

	/**
  * Get the location
  * 
  */
	APP.geolocate = function () {

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

				autocomplete.setBounds(circle.getBounds());
			});
		}
	};

	/**
  * Remove an event from events
  * @param  {[type]} id [description]
  * @return {[type]}    [description]
  */
	APP.removeEvent = function (id) {

		var index = -1;

		for (var i = 0; i < events.length; ++i) {

			if (id === events[i].id) {

				index = i;
				break;
			}
		}

		if (index !== -1) {

			events = events.splice(index, 1);
			eventRef.set(events);
		}
	};

	/**
  * Save the event
  *
  */
	APP.submitForm = function () {

		var d = new Date();

		events.push({

			'id': d.toISOString(),
			'title': eventNameEl.value,
			'type': eventTypeEl.value,
			'host': eventHostEl.value,
			'begin': startDateEl.value,
			'end': endDateEl.value,
			'guests': VTILAPP.vtil.tags,
			'address': streetNumberEl.value + ' ' + routeEl.value,
			'city': cityEl.value,
			'state': stateEl.value,
			'zip': postalCodeEl.value,
			'country': countryEl.value,
			'message': messageEl.value

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
	APP.showSignUp = function () {

		signInContainerEl.hidden = true;
		eventPlannerContainerEl.hidden = true;
		signUpContainerEl.hidden = false;
		resetPasswordContainerEl.hidden = true;
		showEventContainerEl.hidden = true;
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
