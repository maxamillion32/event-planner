(function(document) {
  'use strict';
  
  window.VTILAPP = Object.create(null);
  var contentEl = document.getElementById('vtil-content');
  var inputEl = document.getElementById('vtil-input');
  
  /**
   * Instantiate a new vtil object
   * 
   **/ 
  VTILAPP.vtil = Object.create(VTIL.prototype, {
    
    contentElement: { writable: true,  configurable:true, value: contentEl },
    inputElement: { writable: true,  configurable:true, value: inputEl },
    objectPath: { writable: true,  configurable:true, value: 'VTILAPP.vtil' }
    
  });
  
})(document);