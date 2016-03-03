"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,n){for(var i=0;i<n.length;i++){var t=n[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,i,t){return i&&e(n.prototype,i),t&&e(n,t),n}}(),SignInOut=function(e){var n=e.getElementById("signin-email"),i=e.getElementById("signin-password"),t=e.getElementById("sign-out-link"),s=e.getElementById("sign-in-link"),a=e.getElementById("sign-in-button"),r=e.getElementById("sign-in-spinner"),l=!1;return function(){function u(e){_classCallCheck(this,u),this.fbRef=e,this.userRef=void 0,this.eventRef=void 0,this.extraRef=void 0,this.email=void 0}return _createClass(u,[{key:"authHandler",value:function(n,i){r.hidden=!0,n?(Displayer.showSnackbar("Sorry, there was an error signing you in!  :-("),Displayer.signInContainerEl.hidden=!1):i?(this.email=i.password.email,this.userRef=this.fbRef.child("users/"+i.uid),this.eventRef=this.userRef.child("/events"),this.extraRef=this.userRef.child("/extra"),l===!0&&(l=!1,this.extraRef.set({name:SignUp.signupNameEl.value,employer:SignUp.signupEmployerEl.value,title:SignUp.signupTitleEl.value,birthday:SignUp.signupBirthdayEl.value})),t.hidden=!1,s.hidden=!0,e.dispatchEvent(new CustomEvent("signed-in")),Displayer.addEventsTabEl.className.indexOf("is-active")>-1?Displayer.showEventPlanner():Displayer.showEventsTabEl.className.indexOf("is-active")>-1?Displayer.showEventContainer():Displayer.showUserInfo(),Displayer.showSnackbar("You are one AWESOME Signer Inner!... Go You! :-D")):(Displayer.showSnackbar("Sorry, there was an error signing you in!  :-("),Displayer.signInContainerEl.hidden=!1)}},{key:"signIn",value:function(e,t){var s=e||n.value,a=t||i.value;Displayer.signInContainerEl.hidden=!0,SignUp.signUpSpinner.hidden=!0,r.hidden=!1,this.fbRef.authWithPassword({email:s,password:a},this.authHandler.bind(this))}},{key:"signOut",value:function(){this.fbRef.unauth(),this.dispose(),e.dispatchEvent(new CustomEvent("signed-out")),Displayer.showSnackbar("Success!  You just Signed Out like a champ... This RAWKS! :-D"),Displayer.showSignIn()}},{key:"dispose",value:function(){this.fbRef=void 0,this.userRef=void 0,this.eventRef=void 0,this.extraRef=void 0,this.email=void 0,t.hidden=!0,s.hidden=!1,n.value="",i.value="",t.value="",s.value=""}}],[{key:"validateSignIn",value:function(){a.disabled=""===n.value||""===i.value}},{key:"signInEmailEl",get:function(){return n}},{key:"storeExtra",get:function(){return l},set:function(e){l=e}}]),u}()}(document);