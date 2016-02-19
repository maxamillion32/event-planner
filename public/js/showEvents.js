(function(document) {
	'use strict';

	var APP = window.APP || {};

	/******************************************************************
	Event functionality
	/******************************************************************

	/**
	 * Display events if user has logged in
	 * 
	 */
	APP.displayEvents = function() {

		if(eventRef) {

			APP.showEventContainer();

		}

	};

	/**
	 * Draw the events to te screen
	 * 
	 */
	function _redrawEvents() {

		APP.clearEl(APP.eventContainerEl);

		events.forEach(function(event) {

			//Create the card
			let cardDiv = document.createElement('div');
			cardDiv.className = "card-width mdl-card mdl-shadow--2dp vert-cent animated slideInDown"

			//Card Title
			let cardTitleDiv = document.createElement('div');
			cardTitleDiv.className = "mdl-card__title";
			let headerDiv = document.createElement('h2');
			headerDiv.className = "mdl-card__title-text";
			headerDiv.appendChild(document.createTextNode(event.title));

			let del = document.createElement('a');
			del.setAttribute('href', "#");
			del.setAttribute('title', "Delete");
			del.className = "card-trash";
			del.setAttribute('onclick', 'APP.removeEvent("' + event.id + '")');
			del.innerHTML = '<i class="fa fa-trash-o"></i>';

			headerDiv.appendChild(del);
			cardTitleDiv.appendChild(headerDiv);
			cardDiv.appendChild(cardTitleDiv);

			//Card Body
			let cardContentDiv = document.createElement('div');
			cardContentDiv.className = "mdl-card__supporting-text";
			let p = document.createElement('p');
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
			let begin = new Date(event.begin);
			let end = new Date(event.end);
			p.innerHTML = '<b>' + begin.toLocaleString() + '</b>' + ' to ' + 
			'<b>' + end.toLocaleString() + '</b>';
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
	APP.addTag = function() {

		VTILAPP.vtil.addTag();
		APP.checkEventFields();

	};

})(document);