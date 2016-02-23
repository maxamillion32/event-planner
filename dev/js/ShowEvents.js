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
			Displayer.eventContainerEl.appendChild(cardDiv);
		});
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
   * @function listenForEvents
   * @memberof ShowEvents#eventRef
   * @instance
   * 
   */


		_createClass(ShowEvents, [{
			key: 'listenForEvents',
			value: function listenForEvents() {

				/**
     * Get the data
     * @param  {Object} snapshot value of the event
     */
				this.eventRef.on("value", function (snapshot) {

					this.events = snapshot.val();

					_redrawEvents(this.events);
				}.bind(this), function (err) {

					console.log('Error: ', err);
				});
			}
		}]);

		return ShowEvents;
	}();
}(document);