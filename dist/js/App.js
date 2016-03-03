"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,n){for(var s=0;s<n.length;s++){var t=n[s];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,s,t){return s&&e(n.prototype,s),t&&e(n,t),n}}();!function(e){var n=function(){function n(){_classCallCheck(this,n);var s=new Firebase("https://swanky-event-planner.firebaseIO.com");this.signInOut=new SignInOut(s),this.eventPlanner=new EventPlanner,this.resetPassword=new ResetPassword(s),this.showEvents=new ShowEvents,this.signUp=new SignUp(s),this.userInfo=new UserInfo,this.resetPassword=new ResetPassword(s),SignInOut.validateSignIn(),ResetPassword.validateResetPassword(),e.addEventListener("signed-up",function(){this.signInOut.signIn(SignUp.signupEmailEl.value,SignUp.signupPasswordEl.value)}.bind(this)),e.addEventListener("signed-in",function(){this.eventPlanner.eventRef=this.signInOut.eventRef,this.showEvents.eventRef=this.signInOut.eventRef,this.userInfo.extraRef=this.signInOut.extraRef,this.userInfo.ref=s,this.userInfo.email=this.signInOut.email,this.showEvents.listenForEvents(),this.userInfo.listenForData()}.bind(this)),window.onbeforeunload=function(){this.signInOut.signOut(),e.removeEventListener("signed-out")}}return _createClass(n,[{key:"removeEvents",value:function(){e.removeEventListener("signed-up"),e.removeEventListener("signed-in"),window.onbeforeunload=void 0}},{key:"displayEventCreation",value:function(){this.eventPlanner.eventRef?Displayer.showEventPlanner():Displayer.showSnackbar("Sorry but you must be signed in to do that!  :-(")}},{key:"displayUserInfo",value:function(){this.eventPlanner.eventRef?Displayer.showUserInfo():Displayer.showSnackbar("Sorry but you must be signed in to do that!  :-(")}},{key:"displayEvents",value:function(){this.eventPlanner.eventRef?Displayer.showEventContainer():Displayer.showSnackbar("Sorry but you must be signed in to do that!  :-(")}}]),n}();e.addEventListener("signed-out",function(){app.removeEvents(),app.showEvents.dispose(),app.userInfo.dispose(),app.eventPlanner.dispose(),app.resetPassword.dispose(),app.signUp.dispose(),window.app=new n}.bind(this)),window.addEventListener("load",function(e){Displayer.loadingEl.hidden=!0,Displayer.contentEl.hidden=!1}),window.app=new n}(document);