(function(document) {
  'use strict';
  
  window.VTILAPP = Object.create(null);
  var contentEl = document.getElementById('vtil-content');
  var inputEl = document.getElementById('vtil-input');
  
  /**
   * Instantiate a new vtil object
   * 
   **/
   VTILAPP.vtil = new VTIL(contentEl, inputEl, 'VTILAPP.vtil');
  
})(document);