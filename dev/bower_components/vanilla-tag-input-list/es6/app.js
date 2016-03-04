var VTIL = (function() {

	let _emptyTagEvent = new Event('empty-tag');

	/**
	 * Clear tags from the list
	 * @param  {Object} el dome element
	 * 
	 */
	let _clearTags = function(el) {
    
		while (el.firstChild) {
		  
		  el.removeChild(el.firstChild);

		}

	}

	/**
	 * Redraw tags to the screen
	 * @param  {Object} el   Dom Element
	 * @param  {Array} tags Array of tags
	 * @param  {String} path Path to VTIL
	 * 
	 */
	let _redrawTags = function(el, tags, path) {
    
		_clearTags(el);

		tags.forEach(tag => {
		  
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
	 * Tag Handling class
	 * 
	 */
	return class TagList {

		constructor(contentElParam, inputElParam, pathParam) {

			this.tags = [];
			this.contentElement = contentElParam;
			this.inputElement = inputElParam;
			this.objectPath = pathParam;

		}

		/**
		 * Add a tag to the list
		 * 
		 */
		addTag() {

			if(this.inputElement.value === "") {
      
				this.inputElement.dispatchEvent(_emptyTagEvent);

			} else {

				var d = new Date();

				this.tags.push({'id': d.toISOString(), 'value': this.inputElement.value});
				_redrawTags(this.contentElement, this.tags, this.objectPath);
				this.inputElement.value = "";

			}

		}

		removeTag(id) {

			var index = -1;

			for(let i = 0; i < this.tags.length; ++i) {

				if(this.tags[i].id === id) {

					index = i;
					break;

				}

			}

			if(index > -1) {

				this.tags.splice(index, 1);
				_redrawTags(this.contentElement, this.tags, this.objectPath);
				document.dispatchEvent(new CustomEvent("tag-removed"));

			}

		}

	}

})();