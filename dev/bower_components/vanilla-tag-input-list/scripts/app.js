(function(document) {
  'use strict';
  
  //Create the object
  window.VTIL = Object.create(null);
  
  //Event to fire if the user tries to send in an empty tag
  var _emptyTagEvent = new Event('empty-tag');
  
  /**
   * Clear all the tags
   *
   **/ 
  function _clearTags(el) {
    
    while (el.firstChild) {
      
      el.removeChild(el.firstChild);

    }
    
  }
  
  /**
   * Draw tags to the screen
   * 
   **/ 
  function _redrawTags(el, tags, path) {
    
    _clearTags(el);
    
    tags.forEach(function(tag) {
      
      //Add the tag
      var span = document.createElement('span');
      span.appendChild(document.createTextNode(tag.value));
      
      //Create delete
      var del = document.createElement('a');
      del.setAttribute('href', "#");
      del.setAttribute('title', "Delete");
      del.className = "vtil-delete";
      del.setAttribute('onclick', path + '.removeTag("' + tag.id + '")');
      del.innerHTML = '&nbsp;<i class="fa fa-trash-o"></i>';
      span.appendChild(del);
      
      //Make it look like a card
      span.className = "vtil-tag-wrapper";
      
      el.appendChild(span);
      
    });
    
  }
  
  /**
   * Object public properties
   * 
   **/ 
  VTIL.prototype = {
    
    tags: [],
    
    /**
     * Add a tag to the list
     * 
     **/ 
    addTag: function() {
      
      if(this.inputElement.value === "") {
      
        this.inputElement.dispatchEvent(_emptyTagEvent);
        
      } else {
        
        var d = new Date();
        
        this.tags.push({'id': d.toISOString(), 'value': this.inputElement.value});
        _redrawTags(this.contentElement, this.tags, this.objectPath);
        this.inputElement.value = "";
        
      }
      
    },
    
    /**
     * Remove a tag from the list
     * 
     **/ 
    removeTag: function(id) {
      
      var index = -1;

      for(var i = 0; i < this.tags.length; ++i) {

        if(this.tags[i].id === id) {

          index = i;
          break;

        }

      }

      if(index > -1) {

        this.tags.splice(index, 1);
        _redrawTags(this.contentElement, this.tags, this.objectPath);

      }
      
    }
    
  };
  
})(document);