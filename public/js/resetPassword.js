(function() {
	'use strict';

	var APP = window.APP || Object.create(null);

	let resetPasswordEmail =		document.getElementById('reset-password-email');

	/******************************************************************
	Reset password functionality
	/******************************************************************

	/**
	 * Reset the users password
	 * 
	 */
	APP.resetPassword = function() {

		APP.ref.resetPassword({
		  email: resetPasswordEmail.value
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

})();