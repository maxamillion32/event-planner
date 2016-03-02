'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var ShowEvents = function (document) {
	'use strict';

	var _noEventsContainerEl = document.getElementById('no-events-container');

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

		if (Object.keys(events).length === 0) {

			_noEventsContainerEl.hidden = false;
		} else {

			_noEventsContainerEl.hidden = true;

			Object.keys(events).forEach(function (prop) {

				//Create the card
				var cardDiv = document.createElement('div');
				cardDiv.className = "card-width mdl-card mdl-shadow--2dp vert-cent animated slideInDown";

				//Card Title
				var cardTitleDiv = document.createElement('div');
				cardTitleDiv.className = "mdl-card__title";
				var headerDiv = document.createElement('h2');
				headerDiv.className = "mdl-card__title-text";
				headerDiv.appendChild(document.createTextNode(events[prop].title));

				var del = document.createElement('a');
				del.setAttribute('href', "#");
				del.setAttribute('title', "Delete");
				del.className = "card-trash";
				del.setAttribute('onclick', 'app.showEvents.removeEvent("' + prop + '")');
				del.innerHTML = '<i class="fa fa-trash-o"></i>';

				headerDiv.appendChild(del);
				cardTitleDiv.appendChild(headerDiv);
				cardDiv.appendChild(cardTitleDiv);

				//Card Body
				var cardContentDiv = document.createElement('div');
				cardContentDiv.className = "mdl-card__supporting-text";
				var p = document.createElement('p');
				p.className = 'event-content';
				p.innerHTML = "<b>" + events[prop].host + '</b> is hosting a ' + '<b>' + events[prop].type + '</b> at ';
				cardContentDiv.appendChild(p);

				p = document.createElement('p');
				p.className = 'event-content';
				p.innerHTML = events[prop].address + '<br />' + events[prop].city + ', ' + events[prop].state + ' ' + events[prop].zip + '<br />' + events[prop].country;
				cardContentDiv.appendChild(p);

				p = document.createElement('p');
				p.className = 'event-content';
				p.appendChild(document.createTextNode("on"));
				cardContentDiv.appendChild(p);

				p = document.createElement('p');
				p.className = 'event-content';
				var begin = new Date(events[prop].begin);
				var end = new Date(events[prop].end);
				p.innerHTML = '<b>' + begin.toLocaleString() + '</b>' + ' to ' + '<b>' + end.toLocaleString() + '</b>';
				cardContentDiv.appendChild(p);

				p = document.createElement('p');
				p.className = 'event-content';
				var guestlist = 'Everybody who\'s anybody is going including ';
				events[prop].guests.forEach(function (guest) {

					guestlist += '<b>' + guest.value + '</b> ';
				});
				p.innerHTML = guestlist;
				cardContentDiv.appendChild(p);

				p = document.createElement('p');
				p.className = 'event-content';
				p.innerHTML = 'and <b>' + events[prop].host + '</b> wishes to let you know that<br/>' + events[prop].message;
				cardContentDiv.appendChild(p);

				cardDiv.appendChild(cardContentDiv);
				Displayer.eventContainerEl.appendChild(cardDiv);
			});
		}
	}

	/**
  * Handle the fb error
  * @param  {object} err fb error
  * 
  */
	function _handleError(err) {

		Displayer.showSnackbar('We totally failed to retrieve the event data. :-(');
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
          * @type {object}
          */
			this.events = events || {};

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
				var _this = this;

				var data = snapshot.val();

				if (data !== null) {

					Object.keys(data).forEach(function (key) {

						if (data.hasOwnProperty(key)) {

							_this.events[key] = data[key];
						}
					});
				}

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
    * Remove an event from events
    * @function removeEvent
    * @memberof ShowEvents
    * @param  {string} id of event to remove
    * @instance
    * 
    */

		}, {
			key: 'removeEvent',
			value: function removeEvent(id) {

				var eventsCopy = Object.assign({}, this.events);

				this.events = {};

				var fbDel = this.eventRef.child(id);

				fbDel.remove(function (err) {

					if (err) {

						Displayer.showSnackbar('Sorry, we had an error removing the event. :-(');

						this.events = eventsCopy;

						_redrawEvents(this.events);
					}
				}.bind(this));
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