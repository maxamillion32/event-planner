/*jshint esversion: 6 */

var ShowEvents = (function(document) {
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

		events.forEach(event => {

			//Create the card
			let cardDiv = document.createElement('div');
			cardDiv.className = "card-width mdl-card mdl-shadow--2dp vert-cent animated slideInDown";

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
			Displayer.eventContainerEl.appendChild(cardDiv);

		});

	}
	
	/**
	 * Handle the fb error
	 * @param  {object} err fb error
	 * 
	 */
	function _handleError(err) {

		console.log('Error: ', err);

	}

	/**
	 * Represents a ShowEvents Page
	 * @class ShowEvents
	 * 
	 */
	return class ShowEvents {

		/**
	     * ShowEvents constructor.
	     * @constructs ShowEvents
	     * @param {array} events events to display
	     * @param {object} eventRef Firebase reference to the events route
	     */
		constructor(events, eventRef) {

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

			if(this.eventRef) {

				this.listenForEvents();

			}

		}

		/**
		 * Add events to the screen
		 * @function _addEvents
		 * @param {object} snapshot fb event data
		 * @private
		 * @instance
		 * 
		 */
		_addEvents(snapshot) {

			this.events = snapshot.val();

			_redrawEvents(this.events);

		}

		/**
		 * Listen for new event data
		 * @function listenForEvents
		 * @memberof ShowEvents#eventRef
		 * @instance
		 * 
		 */
		listenForEvents() {

			/**
			 * Get the data
			 * @param  {Object} snapshot value of the event
			 */
			try {

				this.eventRef.on("value", this._addEvents.bind(this), _handleError);

			} catch(e) {

				//Sometimes we end up here signing out

			}

		}

		/**
		 * Turn off the event fb listener
		 * @function dispose
		 * @memberof ShowEvents#dispose
		 * @instance
		 * 
		 */
		dispose() {

			this.eventRef.off("value", this._addEvents.bind(this), _handleError);
			this.events = [];
			_redrawEvents(this.events);
			this.eventRef = undefined;

		}

	};

})(document);