'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var ShowEvents = function (document) {
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
			p.className = 'event-content';
			p.innerHTML = "<b>" + event.host + '</b> is hosting a ' + '<b>' + event.type + '</b> at ';
			cardContentDiv.appendChild(p);

			p = document.createElement('p');
			p.className = 'event-content';
			p.innerHTML = event.address + '<br />' + event.city + ', ' + event.state + ' ' + event.zip + '<br />' + event.country;
			cardContentDiv.appendChild(p);

			p = document.createElement('p');
			p.className = 'event-content';
			p.appendChild(document.createTextNode("on"));
			cardContentDiv.appendChild(p);

			p = document.createElement('p');
			p.className = 'event-content';
			var begin = new Date(event.begin);
			var end = new Date(event.end);
			p.innerHTML = '<b>' + begin.toLocaleString() + '</b>' + ' to ' + '<b>' + end.toLocaleString() + '</b>';
			cardContentDiv.appendChild(p);

			p = document.createElement('p');
			p.className = 'event-content';
			var guestlist = 'Everybody who\'s anybody is going including ';
			event.guests.forEach(function (guest) {

				guestlist += '<b>' + guest.value + '</b> ';
			});
			p.innerHTML = guestlist;
			cardContentDiv.appendChild(p);

			p = document.createElement('p');
			p.className = 'event-content';
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
	return function () {

		/**
      * ShowEvents constructor.
      * @constructs ShowEvents
      * @param {array} events events to display
      * @param {object} eventRef Firebase reference to the events route
      */

		function ShowEvents(events, eventRef) {
			_classCallCheck(this, ShowEvents);

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

			if (this.eventRef) {

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


		_createClass(ShowEvents, [{
			key: '_addEvents',
			value: function _addEvents(snapshot) {

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

		}, {
			key: 'listenForEvents',
			value: function listenForEvents() {

				/**
     * Get the data
     * @param  {Object} snapshot value of the event
     */
				try {

					this.eventRef.on("value", this._addEvents.bind(this), _handleError);
				} catch (e) {

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

		}, {
			key: 'dispose',
			value: function dispose() {

				this.eventRef.off("value", this._addEvents.bind(this), _handleError);
				this.events = [];
				_redrawEvents(this.events);
				this.eventRef = undefined;
			}
		}]);

		return ShowEvents;
	}();
}(document);