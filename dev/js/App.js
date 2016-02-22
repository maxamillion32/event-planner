"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */
(function (document) {
	'use strict';

	/**
  * App
  * @class App
  * @description Starting point for the event planner application
  * 
  */

	var App = function () {

		/**
      * App constructor.
      * @constructs App
      */

		function App() {
			_classCallCheck(this, App);

			// Register the callback to be fired every time auth state changes
			var fbRef = new Firebase("https://swanky-event-planner.firebaseIO.com");

			this.signInOut = new SignInOut(fbRef);
			this.eventPlanner = new EventPlanner();
			this.resetPassword = new ResetPassword(fbRef);
			this.showEvents = new ShowEvents();
			this.signUp = new SignUp(fbRef);

			// Fired after the user signs up
			document.addEventListener("signed-up", function () {

				this.signInOut.signIn(this.signUp.signupEmailEl.value, this.signUp.signupPasswordEl.value);
			}.bind(this));

			// Fired after user signs in
			document.addEventListener("signed-in", function () {

				this.eventPlanner.eventRef = this.signInOut.eventRef;
				this.showEvents.eventRef = this.signInOut.eventRef;
			}.bind(this));

			/**
    * Sign out on exit
    * 
    */
			window.onbeforeunload = function () {

				this.signInOut.signOut();
				document.removeEventListener('signed-out');
			};
		}

		/**
   * Remove the registered events
   *  @function removeEvents
   * 	@memberof App
   *  @instance
   *
   */


		_createClass(App, [{
			key: "removeEvents",
			value: function removeEvents() {

				document.removeEventListener('signed-up');
				document.removeEventListener('signed-in');
				window.onbeforeunload = undefined;
			}
		}]);

		return App;
	}();

	// Fired after user signs out


	document.addEventListener("signed-out", function () {

		app.removeEvents();
		app = new App();
	}.bind(this));

	window.app = new App();
})(document);